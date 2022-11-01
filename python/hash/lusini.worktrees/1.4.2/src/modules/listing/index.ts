import './rules'
import reducer, { State } from './reducer'
import store from 'store'
import { Action } from './actions'
import { injectReducer } from 'store/rootReducer'

injectReducer(store, 'listing', reducer)

declare global {
  interface RootState {
    listing: State
  }
  interface RootReducers {
    listing: typeof reducer
  }
  interface ModuleActions {
    listing: Action
  }
}

export { default as useHits } from './hooks/useHits'
export { default as useInitializer } from './hooks/useInitializer'
export { default as useFilterValues } from './hooks/useFilterValues'
export { default as useFacet } from './hooks/useFacet'
export { default as useNumericFacet } from './hooks/useNumericFacet'
export { default as useQuery } from './hooks/useQuery'
export { default as useCategoryTree } from './hooks/useCategoryTree'
export { default as usePrice } from './hooks/usePrice'
export { default as useIndex } from './hooks/useIndex'
export { default as usePage } from './hooks/usePage'
export { default as useAttributes } from './hooks/useAttributes'
