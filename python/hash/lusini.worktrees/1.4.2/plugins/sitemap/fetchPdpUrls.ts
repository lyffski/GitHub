import createAlgoliaHelper from '../../src/utils/createAlgoliaHelper'
import config from '../../src/config'

export default async function fetchPdpUrls() {
  const helper = await createAlgoliaHelper(config.index.products, {
    attributesToRetrieve: ['containerID', 'dbt_updated_at'],
    facets: ['active'],
  })

  helper.addFacetRefinement('active', 'true')

  const result: { path: string; updatedAt: string }[] = []

  let page = 0

  let run = true
  while (run) {
    helper.setPage(page++)
    const response = await helper.searchOnce({ hitsPerPage: 1000 })
    const hits = response.content.hits
    for (const hit of hits)
      result.push({
        path: `/pdp/${hit.containerID}/`,
        updatedAt: hit.dbt_updated_at,
      })
    if (hits.length < 1000) run = false
  }

  return result
}
