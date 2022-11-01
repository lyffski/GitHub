import { addRule } from 'redux-ruleset'
import * as switchLanguageEvents from 'theme/app/Header/TopLine/events'
import * as switchCountryEvents from 'theme/app/Footer/CountrySwitch/events'
import { push as dlPush } from 'features/tracking/datalayer'

addRule({
  id: 'dl/SWITCH_LANGUAGE_EVENTS',
  target: [switchLanguageEvents.SWITCH_LANGUAGE_BUTTON_CLICK],
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

addRule({
  id: 'dl/SWITCH_COUNTRY_EVENTS',
  target: [switchCountryEvents.SWITCH_COUNTRY_BUTTON_CLICK],
  output: '#dl-event',
  consequence: (action) => {
    dlPush({
      event: 'genericEvent',
      eventname: 'country_switch',
      category: 'country_switch',
      action: action.payload,
      label: '',
      value: 0,
      nonInteraction: 'false',
    })
  },
})
