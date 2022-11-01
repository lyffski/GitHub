import { State, defaultRecordState } from './reducer'
import * as t from './types'
import createReSelector from 're-reselect'
import { defaultFilterValues } from './const'

const empty = []
const emptyRange = { min: null, max: null }
export const getFilterOptions = (
  state: State,
  recordId: string,
  facetKey: string
): t.FacetOption[] => {
  return state[recordId]?.filterOptions.attributes[facetKey] || empty
}

export const getFacet = createReSelector(
  (state: State, recordId: string, facetKey: string) =>
    getFilterOptions(state, recordId, facetKey),
  (_, __, facetKey: string) => facetKey,
  (state: State, recordId: string, facetKey: string) =>
    getFilterValues(state, recordId).attributes[facetKey],
  (state: State, recordId: string, facetKey: string) =>
    state[recordId]?.filterInfo[facetKey] || null,
  (options, facetKey, value, filterInfo): t.Facet => ({
    key: facetKey,
    options: options,
    value: value,
    label: filterInfo?.label || '-',
    filtertype: filterInfo?.type || 'checkbox',
    unit: filterInfo?.unit,
  })
)((_, recordId, facetKey) => `${recordId}:${facetKey}`)

export const getNumericFacet = createReSelector(
  (state: State, recordId: string, facetKey: string) =>
    state[recordId]?.filterValues.numericAttributes[facetKey] || emptyRange,
  (state: State, recordId: string, facetKey: string) =>
    state[recordId]?.filterOptions.numericAttributes[facetKey] || emptyRange,
  (_, __, facetKey: string) => facetKey,
  (state: State, recordId: string, facetKey: string) =>
    state[recordId]?.filterInfo[facetKey] || null,
  (value, options, facetKey, filterInfo): t.NumericFacet => ({
    key: facetKey,
    options: options,
    value: value,
    label: filterInfo?.label || '-',
    filtertype: filterInfo?.type || 'checkbox',
    unit: filterInfo?.unit,
  })
)((_, recordId, facetKey) => `${recordId}:${facetKey}`)

export const getFilterValues = (
  state: State,
  recordId: string
): t.FilterValues => state[recordId]?.filterValues || defaultFilterValues

export const getHits = (state: State, recordId: string): t.Product[] => {
  return state[recordId]?.data || empty
}

export const getFetchError = (
  state: State,
  recordId: string
): string | null => {
  return state[recordId]?.fetchError || null
}

export const isFetching = (state: State, recordId: string): boolean => {
  return state[recordId]?.isFetching || false
}

export const getQuery = (state: State, recordId: string): string => {
  return state[recordId]?.filterValues.query || ''
}

export const getAttributes = createReSelector(
  (state: State, recordId: string) =>
    state[recordId]?.facets || defaultRecordState.facets,
  (state: State, recordId: string) =>
    state[recordId]?.filterOptions.attributes ||
    defaultRecordState.filterOptions.attributes,
  (state: State, recordId: string) =>
    state[recordId]?.filterOptions.numericAttributes ||
    defaultRecordState.filterOptions.numericAttributes,
  (state: State, recordId: string) =>
    state[recordId]?.filterInfo || defaultRecordState.filterInfo,
  (facets, attributes, numericAttributes, filterInfoDict) => {
    const result: {
      label: string
      key: string
      filtertype: string
      unit?: string
    }[] = []

    result.push({
      key: 'PRICE',
      label: '',
      filtertype: '',
      unit: '',
    })

    for (const facet of facets) {
      if (attributes[facet] && attributes[facet].length > 1)
        result.push({
          key: facet,
          label: filterInfoDict[facet].label,
          filtertype: filterInfoDict[facet].type,
          unit: filterInfoDict[facet].unit,
        })
      if (numericAttributes[facet])
        result.push({
          key: facet,
          label: filterInfoDict[facet].label,
          filtertype: filterInfoDict[facet].type,
          unit: filterInfoDict[facet].unit,
        })
    }

    return result
  }
)((_, recordId: string) => recordId)

export const getPrice = createReSelector(
  (state: State, recordId: string) =>
    state[recordId]?.filterValues.minPrice || null,
  (state: State, recordId: string) =>
    state[recordId]?.filterValues.maxPrice || null,
  (state: State, recordId: string) =>
    state[recordId]?.filterOptions.minPrice || 0,
  (state: State, recordId: string) =>
    state[recordId]?.filterOptions.maxPrice || 10000,
  (fMin, fMax, oMin, oMax) => ({
    data: { min: fMin, max: fMax },
    options: { min: oMin, max: oMax },
  })
)((_, recordId: string) => recordId)

export const getCategoryTree = createReSelector(
  (state: State, recordId: string) =>
    state[recordId]?.filterOptions.category || empty,
  (tree) => {
    let parentNode: t.CategoryOption | null = null

    const getRootItem = (): t.CategoryOption => ({
      name: '',
      path: '',
      count: tree.reduce((p, n) => p + n.count, 0),
      isRefined: true,
      exhaustive: true,
      data: tree,
      urlPath: '/category/',
    })

    const getItem = (
      items: t.CategoryOption[],
      parent: t.CategoryOption | null
    ): t.CategoryOption | null => {
      for (const item of items) {
        if (item.isRefined && (!item.data || !item.data.length)) {
          parentNode = parent
          return item
        }
        if (item.isRefined && item.data) {
          const subItem = getItem(item.data, item)
          if (!subItem) {
            parentNode = parent
            return item
          } else return subItem
        }
      }
      return null
    }

    return {
      item: getItem(tree, null) || getRootItem(),
      parent: parentNode as t.CategoryOption | null,
    }
  }
)((_, recordId) => recordId)

export const getResetFilterValues = (state: State, recordId: string) =>
  state[recordId]?.resetFilterValues || defaultFilterValues

export const getNbHits = (state: State, recordId: string) =>
  state[recordId]?.nbHits || 0

export const getIndex = (state: State, recordId: string): t.Index =>
  state[recordId]?.filterValues.index || 'default'

export const getPage = createReSelector(
  (state: State, recordId: string) => state[recordId]?.filterValues.page || 0,
  (state: State, recordId: string) => state[recordId]?.nbPages || 1,
  (state: State, recordId: string) =>
    state[recordId]?.filterOptions.page || [1, 2, 3],
  (page, nbPages, pageOptions) => ({
    data: {
      page: page,
      nbPages: nbPages,
    },
    options: pageOptions,
  })
)((_, recordId) => recordId)

export const getFilterInfoDict = (state: State, recordId: string) =>
  state[recordId]?.filterInfo || {}
