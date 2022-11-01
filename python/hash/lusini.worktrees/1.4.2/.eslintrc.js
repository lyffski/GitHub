module.exports = {
  ignorePatterns: [
    '.eslintrc.js',
    'cypress/support/**/*',
    'gatsby-config.js',
    'gatsby-node.js',
    'cypress/plugins/**/*',
  ],
  globals: {
    __PATH_PREFIX__: true,
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', '@kaminrunde/firescout'],
  rules: {
    'no-console': 'error',
    '@kaminrunde/firescout/onclick-needs-handle': 'error',
    '@kaminrunde/firescout/jsx-expression-needs-state': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/prefer-as-const': 0,
    '@typescript-eslint/no-namespace': 0,
  },
}
