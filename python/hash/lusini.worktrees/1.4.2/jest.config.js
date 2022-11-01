module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/*.spec.tsx', '**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': `<rootDir>/jest-preprocess.js`,
    '^.+\\.svg$': `<rootDir>/svg-transformer.js`,
  },
  moduleNameMapper: {
    '^gatsby-page-utils/(.*)$': `gatsby-page-utils/dist/$1`, // Workaround for https://github.com/facebook/jest/issues/9771
    '^gatsby-core-utils/(.*)$': `gatsby-core-utils/dist/$1`, // Workaround for https://github.com/facebook/jest/issues/9771
    '^gatsby-plugin-utils/(.*)$': [
      `gatsby-plugin-utils/dist/$1`,
      `gatsby-plugin-utils/$1`,
    ], // Workaround for https://github.com/facebook/jest/issues/9771
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`],
  modulePaths: [`<rootDir>/src`],
}
