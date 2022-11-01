import * as t from './types'
import * as at from './const'
import { Action } from './actions'

export type RecordState = {
  data: t.Hit[]
  isFetching: boolean
  fetchError: null | string
  filterValues: t.FilterValues
  filterOptions: {
    page: number[]
    categories: t.CategoryOption[]
  }
  nbPages: number
  nbHits: number
}

export type State = Record<string, RecordState>

export const defaultRecordState: RecordState = {
  data: [],
  isFetching: false,
  fetchError: null,
  filterValues: at.defaultFilterValues,
  filterOptions: {
    page: [],
    categories: [],
  },
  nbPages: 0,
  nbHits: 0,
}

export default function reducer(state: State = {}, action: Action): State {
  if (action.type.startsWith('seriesListing/'))
    return {
      ...state,
      [action.meta.recordId]: recordReducer(
        state[action.meta.recordId],
        action
      ),
    }

  return state
}

function recordReducer(
  state: RecordState = defaultRecordState,
  action: Action
): RecordState {
  switch (action.type) {
    case at.INIT:
      return { ...state, filterValues: action.payload }
    case at.FETCH_REQUEST:
      return { ...state, isFetching: true, fetchError: null }
    case at.FETCH_FAILURE:
      return { ...state, isFetching: false, fetchError: action.payload }
    case at.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.hits,
        nbPages: action.payload.nbPages,
        filterOptions: {
          page: genPageOptions(
            action.meta.filterValues.page,
            action.payload.nbPages,
            5
          ),
          categories: action.payload.categoryTree,
        },
        nbHits: action.payload.nbHits,
      }
    case at.SET_PAGE:
      return {
        ...state,
        filterValues: { ...state.filterValues, page: action.payload },
      }
    default:
      return state
  }
}

const genPageOptions = (page: number, nbPages: number, amountItems: number) => {
  if (amountItems > nbPages) amountItems = nbPages
  let start = page - Math.floor(amountItems / 2)
  start = Math.max(start, 1)
  start = Math.min(start, 1 + nbPages - amountItems)
  return Array.from({ length: amountItems }, (_, i) => start + i)
}
