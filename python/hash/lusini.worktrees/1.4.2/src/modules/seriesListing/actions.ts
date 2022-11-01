import * as t from './types'
import * as at from './const'
import { defaultFilterValues } from './const'

export const init = (
  recordId: string,
  filterValues: Partial<t.FilterValues>
) => {
  filterValues = Object.assign({}, defaultFilterValues, filterValues)
  return {
    type: at.INIT,
    meta: { recordId },
    payload: filterValues as t.FilterValues,
  }
}

export const fetchRequest = (
  recordId: string,
  filterValues: t.FilterValues
) => ({
  type: at.FETCH_REQUEST,
  meta: { recordId, filterValues },
})

export const fetchSuccess = (
  recordId: string,
  filterValues: t.FilterValues,
  result: t.api.Fetch
) => ({
  type: at.FETCH_SUCCESS,
  meta: { recordId, filterValues },
  payload: result,
})

export const fetchFailure = (
  recordId: string,
  filterValues: t.FilterValues,
  error: string
) => ({
  type: at.FETCH_FAILURE,
  meta: { recordId, filterValues },
  payload: error,
})

export const setPage = (recordId: string, page: number) => ({
  type: at.SET_PAGE,
  meta: { recordId },
  payload: page,
})

export type Init = ReturnType<typeof init>
export type FetchRequest = ReturnType<typeof fetchRequest>
export type FetchSuccess = ReturnType<typeof fetchSuccess>
export type FetchFailure = ReturnType<typeof fetchFailure>
export type SetPage = ReturnType<typeof setPage>

export type Action = Init | FetchRequest | FetchSuccess | FetchFailure | SetPage
