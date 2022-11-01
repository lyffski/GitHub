import { addRule } from 'redux-ruleset'
import * as productInfomationEvents from 'theme/templates/PDP/InformationBox/events'
import { push as dlPush } from 'features/tracking/datalayer'

addRule({
  id: 'dl/PRODUCT_INFORMATION_ACCORDION_CLICK',
  target: [productInfomationEvents.PRODUCT_INFORMATION_ACCORDION_CLICK],
  output: '#dl-event',
  consequence: (action) => {
    dlPush({
      event: 'genericEvent',
      eventname: 'product_information_click',
      category: 'product_detail',
      action: 'product_information_click',
      label: action.payload,
      value: 0,
      nonInteraction: 'false',
    })
  },
})

addRule({
  id: 'dl/PRODUCT_INFORMATION_ACCORDION_VISIBLE',
  target: [productInfomationEvents.PRODUCT_INFORMATION_ACCORDION_VISIBLE],
  output: '#dl-event',
  consequence: (action) => {
    dlPush({
      event: 'genericEvent',
      eventname: 'product_information_view',
      category: 'product_detail',
      action: 'product_information_view',
      label: action.payload,
      value: 0,
      nonInteraction: 'true',
    })
  },
})
