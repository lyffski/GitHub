import { addRule } from 'redux-ruleset'
import * as sortingEvents from 'theme/molecules/ListingFilter/SortingDropdown/events'
import { push as dlPush } from 'features/tracking/datalayer'

addRule({
  id: 'dl/SORTING_INDEX',
  target: [sortingEvents.SORTING_CHANGE, sortingEvents.SORTING_PRESELECT],
  output: '#dl-event',
  consequence: (action) => {
    const eventType =
      action.type === 'SortingDropdown/SORTING_CLICK' ? 'change_' : 'preselect_'
    dlPush({
      event: 'genericEvent',
      eventname: action.meta.actionName,
      category: action.meta.actionName,
      action: eventType + action.payload,
      label: action.meta.path,
      value: 0,
      nonInteraction: 'false',
    })
  },
})
