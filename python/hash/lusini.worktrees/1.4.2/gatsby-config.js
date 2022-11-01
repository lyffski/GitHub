require('source-map-support').install()
require('ts-node').register()
const config = require('./src/config')

module.exports = {
  pathPrefix: `/${config.locale}`,
  assetPrefix: config.assetPrefix,
  siteMetadata: {
    description: `Lusini lusini lusini `,
    title: `Lusini lusini`,
    author: `@EmmosWebDev`,
    siteUrl: `https://www.lusini.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-resolve-src`,
    `module-navigation`,
    !config.features.seoNoFollow
      ? require('./plugins/sitemap/index.ts').default
      : `module-navigation`,
    `module-b2cSwitch`,
    `module-onetrust`,
    `module-trustedshops`,
    `redirects`,
    `a-b-test`,
    `emg-source-snippets`,
    `emg-source-navigation`,
    `emg-source-contentful`,
    `emg-source-categories`,
    `emg-source-tag-categories`,
    {
      resolve: `@kaminrunde/gatsby-plugin-fireside`,
      options: {
        resolveController: (name) => {
          const path = './src/theme/organisms/controllerDict.ts'
          const controllerDict = require(`${path}`)
          return controllerDict[name] || null
        },
        nodes: [
          'LandingPage',
          'StaticBlock',
          'Category',
          'ServicePage',
          'MagazineArticle',
          'TagCategory',
        ],
      },
    },
    {
      resolve: `module-cart`,
      options: {
        pixelUrl: config.modules.cart.cartPixelUrl,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-WGDM5TC',
        includeInDevelopment: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lusini`,
        short_name: `lusini`,
        start_url: `/`,
        background_color: `#D6A444`,
        theme_color: `#D6A444`,
        display: `minimal-ui`,
        icon: `static/images/favicon.svg`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts-with-attributes`,
      options: {
        fonts: [
          `Roboto\:ital,wght@0,300;0,400;0,700;1,400`,
          `Roboto Condensed\:ital,wght@0,300;0,400;0,700;1,400`,
        ],
        display: 'swap',
        attributes: {
          rel: 'stylesheet preconnect',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets\/.*\.svg/,
        },
      },
    },
  ],
  flags: {
    FAST_DEV: true,
    PARALLEL_QUERY_RUNNING: false,
    PARALLEL_SOURCING: false,
  },
}
