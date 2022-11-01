import * as t from '../types'
import createAlgoliaHelper from 'utils/createAlgoliaHelper'
import config from 'config'
import slugify from 'utils/slugify'

/** @firescoutMockFn seriesListing.fetch */
export async function fetch(
  filterValues: t.FilterValues
): Promise<t.api.Fetch> {
  const helper = await createAlgoliaHelper(config.index.series, {
    facets: ['leafCategoryUuid', 'active'],
    attributesToRetrieve: ['title', 'images', 'brand', 'referenceSku'],
  })

  const categoryHelper = await createAlgoliaHelper(config.index.products, {
    facets: ['active', 'sellable'],
    hierarchicalFacets: [
      {
        name: 'categories',
        separator: ' > ',
        // @ts-ignore
        sortBy: ['name:asc'],
        attributes: [
          'categories.lvl0',
          'categories.lvl1',
          'categories.lvl2',
          'categories.lvl3',
          'categories.lvl4',
          'categories.lvl5',
          'categories.lvl6',
          'categories.lvl7',
        ],
      },
    ],
    facetingAfterDistinct: true,
    hitsPerPage: 1,
    attributesToRetrieve: [],
  })

  helper.addFacetRefinement('active', 'true')
  categoryHelper.addFacetRefinement('active', 'true')
  categoryHelper.addFacetRefinement('sellable', 'true')

  if (filterValues.categoryId)
    helper.addFacetRefinement('leafCategoryUuid', filterValues.categoryId)
  if (filterValues.page) helper.setPage(filterValues.page)

  categoryHelper.addHierarchicalFacetRefinement(
    'categories',
    filterValues.categoryPath
  )

  const [result, categoryResult] = await Promise.all([
    helper.searchOnce({ hitsPerPage: 24 }),
    categoryHelper.searchOnce({ hitsPerPage: 1 }),
  ])

  const hits = result.content.hits.map((hit) => {
    if (!hit.images) hit.images = { imageWeb: [] }
    return hit
  })

  return {
    hits: hits,
    nbPages: result.content.nbPages,
    page: result.content.page,
    categoryTree: slugifyCategoryTree(
      categoryResult.content.hierarchicalFacets[0].data as t.CategoryOption[]
    ),
    nbHits: result.content.nbHits,
  }
}

function slugifyCategoryTree(
  tree: t.CategoryOption[] | null
): t.CategoryOption[] {
  if (!tree) return []
  return tree.map((item) => ({
    ...item,
    urlPath: `/category/` + slugify(item.path),
    data: item.data ? slugifyCategoryTree(item.data) : null,
  }))
}
