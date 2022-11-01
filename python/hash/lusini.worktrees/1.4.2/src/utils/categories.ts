import createAlgoliaHelper from './createAlgoliaHelper'
import config from 'config'

let categoriesPromise

async function doFetch() {
  const helper = await createAlgoliaHelper(config.index.categories, {
    facets: ['active'],
  })
  helper.addFacetRefinement('active', 'true')
  const result: any[] = []
  let page = 0

  // eslint-disable-next-line no-constant-condition
  while (true) {
    helper.setPage(page)
    const res = await helper.searchOnce({ hitsPerPage: 1000 })
    result.push(...res.content.hits)

    if (page < res.content.nbPages) {
      page++
    } else break
  }

  return result
}

/** @firescoutMockFn utils.categories_getAllCatgories */
export function getAllCategories() {
  if (categoriesPromise) return categoriesPromise
  categoriesPromise = doFetch()
  return categoriesPromise
}

/**
 * Resolves the category from categories index. The request ist batched and cached. That means
 * that the request ist optimized for performance.
 */
export async function getCategory(objectID: string) {
  const categories = await getAllCategories()
  for (const cat of categories) {
    if (cat.objectID === objectID) return cat
  }
}

export function convertFilters(
  filterRaw: Record<
    string,
    { label: string; sorting: string; filtertype: string; unit?: string }
  >
) {
  const filters: {
    label: string
    key: string
    filtertype: string
    unit?: string
  }[] = []
  for (const filterKey in filterRaw) {
    filters.push({
      label: filterRaw[filterKey].label,
      key: filterKey,
      filtertype: filterRaw[filterKey].filtertype,
      unit: filterRaw[filterKey].unit,
    })
  }

  return filters.sort((a, b) => {
    const scoreA = parseInt(filterRaw[a.key].sorting)
    const scoreB = parseInt(filterRaw[b.key].sorting)
    return scoreA > scoreB ? 1 : -1
  })
}

/**
 * Resolves the category filters in a format, that the listing index can handle it. If no categoryId
 * is given, the root filters are resolved
 */
export async function getFilters(categoryId?: string) {
  const hit = await getCategory(categoryId || config.rootCategoryId)
  if (!hit) return []

  return convertFilters(hit.filters)
}
