import createAlgoliaHelper from 'utils/createAlgoliaHelper'
import config from 'config'
import * as t from './types'

/** @firescoutMockFn productListFetcher.bySearch */
export default function bySearch(search: string, maxHits = 10) {
  return async (page: number): Promise<t.Result> => {
    const hitsPerPage = maxHits < 10 ? maxHits : 10

    const helper = await createAlgoliaHelper(config.index.products, {
      hitsPerPage: maxHits < 10 ? maxHits : 10,
      facets: ['active', 'sellable'],
      attributesToRetrieve: [
        'sku',
        'containerID',
        'prices',
        'priceRules',
        'images',
        'title',
        'brand',
        'unit',
        'flags',
        'variantImages',
        'categories',
        'attributes',
        'variantData',
      ],
    })
    helper.setQuery(search)
    helper.addFacetRefinement('active', 'true')
    helper.addFacetRefinement('sellable', 'true')

    helper.setPage(page)
    const result = await helper.searchOnce({})

    const totalHits = hitsPerPage * (page + 1)
    if (totalHits > maxHits) {
      const excess = totalHits - maxHits
      result.content.hits.splice(result.content.hits.length - excess)
    }

    return {
      data: result.content.hits,
      nbHits: maxHits < result.content.nbHits ? maxHits : result.content.nbHits,
      finished: totalHits >= maxHits,
    }
  }
}
