import { addRule } from 'redux-ruleset'
import * as switchEvents from 'theme/app/Header/TopLine/events'
import { push as dlPush } from 'features/tracking/datalayer'

addRule({
  id: 'dl/SWITCH_LANGUAGE_EVENTS',
  target: [switchEvents.SWITCH_LANGUAGE_BUTTON_CLICK],
  output: '#dl-event',
  consequence: (action) => {
    dlPush({
      event: 'genericEvent',
      eventname: 'language_switch',
      category: 'language_switch',
      action: action.payload,
      label: '',
      value: 0,
      nonInteraction: 'false',
    })
  },
})
