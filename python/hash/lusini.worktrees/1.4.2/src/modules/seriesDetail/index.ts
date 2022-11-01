import './rules'
import reducer, { State } from './reducer'
import store from 'store'
import { Action } from './actions'
import { injectReducer } from 'store/rootReducer'

injectReducer(store, 'seriesDetail', reducer)

declare global {
  interface RootState {
    seriesDetail: State
  }
  interface RootReducers {
    seriesDetail: typeof reducer
  }
  interface ModuleActions {
    seriesDetail: Action
  }
}

export { default as useSeriesContainer } from './hooks/useSeriesContainer'
export { default as useInitializer } from './hooks/useInitializer'
export { default as useActualSeriesPath } from './hooks/useActualSeriesPath'
