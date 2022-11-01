import * as t from '../types'
import createAlgoliaHelper from 'utils/createAlgoliaHelper'
import config from 'config'
import { convertFilters } from 'utils/categories'

/** @firescoutMockFn seriesDetail.fetch */
export async function fetch(objectID: string): Promise<t.api.Fetch> {
  const [helperSeries, helperCat] = await Promise.all([
    createAlgoliaHelper(config.index.series, {
      facets: ['objectID'],
      attributesToRetrieve: [
        'title',
        'description',
        'images',
        'brand',
        'attributes',
        'categories',
      ],
    }),
    createAlgoliaHelper(config.index.categories, {
      facets: ['objectID'],
      attributesToRetrieve: ['filters'],
    }),
  ])

  helperSeries.addFacetRefinement('objectID', objectID)
  helperCat.addFacetRefinement('objectID', config.rootCategoryId)
  const [result, catResult] = await Promise.all([
    helperSeries.searchOnce({ hitsPerPage: 1 }),
    helperCat.searchOnce({ hitsPerPage: 1 }),
  ])

  const hit = result.content.hits[0]
  const cat = catResult.content.hits[0]

  if (!hit || !cat)
    throw new Error('could not find series with objectID of ' + objectID)

  if (!hit.images) {
    hit.images = {
      imageWeb: [],
    }
  }

  return {
    container: hit,
    filters: convertFilters(cat.filters).sort((a) => {
      if (a.key === 'PRODUCT_TYPE') return -1
      else return 0
    }),
  }
}
