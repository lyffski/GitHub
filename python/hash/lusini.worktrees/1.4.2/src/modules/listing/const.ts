import * as t from './types'

export const INIT: 'listing/INIT' = 'listing/INIT'
export const FETCH_REQUEST: 'listing/FETCH_REQUEST' = 'listing/FETCH_REQUEST'
export const FETCH_SUCCESS: 'listing/FETCH_SUCCESS' = 'listing/FETCH_SUCCESS'
export const FETCH_FAILURE: 'listing/FETCH_FAILURE' = 'listing/FETCH_FAILURE'
export const SET_QUERY: 'listing/SET_QUERY' = 'listing/SET_QUERY'
/** TODO: rethink for better name e.g SET_SINGLE_FILTER_VALUE */
export const SET_FILTER_VALUE: 'listing/SET_FILTER_VALUE' =
  'listing/SET_FILTER_VALUE'
export const SET_FILTER_ATTRIBUTE: 'listing/SET_FILTER_ATTRIBUTE' =
  'listing/SET_FILTER_ATTRIBUTE'
export const TOGGLE_FACET: 'listing/TOGGLE_FACET' = 'listing/TOGGLE_FACET'
export const SET_PRICE: 'listing/SET_PRICE' = 'listing/SET_PRICE'
export const SET_INDEX: 'listing/SET_INDEX' = 'listing/SET_INDEX'
export const SET_PAGE: 'listing/SET_PAGE' = 'listing/SET_PAGE'
export const RESET_FILTER_VALUES: 'listing/RESET_FILTER_VALUES' =
  'listing/RESET_FILTER_VALUES'
export const SET_FACET_RANGE: 'listing/SET_FACET_RANGE' =
  'listing/SET_FACET_RANGE'
export const SET_CATEGORY: 'listing/SET_CATEGORY' = 'listing/SET_CATEGORY'

export const defaultFilterValues: t.FilterValues = {
  query: '',
  page: 0,
  attributes: {},
  category: '',
  minPrice: null,
  maxPrice: null,
  index: 'default',
  productLine: '',
  distinct: true,
  mode: 'SELLABLE',
  numericAttributes: {},
  flags: [],
  skus: [],
  configurableProduct: false,
  analyticTags: [],
}
