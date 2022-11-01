/* eslint-disable @typescript-eslint/no-var-requires */
var getHrefLang = require('./getHrefLang')
var getBufferedEntries = require('./getBufferedEntries')

module.exports = async function fetchLandingPages(client, timestamp, opt) {
  const config = await require('../../src/config')
  const fromCache = (await opt.cache.get('cf-saved-landingpages')) || []

  const fetchConfig = {
    content_type: 'page',
    locale: config.i18n.locale,
    limit: process.env.LIGHT_START ? 1 : 1000,
    'sys.updatedAt[gte]': timestamp,
    'fields.active': true,
    bufferSize: process.env.LIGHT_START ? 1 : 250,
  }

  const changedData = await getBufferedEntries(client, fetchConfig)
  const landingPages = [].concat(fromCache, changedData)
  await opt.cache.set('cf-saved-landingpages', landingPages)

  return Promise.all(
    landingPages.map(async (landingPage) => {
      const hrefLang = await getHrefLang(
        'page',
        landingPage.contentfulID,
        client
      )

      if (landingPage.hrefLang) {
        hrefLang.push({
          url: landingPage.hrefLang,
          locale: config.i18n.locale,
        })
      }

      const nodeMeta = {
        id: opt.createNodeId(`landingPage-${landingPage.contentfulID}`),
        parent: null,
        children: [],
        internal: {
          type: `LandingPage`,
          mediaType: `application/json`,
          content: JSON.stringify(landingPage),
          contentDigest: opt.createContentDigest(landingPage),
        },
      }
      const newFields = {
        urlPath: '/p/' + landingPage.slug + '/',
        contentfulID: landingPage.contentfulID,
        seoTitle: landingPage.seoTitle || landingPage.title,
        seoDescription: landingPage.seoDescription || '',
        noIndex: config.features.seoNoFollow,
        hrefLang: hrefLang,
        canonicalUrl: landingPage.canonicalUrl || '',
      }
      return Object.assign({}, landingPage, nodeMeta, newFields)
    })
  )
}
