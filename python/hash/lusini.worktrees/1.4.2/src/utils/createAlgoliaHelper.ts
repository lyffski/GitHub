import config from '../../src/config'
import { PlainSearchParameters } from 'algoliasearch-helper'

export default async function createAlgoliaHelper(
  index: string,
  options: PlainSearchParameters
) {
  const [algoliasearch, algoliasearchHelper] = await Promise.all([
    import(/* webpackChunkName: "algoliasearch" */ 'algoliasearch'),
    import(
      /* webpackChunkName: "algoliasearch-helper" */ 'algoliasearch-helper'
    ),
  ])
  const client = algoliasearch.default(
    config.modules.algolia.applicationId,
    config.modules.algolia.apiKey
  )
  const helper = algoliasearchHelper.default(client, index, {
    attributesToHighlight: [],
    ...options,
  })

  /**
   * We want to distinguish between server and client request to track where our queries come from
   * So we add a analytics tag in our request
   */
  const tags = [
    typeof window === 'undefined' ? 'frontend-server' : 'frontend-client',
  ]

  helper.setQueryParameter('analyticsTags', tags)

  // monkeypatch "setQueryParameter"
  helper.setQueryParameter = (name, value) => {
    const proto = Object.getPrototypeOf(helper)
    if (name !== 'analyticsTags')
      return proto.setQueryParameter.bind(helper)(name, value)
    return proto.setQueryParameter.bind(helper)(name, [
      ...(value as any),
      ...tags,
    ] as any)
  }

  return helper
}
