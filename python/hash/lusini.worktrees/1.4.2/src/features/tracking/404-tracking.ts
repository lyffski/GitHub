import { addRule } from 'redux-ruleset'
import * as event from 'features/tracking/events'
import { push as dlPush } from 'features/tracking/datalayer'

addRule({
  id: 'dl/404',
  target: event.TRACK_404_ERROR,
  output: '#dl-event',
  consequence: (action) => {
    dlPush({
      event: 'genericEvent',
      eventname: 'http_error',
      category: 'http_error',
      action: '404',
      label: action.payload,
      value: 0,
      nonInteraction: 'true',
    })
  },
})
