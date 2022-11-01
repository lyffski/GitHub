import { addRule } from 'redux-ruleset'
import * as filterEvents from 'theme/molecules/ListingFilter/FilterDrawer/events'
import { push as dlPush } from 'features/tracking/datalayer'

addRule({
  id: 'dl/PROMINENT_FILTER_CLICK',
  target: filterEvents.PROMINENT_FILTER_OPEN,
  output: '#dl-event',
  consequence: (action) => {
    dlPush({
      event: 'genericEvent',
      eventname: 'filtermenu_open',
      filter_category: action.payload,
      category: 'Filter Navigation',
      action: 'filtermenu_open',
      label: action.payload,
      value: 0,
      nonInteraction: 'true',
    })
  },
})
addRule({
  id: 'dl/FILTER_DRAWER_CLOSE',
  target: filterEvents.FILTER_DRAWER_CLOSE,
  output: '#dl-event',
  consequence: (action) => {
    if (action.payload)
      dlPush({
        event: 'genericEvent',
        eventname: 'filtermenu_close',
        filter_closing: action.payload,
        category: 'Filter Navigation',
        action: 'filtermenu_close',
        label: action.payload,
        value: 0,
        nonInteraction: 'true',
      })
  },
})
addRule({
  id: 'dl/FILTER_VALUE_CLICK',
  target: filterEvents.FILTER_VALUE_CLICK,
  output: '#dl-event',
  consequence: (action) => {
    dlPush({
      event: 'genericEvent',
      eventname: 'filtername_click',
      filter_category: action.payload.filterName,
      filter_value: action.payload.filterValue,
      category: 'Filter Navigation',
      action: 'filtername_click',
      label: action.payload.filterName + '-' + action.payload.filterValue,
      value: 0,
      nonInteraction: 'true',
    })
  },
})

addRule({
  id: 'dl/FILTER_VALUE_REMOVE',
  target: filterEvents.FILTER_VALUE_REMOVE,
  output: '#dl-event',
  consequence: (action) => {
    dlPush({
      event: 'genericEvent',
      eventname: 'filter_remove',
      filter_category: action.payload.filterName,
      filter_value: action.payload.filterValue,
      category: 'Filter Navigation',
      action: 'filter_remove',
      label: action.payload.filterName + '-' + action.payload.filterValue,
      value: 0,
      nonInteraction: 'true',
    })
  },
})

addRule({
  id: 'dl/FILTER_RESET',
  target: filterEvents.FILTER_RESET,
  output: '#dl-event',
  consequence: () => {
    dlPush({
      event: 'genericEvent',
      eventname: 'filter_reset',
      category: 'Filter Navigation',
      action: 'Filter Reset',
      label: '',
      value: 0,
      nonInteraction: 'true',
    })
  },
})

addRule({
  id: 'dl/FILTER_CLICK',
  target: filterEvents.FILTER_CLICK,
  output: '#dl-event',

  consequence: (action) => {
    dlPush({
      event: 'genericEvent',
      eventname: 'filtername_click',
      filter_category: action.payload,
      category: 'Filter Navigation',
      action: 'filtername_click',
      label: action.payload,
      value: 0,
      nonInteraction: 'true',
    })
  },
})
