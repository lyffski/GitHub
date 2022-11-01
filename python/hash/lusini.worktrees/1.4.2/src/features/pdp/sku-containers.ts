import { addRule } from 'redux-ruleset'
import { INIT } from 'modules/productDetail/const'
import { navigate } from 'gatsby'
import { LOCATION_CHANGED } from 'modules/navigation/const'
import createAlgoliaHelper from 'utils/createAlgoliaHelper'
import config from 'config'

/**
 * Given the containerID in the url is prefixed with "sku-"
 * When we initialize our products
 * Then we transform the sku-container into a normal containerID
 */
addRule({
  id: 'f-pdp/SKU_CONTAINERS',
  target: INIT,
  position: 'INSTEAD',
  output: ['#navigate', INIT],
  addWhen: function* (next) {
    yield next(LOCATION_CHANGED, (action) => {
      if (!action.payload.pathname.includes('/pdp/')) return false
      if (action.payload.pathname.includes('sku-')) return true
      return false
    })
    return 'ADD_RULE'
  },
  addUntil: function* (next) {
    yield next([INIT, LOCATION_CHANGED])
    return 'RECREATE_RULE'
  },
  consequence: async (action) => {
    const sku = action.payload.containerID
    const helper = await createAlgoliaHelper(config.index.products, {
      facets: ['sku'],
      distinct: 0,
      attributesToRetrieve: ['containerID'],
    })

    helper.addFacetRefinement('sku', sku)

    const result = await helper.searchOnce({ hitsPerPage: 1 })
    const hit = result.content.hits[0]

    if (!hit) return action

    navigate(`/pdp/${hit.containerID}#sku=${sku}`)

    return null
  },
})
