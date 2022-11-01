import { addRule } from 'redux-ruleset'
import { push as dlPush } from 'features/tracking/datalayer'

import { TO_TOP_BUTTON_CLICK } from 'theme/partials/ToTopButton/events'

addRule({
  id: 'dl/BACK_TO_TOP_BUTTON_CLICK',
  target: TO_TOP_BUTTON_CLICK,
  output: '#dl-event',
  consequence: () => {
    dlPush({
      event: 'genericEvent',
      eventname: 'back_to_top',
      category: 'engagement',
      action: 'back_to_top',
      label: '',
      value: 0,
      nonInteraction: 'false',
    })
  },
})
