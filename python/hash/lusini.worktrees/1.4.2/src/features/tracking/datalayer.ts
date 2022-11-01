import { addRule } from 'redux-ruleset'
import config from 'config'
import { LOCATION_CHANGED } from 'modules/navigation/const'
import {
  FETCH_SUCCESS as PDP_FETCH_SUCCESS,
  SET_FILTER_VALUE as PDP_SET_FILTER_VALUE,
} from 'modules/productDetail/const'
import { getDisplayVariant } from 'modules/productDetail/selectors'
import { ADD_ITEM_SUCCESS } from 'modules/cart/const'
import calculateDeliveryDate from 'utils/calculateDeliveryDate'
import * as ProductWidget from 'theme/molecules/ProductWidget/events'
import * as MainNavigation from 'theme/app/Header/Navigation/events'
import * as DrawerNavigation from 'theme/app/FlyoutNavi/events'
import * as Gallery from 'theme/templates/PDP/Gallery/events'
import { ms } from 'modules/browser/const'
import { SET_CUSTOMER_TYPE } from 'modules/b2cSwitch/const'
import getCookieByName from 'utils/getCookieByName'
import { FETCH_SUCCESS as SERIES_FETCH_SUCCESS } from 'modules/seriesDetail/const'
import * as EecTracking from 'theme/atoms/EecTracking'
import { LISTING_CONTEXT_BRAND_NAME } from 'theme/templates/Category/events'
import getPageInfo from 'utils/getPageInfo'

type DlEvent = any

type BufferContext = {
  id: string
  path: string[]
}

declare global {
  interface Window {
    dataLayer: any
    abMode: 'a' | 'b'
    abBranch: string
  }
}

export const push = (evt: DlEvent) => {
  if (window.dataLayer) window.dataLayer.push(evt)
}

const bufferCache: Record<string, any> = {}

const bufferedPush = (ctx: BufferContext, evt: DlEvent) => {
  const getTarget = (evt: any, path: string[]): Array<any> => {
    const [item, ...rest] = path
    if (item) return getTarget(evt[item], rest)
    else return evt
  }
  const flush = () => {
    push(bufferCache[ctx.id])
    delete bufferCache[ctx.id]
    window.removeEventListener('beforeunload', flush)
  }
  // very first event
  if (!bufferCache[ctx.id]) {
    bufferCache[ctx.id] = evt
    setTimeout(flush, 3000)
    window.addEventListener('beforeunload', flush)
    return
  }
  getTarget(bufferCache[ctx.id], ctx.path).push(...getTarget(evt, ctx.path))
}

const getCategoryPath = (categories) =>
  categories.lvl7?.[0].split('>').join('/') ||
  categories.lvl6?.[0].split('>').join('/') ||
  categories.lvl5?.[0].split('>').join('/') ||
  categories.lvl4?.[0].split('>').join('/') ||
  categories.lvl3?.[0].split('>').join('/') ||
  categories.lvl2?.[0].split('>').join('/') ||
  categories.lvl1?.[0].split('>').join('/') ||
  categories.lvl0?.[0].split('>').join('/') ||
  ''

// init datalayer
if (typeof window !== 'undefined') {
  const windowWidth = window.innerWidth
  const asset =
    windowWidth > ms.LG ? 'Desktop' : windowWidth > ms.MD ? 'Tablet' : 'Mobile'
  push({
    originalLocation:
      document.location.protocol +
      '//' +
      document.location.hostname +
      document.location.pathname +
      document.location.search,
  })
  push({
    asset: asset,
    property: config.shopName,
    domain: window.location.host,
    language: config.i18n.locale,
  })
}

addRule({
  id: 'dl/PAGELOAD',
  target: LOCATION_CHANGED,
  output: '#dl-event',
  consequence: (action, { getState, addRule }) => {
    const path = action.payload.pathname
    const state = getState()
    const pageInfo = getPageInfo(path)
    const b2cDecision = getCookieByName('b2cDecision')
    const isb2c = getCookieByName('isb2c')

    const userData = JSON.parse(
      decodeURIComponent(getCookieByName('datalayerCustomer') || '{}')
    )

    delete userData.branch
    delete userData.client
    delete userData.sessionId

    push({
      cid: userData?.user || '',
    })
    const pageLoadObject = {
      event: 'pageLoad',
      abMode: window.abMode,
      abBranch: window.abBranch,
      customer: {
        ...userData,
        isB2C: b2cDecision && b2cDecision === '1' ? isb2c === '1' : 'undecided',
      },
      content: {
        pageType: pageInfo.pageType,
        pageName: pageInfo.pageName,
      },
      // WHY? please check if this is really necessary! first page-load will always have empty cart
      cart: state.cart.data.items.map((item) => ({
        sku: item.sku,
        amount: item.amount,
      })),
    }
    if (
      pageInfo.pageType === 'Series' ||
      pageInfo.pageType === 'Product' ||
      pageInfo.pageType === 'Category'
    ) {
      addRule('waitForLoadContextBrand', { pageLoadObject })
    } else {
      push(pageLoadObject)
    }
  },
  subRules: {
    waitForLoadContextBrand: {
      target: [
        SERIES_FETCH_SUCCESS,
        PDP_FETCH_SUCCESS,
        LISTING_CONTEXT_BRAND_NAME,
      ],
      output: '#dl-event',
      addOnce: true,
      consequence: (action, { context, getState }) => {
        const state = getState()

        const pageLoadObject = context.get('pageLoadObject')

        let ContextObject
        switch (action.type) {
          case SERIES_FETCH_SUCCESS: {
            ContextObject = {
              brand: state.seriesDetail.data.brand,
            }
            break
          }
          case PDP_FETCH_SUCCESS: {
            ContextObject = {
              brand: state.productDetail.data[0].brand,
            }
            break
          }
          case LISTING_CONTEXT_BRAND_NAME: {
            if (action.payload !== '')
              ContextObject = {
                brand: action.payload,
              }
            break
          }
        }

        const pageLoad = {
          ...pageLoadObject,
          context: ContextObject,
        }

        push(pageLoad)
      },
    },
  },
})

addRule({
  id: 'dl/PRODUCT_DETAIL_PAGE',
  target: [PDP_FETCH_SUCCESS, PDP_SET_FILTER_VALUE],
  output: '#dl-event',
  addUntil: function* (next, { context }) {
    yield next(ProductWidget.WIDGET_CLICK, (action) => {
      context.set('listname', action.meta.listname)
    })
    return 'RECREATE_RULE'
  },
  consequence: (_, { getState, context }) => {
    const state = getState()
    const variant = getDisplayVariant(state.productDetail)
    const dlActionField = context.get('listname')
    const deliveryDate = calculateDeliveryDate(variant, 1).snippet
    push({
      event: 'detailPage',
      ecommerce: {
        detail: {
          actionField: { list: dlActionField, action: 'detail' },
          products: [
            {
              name: variant.title,
              id: variant.sku,
              price: variant.prices.packPriceNet,
              brand: variant.brand,
              category: getCategoryPath(variant.categories),
              variant: Object.keys(variant.variantData)
                .filter((filterKey) => variant.variantData[filterKey])
                .map(
                  (filterKey) =>
                    `${filterKey}: ${variant.variantData[filterKey].label}`
                )
                .join(', '),
              deliveryDate: deliveryDate,
              dimension1: deliveryDate,
            },
          ],
        },
      },
    })
  },
})

addRule({
  id: 'dl/ADD_TO_CART',
  target: ADD_ITEM_SUCCESS,
  output: '#dl-event',

  consequence: (action) => {
    const addedVariantData = action.payload.items.find(
      (rawItem) => rawItem.variant.sku === action.meta.rawItem.sku
    )
    if (!addedVariantData) return
    const deliveryDate = calculateDeliveryDate(
      addedVariantData.variant,
      1
    ).snippet

    push({
      event: 'addToCart',
      ecommerce: {
        currencyCode: 'EUR',
        add: {
          products: [
            {
              name: addedVariantData.variant.title,
              id: addedVariantData.sku,
              price: addedVariantData.variant.prices.packPriceNet,
              brand: addedVariantData.variant.brand,
              category: getCategoryPath(addedVariantData.variant.categories),
              variant: Object.keys(addedVariantData.variant.variantData)
                .filter(
                  (filterKey) => addedVariantData.variant.variantData[filterKey]
                )
                .map(
                  (filterKey) =>
                    `${filterKey}: ${addedVariantData.variant.variantData[filterKey].label}`
                )
                .join(', '),
              deliveryDate: deliveryDate,
              dimension1: deliveryDate,
              quantity: addedVariantData.amount,
            },
          ],
          actionField: {
            list: 'Productpage',
            action: 'add',
          },
        },
      },
    })
  },
})

addRule({
  id: 'dl/PRODUCT_WIDGET_CLICK',
  target: ProductWidget.WIDGET_CLICK,
  output: '#dl-event',
  consequence: (action) => {
    const { listname, listPosition } = action.meta
    const variant = action.payload

    push({
      event: 'productClick',
      ecommerce: {
        click: {
          actionField: {
            list: listname,
            action: 'click',
          },
          products: [
            {
              id: variant.sku,
              name: variant.title,
              brand: variant.brand,
              price: variant.prices.packPriceNet,
              category: getCategoryPath(variant.categories),
              position: listPosition,
            },
          ],
        },
      },
    })
  },
})

addRule({
  id: 'dl/PRODUCT_WIDGET_COLOR_CLICK',
  target: ProductWidget.COLOR_CLICK,
  output: '#dl-event',
  consequence: (action) => {
    const { listname, listPosition, displayVariant } = action.meta

    push({
      event: 'productClick',
      ecommerce: {
        click: {
          actionField: {
            list: listname,
            action: 'click',
          },
          products: [
            {
              id: displayVariant.sku,
              name: displayVariant.title,
              brand: displayVariant.brand,
              price: displayVariant.prices.packPriceNet,
              category: getCategoryPath(displayVariant.categories),
              position: listPosition,
            },
          ],
        },
      },
    })
  },
})

addRule({
  id: 'dl/EEC_PRODUCT_IMPRESSION',
  target: ProductWidget.SCROLL_INTO_VIEW,
  output: '#dl-event',
  consequence: (action) => {
    const bufferContext = {
      id: 'dl/EEC_PRODUCT_IMPRESSION',
      path: ['ecommerce', 'impressions'],
    }
    bufferedPush(bufferContext, {
      event: 'eec_impressions',
      ecommerce: {
        currencyCode: 'EUR',
        impressions: [
          {
            id: action.payload.sku,
            name: action.payload.title,
            category: getCategoryPath(action.payload.categories),
            brand: action.payload.brand,
            list: action.meta.listname,
            price: String(action.payload.prices.piecePriceNet),
            position: action.meta.listPosition,
          },
        ],
      },
    })
  },
})

addRule({
  id: 'dl/GALLERY_CHANGE_IMAGE',
  target: Gallery.CHANGE_IMAGE,
  output: '#dl-event',
  consequence: (action) => {
    const { productName, categoryPath, sku } = action.meta
    const imageID = action.payload.imageID

    push({
      event: 'genericEvent',
      eventname: 'product_picture_click',
      category: 'product_detail',
      action: 'product_picture_click',
      label: `${categoryPath}||${productName}||${sku}||${imageID}`,
      value: 0,
      nonInteraction: 'false',
    })
  },
})

addRule({
  id: 'dl/EEC_ORGANISM_CLICK',
  target: EecTracking.CLICK,
  output: '#dl-event',
  consequence: (action) => {
    push({
      event: 'promoClick',
      ecommerce: {
        promoClick: {
          promotions: [
            {
              id:
                action.meta.eecTracking?.campaignId || action.payload.gridarea,
              name: action.meta.eecTracking?.name || action.payload.gridarea,
              creative: action.meta.eecTracking?.creative || '',
              position: action.payload.path + ' | ' + action.payload.gridarea,
            },
          ],
        },
      },
    })
  },
})

addRule({
  id: 'dl/EEC_ORGANISM_SCROLL_INTO_VIEW',
  target: EecTracking.SCROLL_INTO_VIEW,
  output: '#dl-event',
  consequence: (action) => {
    const bufferContext = {
      id: 'dl/EEC_ORGANISM_SCROLL_INTO_VIEW',
      path: ['ecommerce', 'promoView', 'promotions'],
    }
    bufferedPush(bufferContext, {
      event: 'promoView',
      ecommerce: {
        promoView: {
          promotions: [
            {
              id:
                action.meta.eecTracking?.campaignId || action.payload.gridarea,
              name: action.meta.eecTracking?.name || action.payload.gridarea,
              creative: action.meta.eecTracking?.creative || '',
              position: action.payload.path + ' | ' + action.payload.gridarea,
            },
          ],
        },
      },
    })
  },
})

addRule({
  id: 'dl/MAIN_NAVIGATION_CLICK',
  target: [
    MainNavigation.MAIN_CATEGORY_CLICK,
    MainNavigation.BURGER_MENU_CLICK,
    MainNavigation.SHOW_MORE_CLICK,
    DrawerNavigation.MAIN_CATEGORY_CLICK,
    DrawerNavigation.SUB_CATEGORY_CLICK,
    DrawerNavigation.HEADLINE_CLICK,
    DrawerNavigation.SHOW_ALL_BUTTON_CLICK,
  ],
  output: '#dl-event',
  consequence: (action) => {
    const area = action.payload
    const { category, path } = action.meta

    push({
      event: 'genericEvent',
      eventname: 'navigation_click',
      main_navigation_area: area,
      main_navigation_categorypath: path || category,
      category: 'Main Navigation',
      action: area,
      label: path || category,
      value: 0,
      nonInteraction: 'false',
    })
  },
})

addRule({
  id: 'dl/CUSTOMIZED_NAVIGATION_CLICK',
  target: [DrawerNavigation.CUSTOMIZED_NAVIGATION_CLICK],
  output: '#dl-event',
  consequence: (action) => {
    const label = action.payload

    push({
      event: 'genericEvent',
      eventname: 'navigation_click',
      main_navigation_area: 'Customized Navigation Click',
      main_navigation_categorypath: label,
      category: 'Main Navigation',
      action: 'Customized Navigation Click',
      label: label,
      value: 0,
      nonInteraction: 'false',
    })
  },
})

addRule({
  id: 'dl/CLOSE_NAVIGATION_CLICK',
  target: DrawerNavigation.CLOSE_NAVIGATION_CLICK,
  output: '#dl-event',
  consequence: (action) => {
    const categoryPath = action.payload

    push({
      event: 'genericEvent',
      eventname: 'navigation_click',
      main_navigation_area: 'Main Navigation',
      main_navigation_categorypath: categoryPath || 'Home',
      category: 'Main Navigation',
      action: 'Drawer - X Click',
      label: categoryPath || 'Home',
      value: 0,
      nonInteraction: 'false',
    })
  },
})

addRule({
  id: 'dl/NAVIGATION_B2B_B2C_SWITCH',
  target: [SET_CUSTOMER_TYPE],
  output: '#dl-event',
  consequence: (action) => {
    const customerType = action.payload.customerType
    const eventname = action.payload.dlEvent
    if (eventname === 'navigation_b2b2c_switch') {
      push({
        event: 'genericEvent',
        eventname: eventname,
        customer_type: customerType,
        category: 'Navigation B2B B2C Switch',
        action: customerType,
        label: '',
        value: 0,
        nonInteraction: 'true',
      })
    } else if (eventname === 'overlay_b2b2c_switch') {
      push({
        event: 'genericEvent',
        eventname: 'overlay_b2b2c_switch',
        customer_type: customerType,
        category: 'Overlay B2B B2C Switch',
        action: customerType,
        label: '',
        value: 0,
        nonInteraction: 'true',
      })
    } else {
      push({
        event: 'genericEvent',
        eventname: 'overlay_b2b2c_x_click',
        category: 'Overlay B2B B2C Switch',
        action: 'X Click',
        label: '',
        value: 0,
        nonInteraction: 'true',
      })
    }
  },
})
