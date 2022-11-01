/* eslint-disable @typescript-eslint/no-empty-interface */
import { combineReducers } from 'redux'

import 'modules/navigation'

declare global {
  interface RootState {}
  interface RootReducers {}
  interface ModuleActions {}
  type ValueOf<T> = T[keyof T]
  type RootAction =
    | ValueOf<ModuleActions>
    | {
        type: 'PARTIAL_STATE_UPDATE'
        meta: { path: string[] }
        payload: any
      }
    | {
        type: 'TEST_CLEAR'
      }
}

/**
 * factory for reducer creation
 */
export default function createRootReducer(reducers: any) {
  return (state: RootState, action: RootAction) => {
    if (action.type === 'PARTIAL_STATE_UPDATE') {
      const nextState = { ...state }
      let inner = nextState

      for (let i = 0; i < action.meta.path.length; i++) {
        const path = action.meta.path[i]

        if (i === action.meta.path.length - 1) {
          inner[path] = action.payload
          return nextState
        } else {
          inner[path] = { ...inner[path] }
          inner = inner[path]
        }
      }
    }
    if(action.type === 'TEST_CLEAR') {
      // @ts-expect-error
      return combineReducers(reducers)(undefined, {type: '@@INIT'})
    }

    // @ts-ignore
    return combineReducers(reducers)(state, action)
  }
}

/**
 * you can call this method to add an reducer to the store by given key.
 * This method should be called by each module that implements a reducer
 */
export function injectReducer(store: any, key: string, reducer: any) {
  store.asyncReducers[key] = reducer
  store.replaceReducer(createRootReducer(store.asyncReducers))
}
