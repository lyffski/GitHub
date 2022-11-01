var config = require('../../src/config')
var contentful = require('contentful')

const client = contentful.createClient({
  space: config.modules.contentful.space,
  environment: config.modules.contentful.environment, // defaults to 'master' if not set
  accessToken: config.modules.contentful.accessToken,
  host: config.modules.contentful.host,
})

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const navigationList = await client
    .getEntries({
      content_type: 'navigation',
      locale: config.i18n.locale,
    })
    .then((response) => {
      return response.items.map((o) => ({
        ...o.fields,
        contentfulID: o.sys.id,
      }))
    })

  const navigation = navigationList[0]

  const fields = {
    sidebar:
      (navigation.drawerBottomLinks?.length &&
        navigation.drawerBottomLinks
          .filter((node) => node.fields)
          .map((node) => ({
            label: node.fields.label,
            link: node.fields.linkTarget,
          }))) ||
      [],
  }

  const nodeMeta = {
    id: createNodeId('navigation-customizeable'),
    parent: null,
    children: [],
    internal: {
      type: `Navigation`,
      mediaType: `application/json`,
      content: JSON.stringify(fields),
      contentDigest: createContentDigest(fields),
    },
  }
  createNode(Object.assign({}, fields, nodeMeta))
}
