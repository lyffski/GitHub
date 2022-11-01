import { createStore, compose, applyMiddleware } from 'redux'
import createRootReducer from './rootReducer'
import ruleMiddleware from 'redux-ruleset'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

let hasWindow
try {
  if (window) hasWindow = true
} catch (e) {
  hasWindow = false
}
let composeEnhancers = compose

// if (process.env.NODE_ENV === 'development) {
if (hasWindow) {
  const composeWithDevToolsExtension =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension
  }
}

declare global {
  interface Store {
    subscribe(arg0: () => void)
    asyncReducers: any
    dispatch: (action: RootAction) => void
    replaceReducer: any
    getState: () => RootState
  }
}

const store: any = createStore(
  // @ts-ignore
  createRootReducer({ foo: () => 'bar' }),
  undefined,
  composeEnhancers(applyMiddleware(ruleMiddleware))
)

store.asyncReducers = {}

export default store as Store
