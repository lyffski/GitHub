import { addRule } from 'redux-ruleset'
import * as at from './const'
import * as a from './actions'
import * as api from './utils/api'
import getCookieByName from 'utils/getCookieByName'
import config from 'config'

addRule({
  id: 'b2cSwitch/INITIAL_USER_STATUS',
  target: '*',
  output: at.SET_USER_STATUS,
  addOnce: true,
  consequence: () => {
    const customerTypeDecision = getCookieByName('b2cDecision') || 0
    if (typeof document !== 'undefined') {
      document.cookie = `b2cDecision=${customerTypeDecision};domain=${config.modules.cart.domain};path=/`
      document.cookie = `b2cDecision=${customerTypeDecision};path=/`
    }
    return api.fetch().then(
      (result) => {
        localStorage.setItem('userStatus', result)
        return a.setUserStatus(result)
      },
      () => null
    )
  },
})
