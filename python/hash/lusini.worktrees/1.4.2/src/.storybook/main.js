require('source-map-support').install()
require('ts-node').register()

module.exports = {
  stories: ['../theme/organisms/**/*.story.ts'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        controls: false,
        actions: false,
        backgrounds: false,
      },
    },
    '@kaminrunde/storybook-addon-fireside/lib/register',
  ],
  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve('babel-loader')
    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      [require.resolve('@babel/preset-env'), { loose: true }],
    ]
    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true },
      ],
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve('babel-plugin-remove-graphql-queries'),
    ]
    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ['browser', 'module', 'main']

    // storybook does not support "exports" syntax in package.json. we have to map these manually
    config.resolve.alias = {
      ...config.resolve.alias,
      'gatsby-page-utils/apply-trailing-slash-option':
        'gatsby-page-utils/dist/apply-trailing-slash-option.js',
    }

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
        plugins: [
          [
            require.resolve('@babel/plugin-proposal-class-properties'),
            { loose: true },
          ],
          // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
          require.resolve('babel-plugin-remove-graphql-queries'),
        ],
      },
    })
    config.resolve.extensions.push('.ts', '.tsx')

    // modify storybook's file-loader rule to avoid conflicts with your inline svg
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test.test('.svg')
    )
    fileLoaderRule.exclude = /\.svg$/

    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-react-loader',
    })

    return config
  },
}

// // Gatsby's Link overrides:
// // Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
// global.___loader = {
//   enqueue: () => {},
//   hovering: () => {},
// }
// // Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
// global.__PATH_PREFIX__ = ""
// // This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
// window.___navigate = pathname => {
//   // action("NavigateTo:")(pathname)
// }
