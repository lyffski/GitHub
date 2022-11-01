/* eslint-disable no-constant-condition */
import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'
import config from 'config'
import lightConfig from '../../light-config.json'

let request: null | Promise<any> = null

/**
 * Resolves a list of all categories in algolia. This is time-consuming
 * and should only be used server-side (plugins)
 */
export default async function fetchAllCategories() {
  if (request) return request
  request = doFetch()
  return request
}

async function doFetch() {
  const algoliaClient = algoliasearch(
    config.modules.algolia.applicationId,
    config.modules.algolia.apiKey
  )
  const algoliaHelper = algoliasearchHelper(
    algoliaClient,
    config.index.categories,
    {
      facets: ['active'],
      disjunctiveFacets: ['label'],
      attributesToHighlight: [],
    }
  )

  const algoliaData: any = []
  let algoliaPage = 0

  algoliaHelper.addFacetRefinement('active', 'true')

  if (process.env.LIGHT_START) {
    for (const cat of lightConfig.categories)
      algoliaHelper.addDisjunctiveFacetRefinement('label', cat.key)
  }

  while (true) {
    algoliaHelper.setPage(algoliaPage)
    const result: any = await algoliaHelper.searchOnce({ hitsPerPage: 1000 })
    algoliaData.push(...result.content.hits)

    if (algoliaPage < result.content.nbPages) {
      algoliaPage++
    } else break
  }

  return algoliaData
}

// fetchAllCategories().then(console.log, console.log)
