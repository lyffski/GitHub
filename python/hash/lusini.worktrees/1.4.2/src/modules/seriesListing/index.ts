import './rules'
import reducer, { State } from './reducer'
import store from 'store'
import { Action } from './actions'
import { injectReducer } from 'store/rootReducer'

injectReducer(store, 'seriesListing', reducer)

declare global {
  interface RootState {
    seriesListing: State
  }
  interface RootReducers {
    seriesListing: typeof reducer
  }
  interface ModuleActions {
    seriesListing: Action
  }
}

export { default as useHits } from './hooks/useHits'
export { default as useInitializer } from './hooks/useInitializer'
export { default as usePage } from './hooks/usePage'
export { default as useCategoryTree } from './hooks/useCategoryTree'
