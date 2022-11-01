import './rules'
import { default as reducer, State } from './reducer'
import { injectReducer } from 'store/rootReducer'
import store from 'store'
import { Action } from './actions'

injectReducer(store, 'cart', reducer)

declare global {
  interface RootState {
    cart: State
  }
  interface RootReducers {
    cart: typeof reducer
  }
  interface ModuleActions {
    cart: Action
  }
}

export { default as useCart } from './hooks/useCart'
