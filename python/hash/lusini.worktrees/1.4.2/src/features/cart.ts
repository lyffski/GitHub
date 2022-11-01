import { addRule } from 'redux-ruleset'
import * as CartEvents from 'theme/templates/Cart/events'
import * as AccountEvents from 'theme/templates/Account/events'
import { REFRESH } from 'modules/cart/const'
import { refresh } from 'modules/cart/actions'

addRule({
  id: 'feature/REFRESH_CART',
  target: [CartEvents.REFRESH, AccountEvents.REFRESH],
  output: REFRESH,
  consequence: () => refresh(),
})
