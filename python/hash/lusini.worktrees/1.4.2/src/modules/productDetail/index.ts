import './rules'
import reducer, { State } from './reducer'
import { injectReducer } from 'store/rootReducer'
import store from 'store'
import { Action } from './actions'

injectReducer(store, 'productDetail', reducer)

declare global {
  interface RootState {
    productDetail: State
  }
  interface RootReducers {
    productDetail: typeof reducer
  }
  interface ModuleActions {
    productDetail: Action
  }
}

export { default as useVariants } from './hooks/useVariants'
export { default as useInitializer } from './hooks/useInitializer'
export { default as useDisplayVariant } from './hooks/useDisplayVariant'
export { default as useFilter } from './hooks/useFilter'
export { default as useCustomTailor } from './hooks/useCustomTailor'
