import { addRule } from 'redux-ruleset'
import { init } from 'modules/listing/actions'
import { FETCH_SUCCESS, INIT, SET_CATEGORY } from 'modules/listing/const'
import { LOCATION_CHANGED } from 'modules/navigation/const'

/**
 * When the listing state updates
 * Then I want to track the filtervalues in the url
 */
addRule({
  id: 'feature/LISTING_STATE_TO_URL',
  target: FETCH_SUCCESS,
  output: '#url-hash',
  weight: 1,
  condition: () => !window.location.href.includes('one-to-one-bundle'),
  addWhen: function* (next, { context }) {
    // hydrate initial category
    yield next(LOCATION_CHANGED, () => {
      const hash = window.location.hash
      const categoryMatch = hash.match(/&category=([^&]*)/)
      if (categoryMatch)
        context.set('category', decodeURIComponent(categoryMatch[1]))
      return true
    })
    return 'ADD_RULE'
  },
  addUntil: function* (next, { context }) {
    // track virtual categories
    yield next([SET_CATEGORY, INIT], (action) => {
      if (action.type === INIT) context.set('category', null)
      else context.set('category', action.payload)
    })

    return 'REAPPLY_ADD_UNTIL'
  },
  consequence: (action, { context }) => {
    const {
      query,
      attributes,
      numericAttributes,
      page,
      flags,
      minPrice,
      maxPrice,
    } = action.meta.filterValues
    let hash = ''

    if (
      Object.values(attributes).flat().length > 0 ||
      Object.values(numericAttributes).flat().length > 0 ||
      query !== '' ||
      page ||
      minPrice ||
      maxPrice ||
      context.get('category') ||
      flags.length > 0
    ) {
      hash = `#q=${encodeURIComponent(query)}`
    }

    if (minPrice || maxPrice) {
      hash += `&price=${minPrice || ''}---${maxPrice || ''}`
    }

    for (const attr in attributes) {
      if (!attributes[attr].length) continue
      hash += `&${attr}=${attributes[attr].map(encodeURIComponent).join('---')}`
    }
    for (const attr in numericAttributes) {
      if (!(numericAttributes[attr].min || numericAttributes[attr].max))
        continue

      hash += `&${attr}=${encodeURIComponent(
        numericAttributes[attr].min ? numericAttributes[attr].min || 0 : ''
      )}---${encodeURIComponent(
        numericAttributes[attr].max ? numericAttributes[attr].max || 0 : ''
      )}`
    }
    if (flags.length > 0) {
      hash += `&_F=${flags.map(encodeURIComponent).join('---')}`
    }

    if (context.get('category')) {
      hash += `&category=${encodeURIComponent(context.get('category'))}`
    }

    if (page) hash += `&page=${page + 1}`

    if (hash === '#q=') hash = ''

    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search + hash
    )
  },
})

/**
 * When the url contains a hash
 * And I init my listing state
 * Then I want to add the hashed filtervalues to the initializing
 */
addRule({
  id: 'feature/HYDRATE_LISTING_STATE',
  target: INIT,
  output: INIT,
  position: 'INSTEAD',
  weight: 9,
  condition: () => Boolean(window.location.hash),
  consequence: (action) => {
    const { hash } = window.location
    const newFilterValues = {
      ...action.payload,
      attributes: { ...action.payload.attributes },
    }

    const queryMatch = hash.match(/#q=([^&]*)/)
    if (queryMatch) newFilterValues.query = decodeURIComponent(queryMatch[1])

    const pageMatch = hash.match(/&page=([^&]*)/)
    if (pageMatch) newFilterValues.page = parseInt(pageMatch[1]) - 1

    const princeRegex = new RegExp(`&price=([^&]*)`)
    const priceMatch = hash.match(princeRegex)

    if (priceMatch) {
      const price = priceMatch[1].split('---')
      newFilterValues.minPrice = parseFloat(price[0])
      newFilterValues.maxPrice = parseFloat(price[1])
    }

    for (const attr of action.meta.attributes) {
      const regex = new RegExp(`&${attr.key}=([^&]*)`)
      const match = hash.match(regex)
      if (match) {
        if (attr.filtertype !== 'rangeslider') {
          newFilterValues.attributes[attr.key] = match[1]
            .split('---')
            .map(decodeURIComponent)
        } else {
          const [min, max] = match[1].split('---')

          newFilterValues.numericAttributes[attr.key] = {
            min: min ? parseFloat(min) : null,
            max: max ? parseFloat(max) : null,
          }
        }
      }
    }

    // flags
    {
      const regex = new RegExp(`&_F=([^&]*)`)
      const match = hash.match(regex)
      if (match) {
        const flags = match[1].split('---').map(decodeURIComponent)
        newFilterValues.flags = Array.from(
          new Set([...newFilterValues.flags, ...flags])
        )
      }
    }

    const categoryMatch = hash.match(/&category=([^&]*)/)
    if (categoryMatch)
      newFilterValues.category = decodeURIComponent(categoryMatch[1])

    return init(
      action.meta.recordId,
      newFilterValues,
      action.meta.attributes,
      action.meta.resetFilterValues
    )
  },
})

/**
 * Given the user is on the listing route
 * When the user triggers the history back-button
 * We re-initialize the url to invalidate the listing
 */
addRule({
  id: 'feature/INIT_LISTING_ON_POPSTATE',
  target: INIT,
  output: [INIT, '#listener'],
  concurrency: 'ONCE',
  addWhen: function* (next) {
    yield next(LOCATION_CHANGED, (action) =>
      action.payload.pathname.includes('/category/')
    )
    return 'ADD_RULE'
  },
  addUntil: function* (next) {
    yield next(
      LOCATION_CHANGED,
      (action) => !action.payload.pathname.includes('/category/')
    )
    return 'RECREATE_RULE'
  },
  consequence: (action, { dispatch }) => {
    const l = () => {
      dispatch(action)
    }

    window.addEventListener('popstate', l)
    return () => window.removeEventListener('popstate', l)
  },
})
