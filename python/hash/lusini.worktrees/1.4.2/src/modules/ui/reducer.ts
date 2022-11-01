import * as at from './const'
import { Action } from './actions'

export type State = {
  searchValue: string
  showFlyoutNavi: boolean
  sidebarCategory: string | null
  currentCategory: string | null
  modalContent: any
  showB2COverlay: boolean
}

export const defaultState: State = {
  showFlyoutNavi: false,
  searchValue: '',
  sidebarCategory: null,
  currentCategory: null,
  modalContent: null,
  showB2COverlay: false,
}

export default function reducer(state: State = defaultState, action: Action) {
  switch (action.type) {
    case at.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      }
    case at.TOGGLE_NAVI:
      return {
        ...state,
        showFlyoutNavi: !state.showFlyoutNavi,
      }
    case at.SET_SIDEBAR_CATEGORY:
      return {
        ...state,
        sidebarCategory: action.payload,
        showFlyoutNavi: true,
      }
    case at.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      }
    case at.SHOW_OVERLAY: {
      return {
        ...state,
        showB2COverlay: true,
      }
    }
    case at.HIDE_OVERLAY: {
      return {
        ...state,
        showB2COverlay: false,
      }
    }
    case at.CLEAR:
      if (action.payload)
        return {
          ...defaultState,
          [action.payload]: state[action.payload],
          showB2COverlay: state.showB2COverlay,
        }
      return {
        ...defaultState,
      }

    case at.SET_MODAL_CONTENT:
      return {
        ...state,
        modalContent: action.payload,
      }
    default:
      return state
  }
}
