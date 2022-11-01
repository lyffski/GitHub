var config = require('../../src/config')
var contentful = require('contentful')
var slugify = require('../../src/utils/slugify').default
var getHrefLang = require('./getHrefLang')
var fetchAllCategories = require('../../src/utils/fetchAllCategories').default
var lightConfig = require('../../light-config.json')

/**
 * Fetch Category data from contentful
 */
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
  const createNode = actions.createNode
  let algoliaData = await fetchAllCategories()

  const contentfulData = await getContentfulEntries()
    .then((response) =>
      response.items
        .map((o) => ({
          ...o.fields,
          contentfulID: o.sys.id,
          updatedAt: o.sys.updatedAt,
        }))
        .map((o) => {
          if (o.categoryId === 'DEFAULT_CATEGORY') return o
          const categoryIdMatch = o.categoryId.match(/\((.*)\)/)
          const categoryId = categoryIdMatch && categoryIdMatch[1]
          if (!categoryId)
            throw new Error(`could not parse categoryId "${o.categoryId}"`)
          return { ...o, categoryId }
        })
    )
    .then((entries) =>
      entries.reduce((dict, entry) => {
        dict[entry.categoryId] = entry

        return dict
      }, {})
    )

  const finalData = algoliaData
    .map((row) => ({
      ...row,
      urlPath: '/category/' + slugify(row.path),
      categoryLevel: row.level,
      // fields
      teaserImg: '',
      brand: row.brand || '',
    }))
    .map((row) => {
      if (contentfulData[row.objectID]) {
        return {
          ...row,
          ...contentfulData[row.objectID],
          teaserImg: contentfulData[row.objectID].teaserImg
            ? contentfulData[row.objectID].teaserImg[0].url.replace(
                /^http:\/\//i,
                'https://'
              )
            : '',
        }
      } else {
        let defaultStory = contentfulData['DEFAULT_CATEGORY']

        defaultStory = JSON.stringify(defaultStory)

        defaultStory = defaultStory.replace('__ALGOLIA_ID__', row.objectID)
        defaultStory = defaultStory.replace('DEFAULT_CATEGORY', row.objectID)
        defaultStory = defaultStory.replace(/_ID_/g, row.label)
        const brand = row.brand.trim() || ''
        if (brand === '') {
          defaultStory = defaultStory.replace(/ _BRAND_/g, brand)
          defaultStory = defaultStory.replace(/_BRAND_ /g, brand)
        }
        defaultStory = defaultStory.replace(/_BRAND_/g, brand)
        defaultStory = JSON.parse(defaultStory)

        return {
          ...row,
          ...defaultStory,
          label: row.label,
        }
      }
    })
    .map((row, index) => {
      const seoText = index === 0 ? (row.seoText += ' ') : row.seoText
      const title = row.title || row.label
      const seoTitle = row.seoTitle || ''
      const defaultSeoDescription = row.seoDescription || ''

      return {
        ...row,
        title: title,
        seoTitle: seoTitle,
        seoDescription: defaultSeoDescription,
        seoText: seoText,
      }
    })

  const byPath = {}
  const byParent = {}

  for (let cat of finalData) {
    const parentPath = cat.path.split(' > ').slice(0, -1).join(' > ')
    byPath[cat.path] = cat
    if (!byParent[parentPath]) byParent[parentPath] = []
    byParent[parentPath].push(cat)
  }

  await Promise.all(
    finalData.map(async (cat) => {
      const parentPath = cat.path.split(' > ').slice(0, -1).join(' > ')
      const parentCat = parentPath !== cat.path ? byPath[parentPath] : null

      const hrefLang = await getHrefLang(cat.objectID)

      createNode({
        id: createNodeId(`category-${cat.objectID}`),
        parent: parentCat
          ? createNodeId(`category-${parentCat.objectID}`)
          : null,
        children: byParent[cat.path]
          ? byParent[cat.path].map((cat) =>
              createNodeId(`category-${cat.objectID}`)
            )
          : [],
        internal: {
          type: `Category`,
          mediaType: 'application/json',
          content: JSON.stringify(cat),
          contentDigest: createContentDigest(cat),
        },
        ...cat,
        canonicalUrl: cat.canonicalUrl || '',
        noIndex: config.features.seoNoFollow,
        filters: JSON.stringify(cat.filters),
        hrefLang: hrefLang,
      })
    })
  )
}

async function getContentfulEntries() {
  if (process.env.LIGHT_START)
    return Promise.all(
      lightConfig.categories.map((row) =>
        contentfulClient.getEntry(row.id, { locale: config.i18n.locale })
      )
    ).then((items) => ({ items }))

  const contentfulData1 = await contentfulClient.getEntries({
    content_type: 'category',
    locale: config.i18n.locale,
    limit: 300,
    'fields.active': true,
  })

  const contentfulData2 = await contentfulClient.getEntries({
    content_type: 'category',
    locale: config.i18n.locale,
    limit: 300,
    skip: 300,
    'fields.active': true,
  })

  return {
    ...contentfulData1,
    items: [...contentfulData1.items, ...(contentfulData2.items || [])],
  }
}
