var config = require('../../src/config')
var contentful = require('contentful')

exports.sourceNodes = async (opt) => {
  const { cache, actions } = opt
  const { createNode } = actions
  const fromCache = (await cache.get('cf-saved-snippets')) || []
  const timestamp = await cache.get('cf-source-nodes')

  const client = contentful.createClient({
    space: config.modules.contentful.space,
    environment: config.modules.contentful.environment, // defaults to 'master' if not set
    accessToken: config.modules.contentful.accessToken,
    host: config.modules.contentful.host,
  })

  const changedData = await client.getEntries({
    content_type: 'snippetGroup',
    locale: config.i18n.locale,
    'sys.updatedAt[gte]': timestamp,
  })

  const allData = [...fromCache, ...changedData.items]
  await cache.set('cf-saved-snippets', allData)

  allData.map((node) => {
    const nodeMeta = {
      id: opt.createNodeId(`snippet-${node.sys.id}`),
      parent: null,
      children: [],
      internal: {
        type: `SnippetRaw`,
        mediaType: `application/json`,
        content: JSON.stringify(node),
        contentDigest: opt.createContentDigest(node),
      },
    }
    const newFields = {
      group: node.fields.id,
      snippets: (node.fields.snippets || []).map((s) => ({
        key: s.fields.fieldName,
        value: s.fields.value,
        contentfulID: node.sys.id,
      })),
    }
    createNode(Object.assign({}, newFields, nodeMeta))
  })
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      snippet: {
        type: 'JSON',
        args: {
          group: 'String!',
          name: 'String!',
        },
        async resolve(source, args, context, info) {
          const result = await context.nodeModel.runQuery({
            query: {
              filter: {
                group: { eq: args.group },
              },
            },
            type: 'SnippetRaw',
            firstOnly: true,
          })
          if (!result) throw new Error(`no snippet group "${args.group}"`)
          const snippet = result.snippets.find((row) => row.key === args.name)
          if (!snippet)
            throw new Error(
              `snippet group "${args.group}" has no snippet "${args.name}"`
            )
          return {
            value: snippet.value,
            group: args.group,
            name: args.name,
            cfId: snippet.contentfulID,
          }
        },
      },
    },
  }
  createResolvers(resolvers)
}
