import createAlgoliaHelper from './createAlgoliaHelper'
import config from 'config'

const cache: Record<string, Promise<number>> = {}

/** yields the num hits by given path. eg. "Besteck > Gabeln" */
export default async function fetchCategoryNumHits(path: string) {
  if (await cache[path]) return await cache[path]

  const helper = await createAlgoliaHelper(config.index.products, {
    facets: ['active', 'sellable'],
    facetingAfterDistinct: true,
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
    attributesToRetrieve: ['active'],
  })

  helper.addFacetRefinement('active', 'true')
  helper.addFacetRefinement('sellable', 'true')
  helper.addHierarchicalFacetRefinement('categories', path)

  const request = helper
    .searchOnce({ hitsPerPage: 1 })
    .then((result) => result.content.nbHits)
  cache[path] = request

  return await request
}

export async function fetchSeriesNumHits(categoryId: string) {
  if (await cache[categoryId]) return await cache[categoryId]

  const helper = await createAlgoliaHelper(config.index.series, {
    facets: ['leafCategoryUuid'],
    attributesToRetrieve: ['leafCategoryUuid'],
  })

  helper.addFacetRefinement('leafCategoryUuid', categoryId)

  const request = helper
    .searchOnce({ hitsPerPage: 1 })
    .then((result) => result.content.nbHits)
  cache[categoryId] = request

  return await request
}
