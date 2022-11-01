import * as at from './const'
import { defaultFilterValues } from './const'
import * as t from './types'

export const init = (
  recordId: string,
  filterValues: Partial<t.FilterValues>,
  attributes: {
    label: string
    key: string
    filtertype: string
    unit?: string
  }[],
  /** the filterValues that are used when we dispatch the RESET_FILTER_VALUES */
  resetFilterValues?: Partial<t.FilterValues>
) => {
  const newFilterValues = {
    ...defaultFilterValues,
    ...filterValues,
  } as t.FilterValues

  // setup attribute structure
  for (const info of attributes) {
    if (info.filtertype === 'rangeslider') {
      if (newFilterValues.numericAttributes[info.key]) continue
      newFilterValues.numericAttributes[info.key] = {
        min: null,
        max: null,
      }
    } else {
      if (newFilterValues.attributes[info.key]) continue
      newFilterValues.attributes[info.key] = []
    }
  }

  const newResetFilterValues = resetFilterValues
    ? ({ ...defaultFilterValues, ...resetFilterValues } as t.FilterValues)
    : newFilterValues
  return {
    type: at.INIT,
    meta: { recordId, resetFilterValues: newResetFilterValues, attributes },
    payload: newFilterValues,
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

export const setQuery = (recordId: string, query: string) => ({
  type: at.SET_QUERY,
  meta: { recordId },
  payload: query,
})

export const setAttribute = (
  recordId: string,
  key: string,
  value: string[]
) => ({
  type: at.SET_FILTER_ATTRIBUTE,
  meta: { recordId, key },
  payload: value,
})

export const setFilterValue = <Key extends keyof t.FilterValues>(
  recordId: string,
  key: Key,
  value: t.FilterValues[Key]
) => ({
  type: at.SET_FILTER_VALUE,
  meta: { recordId, key },
  payload: value,
})

export const toggleFacet = (
  recordId: string,
  facet: string,
  value: string
) => ({
  type: at.TOGGLE_FACET,
  meta: { recordId, facet },
  payload: value,
})

export const setPrice = (
  recordId: string,
  price: number,
  type: 'min' | 'max'
) => ({
  type: at.SET_PRICE,
  meta: { type, recordId },
  payload: price,
})

export const setIndex = (recordId: string, index: t.Index) => ({
  type: at.SET_INDEX,
  meta: { recordId },
  payload: index,
})

export const setPage = (recordId: string, page: number) => ({
  type: at.SET_PAGE,
  meta: { recordId },
  payload: page,
})

export const setCategory = (recordId: string, path: string) => ({
  type: at.SET_CATEGORY,
  meta: { recordId },
  payload: path,
})

export const resetFilterValues = (recordId: string) => ({
  type: at.RESET_FILTER_VALUES,
  meta: { recordId },
})

export const setFacetRange = (
  recordId: string,
  facetKey: string,
  n: number,
  type: 'min' | 'max'
) => ({
  type: at.SET_FACET_RANGE,
  meta: { type, recordId, facetKey },
  payload: n,
})

export type Init = ReturnType<typeof init>
export type FetchRequest = ReturnType<typeof fetchRequest>
export type FetchSuccess = ReturnType<typeof fetchSuccess>
export type FetchFailure = ReturnType<typeof fetchFailure>
export type SetFilterValue = ReturnType<typeof setFilterValue>
export type ToggleFacet = ReturnType<typeof toggleFacet>
export type SetQuery = ReturnType<typeof setQuery>
export type SetPrice = ReturnType<typeof setPrice>
export type SetIndex = ReturnType<typeof setIndex>
export type SetPage = ReturnType<typeof setPage>
export type ResetFilterValues = ReturnType<typeof resetFilterValues>
export type SetAttribute = ReturnType<typeof setAttribute>
export type SetFacetRange = ReturnType<typeof setFacetRange>
export type SetCategory = ReturnType<typeof setCategory>

export type Action =
  | Init
  | FetchRequest
  | FetchSuccess
  | FetchFailure
  | SetFilterValue
  | ToggleFacet
  | SetQuery
  | SetPrice
  | SetIndex
  | SetPage
  | ResetFilterValues
  | SetAttribute
  | SetFacetRange
  | SetCategory
