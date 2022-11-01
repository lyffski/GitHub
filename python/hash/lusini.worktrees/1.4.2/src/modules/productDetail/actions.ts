import { defaultFilterValues } from './const'
import * as at from './const'
import * as t from './types'

export const init = (
  filterValues: Partial<t.FilterValues> & { containerID: string }
) => {
  return {
    type: at.INIT,
    payload: { ...defaultFilterValues, ...filterValues } as t.FilterValues,
  }
}

export const clear = () => ({
  type: at.CLEAR,
})

export const fetchRequest = (filterValues: t.FilterValues) => ({
  type: at.FETCH_REQUEST,
  meta: { filterValues },
})

export const fetchSuccess = (
  filterValues: t.FilterValues,
  result: t.api.Fetch
) => ({
  type: at.FETCH_SUCCESS,
  meta: { filterValues },
  payload: result,
})

export const setFilterValues = (
  filterValues: Omit<t.FilterValues, 'containerID'>
) => {
  return {
    type: at.SET_FILTER_VALUES,
    payload: filterValues,
  }
}

export const fetchFailure = (filterValues: t.FilterValues, err: string) => ({
  type: at.FETCH_FAILURE,
  meta: { filterValues },
  payload: err,
})

export const setFilterValue = (filterKey: t.FilterKey, value: string) => ({
  type: at.SET_FILTER_VALUE,
  meta: { filterKey },
  payload: value,
})

export const setCustomTailor = (
  type: t.CustomTailorAction,
  value: Partial<t.CustomTailorType>
) => ({
  type: at.SET_CUSTOM_TAILOR,
  payload: { type, value },
})

export const initCustomTailor = (value: t.CustomTailorFullType) => ({
  type: at.INIT_CUSTOM_TAILOR,
  payload: value,
})

export type Init = ReturnType<typeof init>
export type Clear = ReturnType<typeof clear>
export type FetchRequest = ReturnType<typeof fetchRequest>
export type FetchSuccess = ReturnType<typeof fetchSuccess>
export type FetchFailure = ReturnType<typeof fetchFailure>
export type SetFilterValue = ReturnType<typeof setFilterValue>
export type SetFilterValues = ReturnType<typeof setFilterValues>
export type SetCustomTailor = ReturnType<typeof setCustomTailor>
export type InitCustomTailor = ReturnType<typeof initCustomTailor>

export type Action =
  | Init
  | Clear
  | FetchRequest
  | FetchSuccess
  | FetchFailure
  | SetFilterValue
  | SetFilterValues
  | SetCustomTailor
  | InitCustomTailor
