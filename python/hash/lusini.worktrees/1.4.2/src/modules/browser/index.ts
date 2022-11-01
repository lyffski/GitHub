import './rules'
import { default as reducer, State } from './reducer'
import { injectReducer } from 'store/rootReducer'
import store from 'store'
import { Action } from './actions'

injectReducer(store, 'browser', reducer)

declare global {
  interface RootState {
    browser: State
  }
  interface RootReducers {
    browser: typeof reducer
  }
  interface ModuleActions {
    browser: Action
  }
}

export { default as useWindowSize } from './hooks/useWindowSize'
