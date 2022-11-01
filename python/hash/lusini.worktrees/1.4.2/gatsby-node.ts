/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path'
import config from './src/config'
import gatsbySchema from './gatsby-schema'

export const createPages = async ({ graphql, actions }) => {
  const gq = await graphql(`
    {
      allServicePage {
        nodes {
          contentfulID
          urlPath
        }
      }

      allCategory {
        nodes {
          objectID
          urlPath
        }
      }

      allLandingPage {
        nodes {
          contentfulID
          urlPath
        }
      }

      allMagazineArticle {
        nodes {
          contentfulID
          urlPath
        }
      }

      allTagCategory {
        nodes {
          contentfulID
          tag
          urlPath
        }
      }

      brandName: category(objectID: { eq: "Marken" }) {
        path
      }
    }
  `)

  if (process.env.NODE_ENV !== 'production') {
    actions.createPage({
      path: '/__cypress-test/',
      component: path.resolve(
        __dirname,
        './src/theme/templates/__cypress-test.tsx'
      ),
    })
  }

  actions.createPage({
    path: '/',
    component: path.resolve(__dirname, './src/theme/templates/Home/index.tsx'),
    context: {
      hrefLang: config.hrefLang.map((hrefLang) => {
        const [folder, locale] = hrefLang.split('.')
        const subConfig = require(`./src/config/${folder}/${locale}/index.js`)
        return {
          url: subConfig.baseUrl + '/' + subConfig.locale + '/',
          locale: subConfig.locale,
        }
      }),
    },
  })

  actions.createPage({
    path: '/search/',
    component: path.resolve(
      __dirname,
      './src/theme/templates/Search/Search.tsx'
    ),
    context: {
      rootCategoryId: config.rootCategoryId,
    },
  })

  actions.createPage({
    path: '/cart/',
    matchPath: '/cart/*',
    component: path.resolve(__dirname, './src/theme/templates/Cart/Cart.tsx'),
  })

  actions.createPage({
    path: '/cartrecall/items/',
    matchPath: '/cartrecall/items/*',
    component: path.resolve(
      __dirname,
      './src/theme/templates/CartRecreate/CartRecreate.tsx'
    ),
  })

  actions.createPage({
    path: '/account/',
    component: path.resolve(
      __dirname,
      './src/theme/templates/Account/Account.tsx'
    ),
  })

  actions.createPage({
    path: '/account/password/',
    matchPath: '/account/password/*',
    component: path.resolve(
      __dirname,
      './src/theme/templates/Password/Password.tsx'
    ),
  })

  actions.createPage({
    path: '/preview/',
    component: path.resolve(__dirname, './src/theme/templates/Preview.tsx'),
  })
  actions.createPage({
    path: '/pdp',
    matchPath: '/pdp/*',
    component: path.resolve(__dirname, './src/theme/templates/PDP/PDP.tsx'),
    context: {
      hrefLang: config.hrefLang.map((hrefLang) => {
        const [folder, locale] = hrefLang.split('.')
        const subConfig = require(`./src/config/${folder}/${locale}/index.js`)
        return {
          url: subConfig.baseUrl + '/' + subConfig.locale + '/pdp/',
          locale: subConfig.locale,
        }
      }),
      brandPath: gq.data.brandName.path,
    },
  })

  actions.createPage({
    path: '/series',
    matchPath: '/series/*',
    component: path.resolve(
      __dirname,
      './src/theme/templates/Series/Series.tsx'
    ),
    context: {
      hrefLang: config.hrefLang.map((hrefLang) => {
        const [folder, locale] = hrefLang.split('.')
        const subConfig = require(`./src/config/${folder}/${locale}/index.js`)
        return {
          url: subConfig.baseUrl + '/' + subConfig.locale + '/series/',
          locale,
        }
      }),
    },
  })

  actions.createPage({
    path: '/online-service/',
    component: path.resolve(__dirname, './src/theme/templates/SelfService.tsx'),
  })

  Array(Math.ceil(gq.data.allMagazineArticle?.nodes.length / 12 || 0))
    .fill(null)
    .map((_, i) => {
      actions.createPage({
        path: i > 0 ? `/m/page-${i + 1}/` : '/m/',
        component: path.resolve(
          __dirname,
          './src/theme/templates/Magazine/index.tsx'
        ),
        context: { limit: 12, skip: i * 12, hideStory: i !== 0 },
      })
    })

  actions.createPage({
    path: '/newsletter/',
    component: path.resolve(__dirname, './src/theme/templates/Newsletter.tsx'),
  })

  actions.createPage({
    path: '/one-to-one-bundle/',
    component: path.resolve(
      __dirname,
      './src/theme/templates/OneToOneBundle/OneToOneBundle.tsx'
    ),
  })

  gq.data.allServicePage.nodes.forEach((page) => {
    actions.createPage({
      path: page.urlPath,
      component: path.resolve(
        __dirname,
        './src/theme/templates/Service/index.tsx'
      ),
      context: { contentfulID: page.contentfulID },
    })
  })

  gq.data.allCategory.nodes.forEach((cat) => {
    return actions.createPage({
      path: cat.urlPath,
      component: path.resolve(
        __dirname,
        './src/theme/templates/Category/index.tsx'
      ),
      context: { objectID: cat.objectID },
    })
  })

  gq.data.allTagCategory.nodes.forEach((cat) => {
    return actions.createPage({
      path: cat.urlPath,
      component: path.resolve(
        __dirname,
        './src/theme/templates/TagCategory/index.tsx'
      ),
      context: { contentfulID: cat.contentfulID, tag: cat.tag },
    })
  })

  gq.data.allLandingPage.nodes.forEach((lp) => {
    return actions.createPage({
      path: lp.urlPath,
      component: path.resolve(
        __dirname,
        './src/theme/templates/LandingPage/index.tsx'
      ),
      context: { contentfulID: lp.contentfulID },
    })
  })

  gq.data.allMagazineArticle.nodes.forEach((article) => {
    return actions.createPage({
      path: article.urlPath,
      component: path.resolve(
        __dirname,
        './src/theme/templates/Magazine/MagazineArticle/index.tsx'
      ),
      context: { contentfulID: article.contentfulID },
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/app` page.
  if (page.path.match(/^\/pdp/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = '/pdp/*'
    // Update the page.
    createPage(page)
  }
}

exports.onCreateBabelConfig = ({ stage, actions }) => {
  if (process.env.NODE_ENV === 'production') {
    actions.setBabelPlugin({
      name: `@kaminrunde/babel-plugin-remove-firescout`,
      stage,
    })
  }
}
/*
 * Gatsby v3 threw some weird errors like:
 *** Generating JavaScript bundles failed
 *** Unexpected token (1:0)
 *** File: src/theme/partials/NewsletterSubscriptionPopup/README.md:1:0
 * So lets just ignore all README.md in prod for webpack
 */
exports.onCreateWebpackConfig = ({ actions, loaders, plugins }) => {
  // if (stage === 'build-javascript') {
  actions.setWebpackConfig({
    plugins: [plugins.provide({ Buffer: ['buffer/', 'Buffer'] })],
    module: {
      rules: [
        {
          test: /\.md/,
          use: loaders.null(),
        },
      ],
    },
  })
  // }
}

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(gatsbySchema)
}
