var config = require('../../src/config')
var contentful = require('contentful')
var fetchAllCategories = require('../../src/utils/fetchAllCategories').default
var slugify = require('../../src/utils/slugify').default
var getHrefLang = require('./getHrefLang')
var lightConfig = require('../../light-config.json')

const contentfulClient = contentful.createClient({
  space: config.modules.contentful.space,
  environment: config.modules.contentful.environment,
  accessToken: config.modules.contentful.accessToken,
  host: config.modules.contentful.host,
})

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  let algoliaData = await fetchAllCategories().then((entries) =>
    entries.reduce((dict, entry) => {
      dict[entry.objectID] = entry

      return dict
    }, {})
  )
  const contentfulData = await (process.env.LIGHT_START
    ? Promise.all(
        lightConfig.tagCategories.map((row) =>
          contentfulClient.getEntry(row.id, { locale: config.i18n.locale })
        )
      ).then((items) => ({ items }))
    : contentfulClient.getEntries({
        content_type: 'tagCategory',
        locale: config.i18n.locale,
        limit: 1000,
        'fields.active': true,
      })
  )
    .then((response) =>
      response.items
        .map((o) => ({
          ...o.fields,
          contentfulID: o.sys.id,
          updatedAt: o.sys.updatedAt,
        }))
        .map((o) => {
          const categoryIdMatch = o.categoryId.match(/\((.*)\)/)
          const categoryId = categoryIdMatch && categoryIdMatch[1]
          if (!categoryId)
            throw new Error(`could not parse categoryId "${o.categoryId}"`)
          return { ...o, categoryId }
        })
    )
    .then((entries) =>
      entries.reduce((dict, entry) => {
        dict[entry.categoryId + entry.tag] = entry

        return dict
      }, {})
    )

  await Promise.all(
    Object.keys(contentfulData).map(async (key) => {
      const cat = contentfulData[key]
      const algoliaCat = algoliaData[cat.categoryId]
      const hrefLang = await getHrefLang(cat.categoryId)

      if (!algoliaCat) {
        return
        // throw new Error('no algoliaCat found for key "' + key + '"')
      }

      const slug = slugify(algoliaCat.path)

      actions.createNode({
        id: createNodeId(`tag-category-${cat.tag}-${cat.categoryId}`),
        parent: null,
        children: [],
        // parent: parentCat
        //   ? createNodeId(`tag-category-${parentCat.objectID}`)
        //   : null,
        // children: byParent[cat.path]
        //   ? byParent[cat.path].map((cat) =>
        //       createNodeId(`tag-category-${cat.objectID}`)
        //     )
        //   : [],
        internal: {
          type: `TagCategory`,
          mediaType: 'application/json',
          content: JSON.stringify(cat),
          contentDigest: createContentDigest(cat),
        },
        ...cat,
        seoDescription: cat.seoDescription || '',
        seoTitle: cat.seoTitle || cat.title || '',
        title: cat.title || '',
        canonicalUrl: cat.canonicalUrl || '',
        categoryPath: algoliaCat.path,
        urlPath: `/t/${cat.tag}/` + (slug === '/' ? '' : slug),
        noIndex: config.features.seoNoFollow,
        hrefLang: hrefLang,
      })
    })
  )
}
