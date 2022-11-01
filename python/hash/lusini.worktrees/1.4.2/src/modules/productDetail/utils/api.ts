import * as t from '../types'
import createAlgoliaHelper from 'utils/createAlgoliaHelper'
import config from 'config'

/** @firescoutMockFn productDetail.fetch */
export const fetch = async (
  filterValues: t.FilterValues
): Promise<t.api.Fetch> => {
  const helper = await createAlgoliaHelper(config.index.products, {
    facets: ['containerID'],
    disjunctiveFacets: ['active'],
    distinct: 0,
    attributesToRetrieve: [
      'sku',
      'brand',
      'containerID',
      'variantData',
      'categories',
      'shippingFree',
      'attributes',
      'images',
      'specialDelivery',
      'prices',
      'priceRules',
      'unit',
      'title',
      'subtitle',
      'description',
      'stock',
      'sellOut',
      'deliveryDate',
      'deliveryDays',
      'flags',
      'sellable',
      'documents',
      'related',
      'product_line',
      'series',
      'hreflang',
      'specimen',
      'mainCategory',
      'configurations',
    ],
  })
  helper.addFacetRefinement('containerID', filterValues.containerID)
  helper.addDisjunctiveFacetRefinement('active', 'true')

  const result = await helper.searchOnce({ hitsPerPage: 1000 })

  return result.content.hits
}
