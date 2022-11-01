import * as t from '../types'
import createAlgoliaHelper from 'utils/createAlgoliaHelper'
import config from 'config'
import slugify from 'utils/slugify'

const indexDict: Record<t.Index, string> = {
  default: config.index.products,
  'price-asc': config.index.productsPriceAsc,
}

/** @firescoutMockFn listing.fetch */
export async function fetch(
  filterValues: t.FilterValues
): Promise<t.api.Fetch> {
  const helper = await createAlgoliaHelper(indexDict[filterValues.index], {
    facets: ['active', 'sellable', 'product_line', 'specimen.isSpecimen'],
    disjunctiveFacets: [
      'prices.piecePriceNet',
      'flags',
      'sku',
      'related.configurableRelations.type',
    ].concat(
      Object.keys(filterValues.attributes).map(
        (key) => `attributes.${key}.values.value`
      ),
      Object.keys(filterValues.numericAttributes).map(
        (key) => `attributes.${key}.values.value`
      )
    ),
    distinct: filterValues.distinct ? 1 : 0,
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
    hitsPerPage: 24,
    attributesToRetrieve: [
      'sku',
      'containerID',
      'prices',
      'priceRules',
      'images',
      'title',
      'subtitle',
      'variantData',
      'brand',
      'unit',
      'flags',
      'variantImages',
      'attributes',
      'categories',
      'stock',
      'deliveryDate',
      'deliveryDays',
      'specialDelivery',
      'sellOut',
      'sellable',
    ],
  })

  if (filterValues.query) helper.setQuery(filterValues.query)
  for (const attribute in filterValues.numericAttributes) {
    const value = filterValues.numericAttributes[attribute]
    if (value.min) {
      helper.addNumericRefinement(
        `attributes.${attribute}.values.value`,
        '>=',
        value.min
      )
    }
    if (value.max) {
      helper.addNumericRefinement(
        `attributes.${attribute}.values.value`,
        '<=',
        value.max
      )
    }
  }

  for (const attribute in filterValues.attributes) {
    for (const value of filterValues.attributes[attribute])
      helper.addDisjunctiveFacetRefinement(
        `attributes.${attribute}.values.value`,
        value
      )
  }

  helper.addFacetRefinement('specimen.isSpecimen', 'false')
  if (filterValues.productLine) {
    helper.addFacetRefinement('product_line', filterValues.productLine)
  }
  if (filterValues.category)
    helper.addHierarchicalFacetRefinement('categories', filterValues.category)

  if (filterValues.mode === 'SELLABLE')
    helper.addFacetRefinement('sellable', 'true')

  // 07.09: some active:true articles have prices:null. etl bug
  if (filterValues.mode === 'ACTIVE')
    helper.addFacetRefinement('sellable', 'true')
  // helper.addFacetRefinement('active', 'true')

  if (filterValues.minPrice)
    helper.addNumericRefinement(
      'prices.piecePriceNet',
      '>=',
      filterValues.minPrice
    )

  if (filterValues.maxPrice)
    helper.addNumericRefinement(
      'prices.piecePriceNet',
      '<=',
      filterValues.maxPrice
    )

  if (filterValues.flags.length) {
    for (const flag of filterValues.flags)
      helper.addDisjunctiveFacetRefinement('flags', flag)
  }

  if (filterValues.skus) {
    filterValues.skus.forEach((sku) =>
      helper.addDisjunctiveFacetRefinement('sku', sku)
    )
  }

  if (filterValues.configurableProduct) {
    helper.addDisjunctiveFacetRefinement(
      'related.configurableRelations.type',
      'tableColumn'
    )
    helper.addDisjunctiveFacetRefinement(
      'related.configurableRelations.type',
      'tableTop'
    )
  }

  if (filterValues.analyticTags.length > 0)
    helper.setQueryParameter('analyticsTags', filterValues.analyticTags)

  helper.setPage(filterValues.page)

  const data = await helper.searchOnce({})

  const facets = {}
  for (const row of data.content.disjunctiveFacets) facets[row.name] = row

  const resultFacets: Record<string, t.FacetOption[]> = {}
  const resultNumericFacets: Record<string, t.Range | null> = {}

  for (const attribute in filterValues.numericAttributes) {
    const facet = facets[`attributes.${attribute}.values.value`]
    if (facet && (facet.stats?.min || facet.stats?.max)) {
      resultNumericFacets[attribute] = {
        min: Math.floor(facet.stats.min),
        max: Math.round(facet.stats.max),
      }
    } else {
      resultNumericFacets[attribute] = null
    }
  }

  for (const attribute in filterValues.attributes) {
    resultFacets[attribute] = Object.keys(
      facets[`attributes.${attribute}.values.value`]?.data || {}
    ).map((label) => ({
      label: label,
      nbHits: facets[`attributes.${attribute}.values.value`]?.data[label],
    }))
  }

  const result = {
    hits: data.content.hits,
    page: data.content.page,
    nbPages: data.content.nbPages,
    minPrice: facets['prices.piecePriceNet']?.stats.min || 0,
    maxPrice: facets['prices.piecePriceNet']?.stats.max || 1000,
    facets: resultFacets,
    numericFacets: resultNumericFacets,
    categoryTree: slugifyCategoryTree(
      data.content.hierarchicalFacets[0].data as t.CategoryOption[]
    ),
    nbHits: data.content.nbHits,
  }

  return result
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
