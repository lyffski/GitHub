import * as at from './const'
import * as t from './types'
import { Action } from './actions'
import * as s from './selectors'

export type State = {
  data: t.Variant[]
  isFetching: boolean
  fetchError: null | string
  filterValues: t.FilterValues
  customTailor: t.CustomTailorType
  customTailorFullObject: t.CustomTailorFullType
}

export const defaultState: State = {
  data: [],
  isFetching: false,
  fetchError: null,
  filterValues: {
    containerID: '',
    color: null,
    size: null,
    variant: null,
    style: null,
  },
  customTailor: null,
  customTailorFullObject: null,
}

export default function reducer(state: State = defaultState, action: Action) {
  switch (action.type) {
    case at.INIT:
      return { ...state, filterValues: action.payload }
    case at.CLEAR:
      return { ...defaultState }
    case at.FETCH_REQUEST:
      return { ...state, isFetching: true, fetchError: null }
    case at.FETCH_SUCCESS:
      return { ...state, isFetching: false, data: action.payload }
    case at.FETCH_FAILURE:
      return { ...state, isFetching: false, fetchError: action.payload }
    case at.SET_FILTER_VALUE: {
      let newState = {
        ...state,
        filterValues: {
          ...state.filterValues,
          [action.meta.filterKey]: action.payload,
        },
      }
      const variants = s.getFilteredVariants(newState)

      if (variants.length) return newState

      // select the next valid variant with the selected filter value
      newState = {
        ...newState,
        filterValues: {
          ...defaultState.filterValues,
          containerID: newState.filterValues.containerID,
          [action.meta.filterKey]: action.payload,
        },
      }

      const variant = s.getDisplayVariant(newState)

      return {
        ...newState,
        filterValues: {
          ...newState.filterValues,
          color: variant.variantData.color?.label || null,
          size: variant.variantData.size?.label || null,
          style: variant.variantData.style?.label || null,
          variant: variant.variantData.variant?.label || null,
        },
      }
    }
    case at.SET_FILTER_VALUES:
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          ...action.payload,
        },
      }
    case at.SET_CUSTOM_TAILOR:
      return {
        ...state,
        customTailor: {
          ...state.customTailor,
          [action.payload.type]: action.payload.value,
        },
      }
    case at.INIT_CUSTOM_TAILOR:
      return {
        ...state,
        customTailorFullObject: action.payload,
      }
    default:
      return state
  }
}
