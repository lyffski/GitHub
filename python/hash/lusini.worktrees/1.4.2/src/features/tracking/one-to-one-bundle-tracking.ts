import { addRule } from 'redux-ruleset'
import * as events from 'theme/templates/OneToOneBundle/events'
import { push as dlPush } from 'features/tracking/datalayer'

addRule({
  id: 'dl/CONFIGURATOR_STARTED_FROM',
  target: [events.STARTED_FROM],
  output: '#dl-event',
  consequence: (action) => {
    const { payload } = action
    dlPush({
      event: 'genericEvent',
      eventname: 'table_configurator_step',
      step: '1',
      first_sku: payload.first_sku,
      first_product_related_type: payload.first_product_related_type,
      started_from: payload.first_sku,
      second_sku: null,
      second_product_related_type: null,
      set_count: '1',
      // Universal Analytics
      category: 'table_configurator',
      action: 'step',
      label: '1',
      nonInteraction: 'true',
    })
  },
})

addRule({
  id: 'dl/CONFIGURATOR_SELECT_PRODUCT',
  target: [events.SELECT_PRODUCT],
  output: '#dl-event',
  consequence: (action) => {
    const { payload } = action
    dlPush({
      event: 'genericEvent',
      eventname: 'table_configurator_step',
      step: '2',
      first_sku: payload.first_sku,
      first_product_related_type: payload.first_product_related_type,
      started_from: payload.started_from,
      second_sku: payload.second_sku,
      second_product_related_type: payload.second_product_related_type,
      set_count: '2',
      // Universal Analytics
      category: 'table_configurator',
      action: 'step',
      label: '2',
      nonInteraction: 'true',
    })
  },
})

addRule({
  id: 'dl/CONFIGURATOR_CART_ADD',
  target: [events.ADD_TO_CART],
  output: '#dl-event',
  consequence: (action) => {
    const { payload } = action
    dlPush({
      event: 'genericEvent',
      eventname: 'table_configurator_cart_add',
      step: '3',
      first_sku: payload.first_sku,
      first_product_related_type: payload.first_product_related_type,
      second_sku: payload.second_sku,
      second_product_related_type: payload.second_product_related_type,
      started_from: payload.started_from,
      set_count: '3',
      // Universal Analytics
      category: 'table_configurator',
      action: 'step',
      label: '3',
      nonInteraction: 'true',
    })
  },
})

addRule({
  id: 'dl/CONFIGURATOR_RESET',
  target: [events.RESET],
  output: '#dl-event',
  consequence: (action) => {
    const { payload } = action
    dlPush({
      event: 'genericEvent',
      eventname: 'table_configurator_reset',
      step: '3',
      first_sku: payload.first_sku,
      first_product_related_type: payload.first_product_related_type,
      second_sku: payload.second_sku,
      second_product_related_type: payload.second_product_related_type,
      started_from: payload.started_from,
      set_count: '4',
      // Universal Analytics
      category: 'table_configurator',
      action: 'step',
      label: '4',
      nonInteraction: 'true',
    })
  },
})
