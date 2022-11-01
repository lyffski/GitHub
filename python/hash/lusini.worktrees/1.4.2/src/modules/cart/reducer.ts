import * as t from './types'
import * as at from './const'
import { Action } from './actions'

export type State = {
  isUpdating: boolean
  updateError: null | string
  data: t.Cart
}

export const defaultState = {
  isUpdating: false,
  updateError: null,
  data: {
    items: [],
    totalNetto: 0,
    totalBrutto: 0,
  },
}

export default function reducer(
  state: State = defaultState,
  action: Action
): State {
  switch (action.type) {
    case at.SET: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case at.ADD_ITEM_REQUEST: {
      return {
        ...state,
        updateError: null,
        isUpdating: true,
      }
    }
    case at.ADD_ITEM_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isUpdating: false,
      }
    }
    case at.ADD_ITEM_FAILURE: {
      return {
        ...state,
        updateError: action.payload,
        isUpdating: false,
      }
    }
    case at.REMOVE_ITEM_REQUEST: {
      return {
        ...state,
        updateError: null,
        isUpdating: true,
      }
    }
    case at.REMOVE_ITEM_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          items: state.data.items.filter(
            (item) => item.position_id !== action.meta.position_id
          ),
        },
        isUpdating: false,
      }
    }
    case at.REMOVE_ITEM_FAILURE: {
      return {
        ...state,
        updateError: action.payload,
        isUpdating: false,
      }
    }

    default:
      return state
  }
}
