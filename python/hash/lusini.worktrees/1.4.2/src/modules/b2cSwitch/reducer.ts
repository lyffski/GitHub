import * as at from './const'
import { Action } from './actions'
import * as t from './types'

export type State = {
  customerType: {
    customerType: t.CustomerType
    DlEvent: t.DlEvent
  }
  userStatus: t.UserStatus
}

let localStorageValue: t.UserStatus = 'loggedOut'
if (typeof window !== 'undefined' && localStorage.getItem('userStatus')) {
  localStorageValue =
    localStorage.getItem('userStatus') === 'loggedIn' ? 'loggedIn' : 'loggedOut'
}

export const defaultState: State = {
  customerType: {
    customerType: 'b2b',
    DlEvent: 'navigation_b2b2c_switch',
  },
  userStatus: localStorageValue || 'loggedOut',
}

export default function reducer(state: State = defaultState, action: Action) {
  switch (action.type) {
    case at.SET_CUSTOMER_TYPE: {
      return {
        ...state,
        customerType: action.payload,
      }
    }
    case at.SET_USER_STATUS: {
      return {
        ...state,
        userStatus: action.payload,
      }
    }
    default:
      return state
  }
}
