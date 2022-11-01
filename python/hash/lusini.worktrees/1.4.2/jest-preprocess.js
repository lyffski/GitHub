/* eslint-disable @typescript-eslint/no-var-requires */
const babelOptions = {
  plugins: ['@kaminrunde/babel-plugin-firescout-mock'],
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    [
      'babel-preset-gatsby',
      {
        targets: {
          browsers: ['>0.25%', 'not dead'],
        },
      },
    ],
  ],
}
module.exports = require('babel-jest').default.createTransformer(babelOptions)
