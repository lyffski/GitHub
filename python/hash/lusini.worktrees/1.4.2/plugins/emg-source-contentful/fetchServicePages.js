/* eslint-disable @typescript-eslint/no-var-requires */
var getBufferedEntries = require('./getBufferedEntries')

module.exports = async function fetchServicePages(client, timestamp, opt) {
  const config = await require('../../src/config')
  const fromCache = (await opt.cache.get('cf-saved-service-pages')) || []

  const fetchConfig = {
    content_type: 'helpAndService',
    locale: config.i18n.locale,
    'sys.updatedAt[gte]': timestamp,
    'fields.active': true,
    limit: process.env.LIGHT_START ? 1 : 250,
    bufferSize: process.env.LIGHT_START ? 1 : 250,
  }

  const changedData = await getBufferedEntries(client, fetchConfig)
  const servicePages = [].concat(fromCache, changedData)

  const byId = {}
  const childrenDict = {}
  const parentDict = {}

  for (const page of servicePages) {
    byId[page.contentfulID] = page
    if (page.childPages) {
      const childIds = page.childPages.map((p) => p.sys.id)
      childrenDict[page.contentfulID] = childIds
      for (const id of childIds) {
        parentDict[id] = page.contentfulID
      }
    }
  }

  // delete circular references set by contentful
  for (const page of servicePages) {
    delete page.parentpage
    delete page.childPages
  }

  await opt.cache.set('cf-saved-service-pages', servicePages)

  const resolveUrl = (servicePage) => {
    const parent = parentDict[servicePage.contentfulID]
    if (!parent) return '/' + servicePage.slug
    return resolveUrl(byId[parent]) + '/' + servicePage.slug
  }

  return servicePages
    .filter(
      (servicePage) =>
        parentDict[servicePage.contentfulID] ||
        servicePage.contentfulID === '2XRFU4Bx7IvqgghvLCdhHQ'
    )
    .map((servicePage) => {
      const nodeMeta = {
        id: opt.createNodeId(`servicePage-${servicePage.contentfulID}`),
        parent: null,
        children: [],

        // linked ServicePage
        parentPage: parentDict[servicePage.contentfulID] || null,

        // linked ServicePage
        childPages: childrenDict[servicePage.contentfulID]
          ? childrenDict[servicePage.contentfulID]
          : [],

        internal: {
          type: `ServicePage`,
          mediaType: `application/json`,
          content: JSON.stringify({ ...servicePage }),
          contentDigest: opt.createContentDigest({
            ...servicePage,
          }),
        },
      }
      const newFields = {
        headline: servicePage.headline || servicePage.title,
        title: servicePage.title || '',
        urlPath: resolveUrl(servicePage) + '/',
        contentfulID: servicePage.contentfulID,
        seoTitle: servicePage.seoTitle || servicePage.title || '',
        seoDescription: servicePage.seoDescription || '',
        noIndex: config.features.seoNoFollow,
      }
      return Object.assign({}, servicePage, newFields, nodeMeta)
    })
}
