import './rules'
import { default as reducer, State } from './reducer'
import { injectReducer } from 'store/rootReducer'
import store from 'store'
import { Action } from './actions'

injectReducer(store, 'ui', reducer)

declare global {
  interface RootState {
    ui: State
  }
  interface RootReducers {
    ui: typeof reducer
  }
  interface ModuleActions {
    ui: Action
  }
}

export { default as useSearchValue } from './hooks/useSearchValue'
export { default as useFlyoutNavi } from './hooks/useFlyoutNavi'
export { default as useModal } from './hooks/useModal'
export { default as useActualUIPath } from './hooks/useActualUIPath'
