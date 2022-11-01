import * as t from './types'
export const INIT: 'seriesListing/INIT' = 'seriesListing/INIT'
export const FETCH_REQUEST: 'seriesListing/FETCH_REQUEST' =
  'seriesListing/FETCH_REQUEST'
export const FETCH_SUCCESS: 'seriesListing/FETCH_SUCCESS' =
  'seriesListing/FETCH_SUCCESS'
export const FETCH_FAILURE: 'seriesListing/FETCH_FAILURE' =
  'seriesListing/FETCH_FAILURE'
export const SET_PAGE: 'seriesListing/SET_PAGE' = 'seriesListing/SET_PAGE'

export const defaultFilterValues: t.FilterValues = {
  categoryId: '',
  page: 0,
  categoryPath: '',
}
