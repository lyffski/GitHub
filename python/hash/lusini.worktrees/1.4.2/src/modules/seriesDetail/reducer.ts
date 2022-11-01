import * as t from './types'
import { Action } from './actions'
import * as at from './const'

export type State = {
  isFetching: boolean
  fetchError: string | null
  data: t.SeriesContainer | null
  filters: {
    label: string
    key: string
    filtertype: string
  }[]
}

export const defaultState: State = {
  isFetching: false,
  fetchError: null,
  data: null,
  filters: [],
}

export default function reducer(
  state: State = defaultState,
  action: Action
): State {
  switch (action.type) {
    case at.CLEAR:
      return defaultState
    case at.FETCH_REQUEST:
      return { ...state, isFetching: true, fetchError: null }
    case at.FETCH_FAILURE:
      return { ...state, isFetching: false, fetchError: action.payload }
    case at.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.container,
        filters: action.payload.filters,
      }
    default:
      return state
  }
}
