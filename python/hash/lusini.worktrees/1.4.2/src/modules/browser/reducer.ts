import * as at from './const'
import * as t from './types'
import { Action } from './actions'

export type State = {
  windowSize: t.WindowSize
}

export const defaultState: State = {
  windowSize: {
    name: 'XL',
    width: 0,
    height: 0,
  },
}

export default function reducer(state: State = defaultState, action: Action) {
  switch (action.type) {
    case at.SET_WINDOW_SIZE:
      return {
        ...state,
        windowSize: action.payload,
      }
    default:
      return state
  }
}
