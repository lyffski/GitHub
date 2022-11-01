import { defaultFilterValues } from './const'
import { State } from './reducer'
import createReSelector from 're-reselect'
import * as t from './types'

export const getFilterValues = (state: State, recordId: string) => {
  if (state[recordId]) return state[recordId].filterValues
  return defaultFilterValues
}

const empty = []
export const getHits = (state: State, recordId: string) => {
  if (!state[recordId]) return empty
  return state[recordId].data
}

export const isFetching = (state: State, recordId: string) => {
  if (!state[recordId]) return false
  return state[recordId].isFetching
}

export const getFetchError = (state: State, recordId: string) => {
  if (!state[recordId]) return null
  return state[recordId].fetchError
}

export const getNbHits = (state: State, recordId: string) => {
  if (!state[recordId]) return 0
  return state[recordId].nbHits
}

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

export const getCategoryTree = createReSelector(
  (state: State, recordId: string) =>
    state[recordId]?.filterOptions.categories || empty,
  (tree) => {
    let parentNode: t.CategoryOption | null = null

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
      item: getItem(tree, null),
      parent: parentNode as t.CategoryOption | null,
    }
  }
)((_, recordId) => recordId)
