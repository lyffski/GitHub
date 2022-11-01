/* eslint-disable @typescript-eslint/no-var-requires */
var getHrefLang = require('./getHrefLang')
var getBufferedEntries = require('./getBufferedEntries')

module.exports = async function fetchMagazineArticles(client, timestamp, opt) {
  const config = await require('../../src/config')
  const fromCache = (await opt.cache.get('cf-saved-magazine-articles')) || []

  const fetchConfig = {
    content_type: 'magazineArticle',
    locale: config.i18n.locale,
    'sys.updatedAt[gte]': timestamp,
    limit: process.env.LIGHT_START ? 1 : 1000,
    'fields.active': true,
    bufferSize: process.env.LIGHT_START ? 1 : 250,
  }

  const changedData = await getBufferedEntries(client, fetchConfig)

  const magazineArticles = [].concat(fromCache, changedData)
  await opt.cache.set('cf-saved-magazine-articles', magazineArticles)

  return Promise.all(
    magazineArticles.map(async (article) => {
      const hrefLang = await getHrefLang(
        'magazineArticle',
        article.contentfulID,
        client
      )

      if (article.hrefLang) {
        hrefLang.push({
          url: article.hrefLang,
          locale: config.i18n.locale,
        })
      }

      const nodeMeta = {
        id: opt.createNodeId(`magazine-article-${article.contentfulID}`),
        parent: null,
        children: [],

        internal: {
          type: `MagazineArticle`,
          mediaType: `application/json`,
          content: JSON.stringify(article),
          contentDigest: opt.createContentDigest(article),
        },
      }
      const updateFields = {
        contentfulID: article.contentfulID,
        urlPath: `/m/${article.slug}/`,
        title: article.title || '',
        seoTitle: article.seoTitle || article.title || '',
        seoDescription: article.seoDescription || article.teaser || '',
        teaserImageUrl:
          article.teaserImageUrl?.[0].url.replace('http://', 'https://') || '',
        hrefLang: hrefLang,
        noIndex: config.features.seoNoFollow,
        relatedArticles:
          article.relatedArticles?.length > 1 ? article.relatedArticles : [],
        shortenedTeaser:
          article.teaser?.substring(0, 160).split(' ').slice(0, -1).join(' ') ||
          '' + (article.teaser?.length > 160 ? '...' : '') ||
          '',
        canonicalUrl: article.canonicalUrl || '',
      }
      return Object.assign({}, article, updateFields, nodeMeta)
    })
  )
}
