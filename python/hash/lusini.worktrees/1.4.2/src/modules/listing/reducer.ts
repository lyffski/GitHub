import * as at from './const'
import * as t from './types'
import { defaultFilterValues } from './const'
import { Action } from './actions'

export type State = Record<string, RecordState | undefined>

type RecordState = {
  isFetching: boolean
  fetchError: string | null
  data: t.Product[]
  filterValues: t.FilterValues
  resetFilterValues: t.FilterValues
  filterInfo: Record<string, t.FilterInfo>
  facets: string[]
  filterOptions: {
    category: Array<t.CategoryOption>
    minPrice: number
    maxPrice: number
    page: number[]
    attributes: Record<string, t.FacetOption[]>
    numericAttributes: Record<string, t.Range | null>
  }
  nbPages: number
  nbHits: number
}

export const defaultState = {}

export const defaultRecordState: RecordState = {
  isFetching: false,
  fetchError: null,
  data: [],
  filterValues: defaultFilterValues,
  resetFilterValues: defaultFilterValues,
  filterInfo: {},
  facets: [],
  filterOptions: {
    category: [],
    minPrice: 0,
    maxPrice: 10000,
    page: [1, 2, 3],
    attributes: {},
    numericAttributes: {},
  },
  nbPages: 0,
  nbHits: 0,
}

export default function reducer(state: State = defaultState, action: Action) {
  if (action.type.startsWith('listing/'))
    return {
      ...state,
      [action.meta.recordId]: record(state[action.meta.recordId], action),
    }

  return state
}

const genPageOptions = (page: number, nbPages: number, amountItems: number) => {
  if (amountItems > nbPages) amountItems = nbPages
  let start = page - Math.floor(amountItems / 2)
  start = Math.max(start, 1)
  start = Math.min(start, 1 + nbPages - amountItems)
  return Array.from({ length: amountItems }, (_, i) => start + i)
}

function record(
  state: RecordState = defaultRecordState,
  action: Action
): RecordState {
  switch (action.type) {
    case at.INIT: {
      const filterInfo: Record<string, t.FilterInfo> = {}
      for (const row of action.meta.attributes)
        filterInfo[row.key] = {
          key: row.key,
          type: row.filtertype,
          unit: row.unit,
          label: row.label,
        }

      return {
        ...state,
        filterValues: action.payload,
        resetFilterValues: action.meta.resetFilterValues,
        facets: action.meta.attributes.map((row) => row.key),
        filterInfo,
      }
    }

    case at.FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        fetchError: null,
      }

    case at.FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload,
      }

    case at.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.hits,
        nbPages: action.payload.nbPages,
        nbHits: action.payload.nbHits,
        filterOptions: {
          ...state.filterOptions,
          category: action.payload.categoryTree,
          minPrice: action.payload.minPrice,
          maxPrice: action.payload.maxPrice,
          attributes: action.payload.facets,
          numericAttributes: action.payload.numericFacets,
          page: genPageOptions(
            state.filterValues.page + 1,
            action.payload.nbPages,
            5
          ),
        },
      }

    case at.TOGGLE_FACET: {
      const { facet } = action.meta
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          page: 0,
          attributes: {
            ...state.filterValues.attributes,
            [facet]: state.filterValues.attributes[facet].includes(
              action.payload
            )
              ? state.filterValues.attributes[facet].filter(
                  (s) => s !== action.payload
                )
              : [...state.filterValues.attributes[facet], action.payload],
          },
        },
      }
    }

    case at.SET_FILTER_VALUE:
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          page: 0,
          [action.meta.key]: action.payload,
        },
      }

    case at.SET_FILTER_ATTRIBUTE:
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          page: 0,
          attributes: {
            ...state.filterValues.attributes,
            [action.meta.key]: action.payload,
          },
        },
      }

    case at.RESET_FILTER_VALUES:
      return {
        ...state,
        filterValues: {
          // ...state.resetFilterValues,
          // category: state.filterValues.category,

          ...state.resetFilterValues,
          category: state.filterValues.category,
          page: 0,
          attributes: Object.keys(state.filterValues.attributes).reduce(
            (attributes, key) => {
              attributes[key] = []
              return attributes
            },
            {}
          ),
          numericAttributes: Object.keys(
            state.filterValues.numericAttributes
          ).reduce((attributes, key) => {
            attributes[key] = { min: null, max: null }
            return attributes
          }, {}),
        },
      }

    case at.SET_QUERY:
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          page: 0,
          query: action.payload,
        },
      }

    case at.SET_CATEGORY:
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          page: 0,
          category: action.payload,
        },
      }

    case at.SET_INDEX:
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          page: 0,
          index: action.payload,
        },
      }

    case at.SET_PRICE:
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          page: 0,
          minPrice:
            action.meta.type === 'min'
              ? action.payload
              : state.filterValues.minPrice,
          maxPrice:
            action.meta.type === 'max'
              ? action.payload
              : state.filterValues.maxPrice,
        },
      }

    case at.SET_FACET_RANGE: {
      const prev = state.filterValues.numericAttributes[action.meta.facetKey]
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          page: 0,
          numericAttributes: {
            ...state.filterValues.numericAttributes,
            [action.meta.facetKey]: {
              min: action.meta.type === 'min' ? action.payload : prev.min,
              max: action.meta.type === 'max' ? action.payload : prev.max,
            },
          },
        },
      }
    }

    case at.SET_PAGE:
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          page: action.payload,
        },
      }

    default:
      return state
  }
}
