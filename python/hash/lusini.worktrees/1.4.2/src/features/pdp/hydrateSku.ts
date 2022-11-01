import { addRule } from 'redux-ruleset'
import {
  SET_FILTER_VALUE,
  SET_FILTER_VALUES,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from 'modules/productDetail/const'
import { getDisplayVariant } from 'modules/productDetail/selectors'
import { LOCATION_CHANGED } from 'modules/navigation/const'
import { setFilterValues } from 'modules/productDetail/actions'

/**
 * When the display variant updates
 * Then we want to add the sku to the url hash
 */
addRule({
  id: 'f-pdp/ADD_SKU_TO_HASH',
  target: [SET_FILTER_VALUE, SET_FILTER_VALUES],
  output: '#url-hash',
  consequence: (_, { getState, addRule }) => {
    const state = getState()
    const variant = getDisplayVariant(state.productDetail)
    const sku = variant.sku

    if (variant.isDummy) {
      addRule('waitForFetch')
      return
    }

    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search + '#sku=' + sku
    )
  },
  subRules: {
    waitForFetch: {
      target: [FETCH_SUCCESS, FETCH_FAILURE],
      output: '#url-hash',
      addOnce: true,
      consequence: (_, { getState }) => {
        const state = getState()
        const variant = getDisplayVariant(state.productDetail)
        const sku = variant.sku

        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search + '#sku=' + sku
        )
      },
    },
  },
})

/**
 * Given we visit the pdp
 * And the url contains an sku in the url hash
 * When we set the initial filter values
 * Then we hydrate the sku
 */
addRule({
  id: 'f-pdp/HYDRATE_SKU_FROM_HASH',
  target: FETCH_SUCCESS,
  output: SET_FILTER_VALUES,
  addWhen: function* (next, { context }) {
    yield next(LOCATION_CHANGED, (action) => {
      const { hash, pathname } = action.payload
      if (pathname.includes('/pdp/') && hash.includes('sku=')) {
        const skuMatch = hash.match(/sku=([^&]+)/)
        if (skuMatch) {
          context.set('sku', skuMatch[1])
          return true
        }
      }
      return false
    })
    return 'ADD_RULE'
  },
  addUntil: function* (next) {
    yield next(SET_FILTER_VALUES)
    yield next(SET_FILTER_VALUES)
    return 'RECREATE_RULE'
  },
  consequence: (action, { context }) => {
    const sku = context.get('sku')
    const variant = action.payload.find((variant) => variant.sku === sku)

    if (variant) {
      return setFilterValues({
        color: variant.variantData.color.label || null,
        size: variant.variantData.size.label || null,
        style: variant.variantData.style.label || null,
        variant: variant.variantData.variant.label || null,
      })
    }

    return
  },
})
