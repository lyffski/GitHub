import createAlgoliaHelper from 'utils/createAlgoliaHelper'
import config from 'config'
import * as t from './types'

/** @firescoutMockFn productListFetcher.bySku */
export default function bySku(
  skus: string[],
  maxHits = 10,
  keepSorting = true
) {
  return async (page: number): Promise<t.Result> => {
    const helper = await createAlgoliaHelper(config.index.products, {
      hitsPerPage: maxHits < 10 ? maxHits : 10,
      facets: ['active', 'sellable'],
      disjunctiveFacets: ['sku'],
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
        'related',
        'stock',
        'deliveryDate',
        'deliveryDays',
        'specialDelivery',
        'sellOut',
        'sellable',
        'subtitle',
      ],
    })
    skus.forEach((sku) => helper.addDisjunctiveFacetRefinement('sku', sku))

    helper.addFacetRefinement('active', 'true')
    helper.addFacetRefinement('sellable', 'true')

    helper.setPage(page)

    const result = await helper.searchOnce({})

    const hitDict: Record<string, t.Product> = {}
    for (const hit of result.content.hits) hitDict[hit.sku] = hit

    let products = skus.map((sku) => hitDict[sku]).filter(Boolean)

    if (keepSorting) {
      const productDict: Record<string, t.Product> = {}
      for (const p of products) productDict[p.sku] = p
      products = skus.map((sku) => productDict[sku]).filter(Boolean)
    }

    return {
      data: products,
      nbHits: maxHits < result.content.nbHits ? maxHits : result.content.nbHits,
      finished: !(result.content.nbPages > page),
    }
  }
}
