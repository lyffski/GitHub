import './rules'
import { default as reducer, State } from './reducer'
import { injectReducer } from 'store/rootReducer'
import store from 'store'
import { Action } from './actions'

injectReducer(store, 'b2cSwitch', reducer)

declare global {
  interface RootState {
    b2cSwitch: State
  }
  interface RootReducers {
    b2cSwitch: typeof reducer
  }
  interface ModuleActions {
    b2cSwitch: Action
  }
}

export { default as useCustomerType } from './hooks/useCustomerType'
export { default as useUserStatus } from './hooks/useUserStatus'
