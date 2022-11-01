import { addRule } from 'redux-ruleset'
import { reportEvent, reportPageVisit, reportEngagement } from 'utils/dy'
import { SET_SEARCH_VALUE } from 'modules/ui/const'
import { LOCATION_CHANGED } from 'modules/navigation/const'
import getPageInfo from 'utils/getPageInfo'
import config from 'config'
import { ADD_ITEM_SUCCESS, SET } from 'modules/cart/const'

if (
  typeof window !== 'undefined' &&
  config.baseUrl === window.location.origin
) {
  addRule({
    id: 'dy/KEYWORD_SEARCH',
    target: SET_SEARCH_VALUE,
    output: '#dy-event',
    debounce: 4000,
    consequence: (action) => {
      reportEvent({
        name: 'Keyword Search',
        properties: {
          dyType: 'keyword-search-v1',
          keywords: action.payload,
        },
      })
    },
  })

  addRule({
    id: 'dy/PAGE_VISIT',
    target: LOCATION_CHANGED,
    output: '#dl-event',
    consequence: (action) => {
      const pageInfo = getPageInfo(action.payload.pathname)

      switch (pageInfo.pageType) {
        case 'Series':
        case 'Search':
        case 'Category':
          reportPageVisit({
            page: {
              type: 'CATEGORY',
              data: [],
              location: window.location.href,
              locale: config.i18n.locale.replace('-', '_'),
            },
          })
          break
        case 'Product':
          reportPageVisit({
            page: {
              type: 'PRODUCT',
              data: [],
              location: window.location.href,
              locale: config.i18n.locale.replace('-', '_'),
            },
          })
          break
        case 'Home':
          reportPageVisit({
            page: {
              type: 'HOMEPAGE',
              data: [],
              location: window.location.href,
              locale: config.i18n.locale.replace('-', '_'),
            },
          })
          break

        case 'Cart':
          reportPageVisit({
            page: {
              type: 'CART',
              data: [],
              location: window.location.href,
              locale: config.i18n.locale.replace('-', '_'),
            },
          })
          break
        case 'Checkout':
        case 'Account':
        case 'Service':
          reportPageVisit({
            page: {
              type: 'OTHER',
              data: [],
              location: window.location.href,
              locale: config.i18n.locale.replace('-', '_'),
            },
          })
          break
      }
    },
  })

  addRule({
    id: 'dy/ENGAGEMENT',
    target: 'Personalization/CLICK',
    output: '#dy-event',
    consequence: (action) => {
      reportEngagement({
        type: 'CLICK',
        decisionId: action.payload,
      })
    },
  })
}
/**
 * After adding product to cart, report to dynamic yield
 *
 */
addRule({
  id: 'dy/ADD_TO_CART',
  target: ADD_ITEM_SUCCESS,
  output: '#dy-event',

  consequence: (action) => {
    const addedVariantData = action.payload.items.find(
      (variant) => variant.sku === action.meta.rawItem.sku
    )

    if (!addedVariantData) return
    const dynamicYieldEvent = {
      name: 'Add to Cart',
      properties: {
        dyType: 'add-to-cart-v1',
        value:
          Math.round(
            (addedVariantData.variant.prices.packPriceNet as number) *
              addedVariantData.amount *
              100
          ) / 100,

        productId: addedVariantData.variant.sku,
        quantity: addedVariantData.amount,
        cart: action.payload.items.map((item) => ({
          productId: item.sku,
          itemPrice: item.variant?.prices.packPriceNet,
          quantity: item.amount,
        })),
      },
    }

    reportEvent(dynamicYieldEvent)
  },
})

/**
 * initial cart data report to dynamic yield
 */
addRule({
  id: 'dy/SYNC_CART',
  target: SET,
  output: '#dy-event',
  consequence: (action) => {
    const cart = action.payload
    const dynamicYieldEvent = {
      name: 'Sync Cart',
      properties: {
        dyType: 'sync-cart-v1',
        cart: cart.items.map((item) => ({
          productId: item.sku,
          itemPrice: item.variant?.prices.packPriceNet,
          quantity: item.amount,
        })),
      },
    }

    reportEvent(dynamicYieldEvent)
  },
})
