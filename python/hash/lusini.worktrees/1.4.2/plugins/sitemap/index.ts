import config from '../../src/config'
import fetchPdpUrls from './fetchPdpUrls'

type Query = {
  categories: {
    nodes: { path: string }[]
  }
  pages: {
    nodes: { path: string; updatedAt: string }[]
  }
  service: {
    nodes: { path: string; updatedAt: string }[]
  }
  magazineArticles: {
    nodes: { path: string; updatedAt: string }[]
  }
  homepage: {
    updatedAt: string
  }
  magazine: {
    updatedAt: string
  }
}

type Result = {
  path: string
  url: string
  lastmod: string
}

const siteUrl = `https://www.lusini.com`

export default {
  resolve: 'gatsby-plugin-sitemap',
  options: {
    query: `{
      site {
        siteMetadata {
          siteUrl
        }
      }
      allSitePage {
        nodes {
          path
        }
      }
      categories:allCategory(filter:{noIndex:{eq:false}}) {
        nodes {
          path: urlPath
        }
      }
      pages:allLandingPage(filter:{noIndex:{eq:false}}) {
        nodes {
          path: urlPath
          updatedAt
        }
      }
      service:allServicePage(filter:{noIndex:{eq:false}}) {
        nodes {
          path:urlPath
          updatedAt
        }
      }
      magazineArticles:allMagazineArticle(filter:{noIndex:{eq:false}}) {
        nodes {
          path:urlPath
          updatedAt
        }
      }
      homepage:staticBlock(identifier: { eq: "homepage-block" }) {
        updatedAt
      }
      magazine:staticBlock(identifier: { eq: "magazine-overview" }) {
        updatedAt
      }
    }`,
    resolveSiteUrl: () => siteUrl,
    resolvePages: async (gq: Query) => {
      const result: Result[] = []
      const pdpUrls = await fetchPdpUrls()

      if (!config.features.seoNoFollow) {
        result.push({
          path: siteUrl + '/',
          url: '/',
          lastmod: gq.homepage.updatedAt.split('T')[0],
        })
        result.push({
          path: siteUrl + '/m/',
          url: '/m/',
          lastmod: gq.magazine.updatedAt.split('T')[0],
        })

        for (const url of pdpUrls)
          result.push({
            path: siteUrl + url.path,
            url: url.path,
            lastmod: url.updatedAt.split('T')[0],
          })
      }

      for (const row of gq.categories.nodes)
        result.push({
          path: siteUrl + row.path,
          url: row.path,
          lastmod: new Date().toISOString().split('T')[0],
        })

      for (const row of gq.service.nodes)
        result.push({
          path: siteUrl + row.path,
          url: row.path,
          lastmod: row.updatedAt.split('T')[0],
        })

      for (const row of gq.magazineArticles.nodes)
        result.push({
          path: siteUrl + row.path,
          url: row.path,
          lastmod: row.updatedAt.split('T')[0],
        })

      for (const row of gq.pages.nodes)
        result.push({
          path: siteUrl + row.path,
          url: row.path,
          lastmod: row.updatedAt.split('T')[0],
        })

      return result
    },
    serialize: (row: Result) => row,
  },
}
