/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createPages } = require('./gatsby-node')
var fetch = require('node-fetch')
var fs = require('fs')
var config = require('../../src/config')

jest.mock('node-fetch')
jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
    readFile: jest.fn(),
  },
}))
jest.mock('../../src/config')

const invoke = async (
  remoteCache,
  redirectsFile,
  graphqlResponse,
  expectedRedirectCache
) => {
  const graphql = () => Promise.resolve(graphqlResponse)

  // eslint-disable-next-line no-console
  console.forceLog = console.log
  // eslint-disable-next-line no-console
  console.log = jest.fn()
  config.locale = 'de-de'

  fs.promises.writeFile = jest.fn()
  fs.promises.readFile = jest.fn()
  fetch.mockImplementationOnce(() =>
    Promise.resolve({ json: () => Promise.resolve(remoteCache) })
  )
  fs.promises.readFile.mockResolvedValue(redirectsFile)

  await createPages({ graphql })

  const writeFileCalls = fs.promises.writeFile.mock.calls

  const newRedirectCache = JSON.parse(writeFileCalls[1][1])
  // const newRedirectsFile = writeFileCalls[0][1]

  expect(newRedirectCache).toEqual(expectedRedirectCache)
}

const createGqResponse = (paths) => ({
  data: {
    allCategory: {
      nodes: paths,
    },
    allTagCategory: {
      nodes: paths,
    },
    allServicePage: {
      nodes: [],
    },
    allLandingPage: {
      nodes: [],
    },
    allMagazineArticle: {
      nodes: [],
    },
  },
})

test('when a slug changes then a redirect should be created', () =>
  invoke(
    {
      allPaths: [
        { id: '1', path: '/de-de/path-1/' },
        { id: '2', path: '/de-de/path-2/' },
      ],
      redirects: [],
    },
    '/de-de/* /de-de/404 404',
    createGqResponse([
      { id: '1', path: '/path-1-new/' }, // changed
      { id: '2', path: '/path-2/' },
    ]),
    {
      allPaths: [
        { id: '1', path: '/de-de/path-1-new/' },
        { id: '2', path: '/de-de/path-2/' },
      ],
      redirects: [{ from: '/de-de/path-1/', to: '/de-de/path-1-new/' }],
    },
    ''
  ))

test('when a redirect was reverted we want to redirect the new url to the old one', () =>
  invoke(
    {
      allPaths: [
        { id: '1', path: '/de-de/path-1-new/' },
        { id: '2', path: '/de-de/path-2/' },
      ],
      redirects: [{ from: '/de-de/path-1/', to: '/de-de/path-1-new/' }],
    },
    '/de-de/* /de-de/404 404',
    createGqResponse([
      { id: '1', path: '/path-1/' }, // changed
      { id: '2', path: '/path-2/' },
    ]),
    {
      allPaths: [
        { id: '1', path: '/de-de/path-1/' },
        { id: '2', path: '/de-de/path-2/' },
      ],
      redirects: [{ from: '/de-de/path-1-new/', to: '/de-de/path-1/' }],
    },
    ''
  ))

test(
  'when a slug, that is the target of a redirect, gets redirected ' +
    'then all linked redirects should update its target',
  () =>
    invoke(
      {
        allPaths: [
          { id: '1', path: '/de-de/path-1-new/' },
          { id: '2', path: '/de-de/path-2/' },
        ],
        redirects: [{ from: '/de-de/path-1/', to: '/de-de/path-1-new/' }],
      },
      '/de-de/* /de-de/404 404',
      createGqResponse([
        { id: '1', path: '/path-1-next/' }, // changed
        { id: '2', path: '/path-2/' },
      ]),
      {
        allPaths: [
          { id: '1', path: '/de-de/path-1-next/' },
          { id: '2', path: '/de-de/path-2/' },
        ],
        redirects: [
          { from: '/de-de/path-1-new/', to: '/de-de/path-1-next/' },
          { from: '/de-de/path-1/', to: '/de-de/path-1-next/' },
        ],
      },
      ''
    )
)

test.skip(
  'when a slug changes to a path that is redirected in the static redirects file, ' +
    'then a redirect should be created with the target from the static redirects file',
  () =>
    invoke(
      {
        allPaths: [
          { id: '1', path: '/de-de/path-1/' },
          { id: '2', path: '/de-de/path-2/' },
        ],
        redirects: [],
      },
      `/de-de/path-1-new/ /de-de/path-1-next/ 301!
      /de-de/* /de-de/404 404`,
      createGqResponse([
        { id: '1', path: '/path-1-new/' }, // changed
        { id: '2', path: '/path-2/' },
      ]),
      {
        allPaths: [
          { id: '1', path: '/de-de/path-1-new/' },
          { id: '2', path: '/de-de/path-2/' },
        ],
        redirects: [{ from: '/de-de/path-1/', to: '/de-de/path-1-next/' }],
      },
      ''
    )
)

test('when a manual redirect gets deleted all affected redirects should be reverted', () =>
  invoke(
    {
      allPaths: [
        { id: '1', path: '/de-de/path-1-next/' },
        { id: '2', path: '/de-de/path-2/' },
      ],
      redirects: [{ from: '/de-de/path-1/', to: '/de-de/path-1-next/' }],
    },
    '/de-de/* /de-de/404 404', // delete '/de-de/path-1-new/ /de-de/path-1-next/ 301!'
    createGqResponse([
      { id: '1', path: '/path-1-new/' }, // changed
      { id: '2', path: '/path-2/' },
    ]),
    {
      allPaths: [
        { id: '1', path: '/de-de/path-1-new/' },
        { id: '2', path: '/de-de/path-2/' },
      ],
      redirects: [
        { from: '/de-de/path-1-next/', to: '/de-de/path-1-new/' },
        { from: '/de-de/path-1/', to: '/de-de/path-1-new/' },
      ],
    },
    ''
  ))

test(
  'when a static redirect is created the existing redirects that link to the static ' +
    'redirect should not be updated',
  () =>
    invoke(
      {
        allPaths: [
          { id: '1', path: '/de-de/path-1-new/' },
          { id: '2', path: '/de-de/path-2/' },
        ],
        redirects: [{ from: '/de-de/path-1/', to: '/de-de/path-1-new/' }],
      },
      `/de-de/page-1-new/ /de-de/page-1-next/ 301!
      /de-de/* /de-de/404 404`,
      createGqResponse([
        { id: '1', path: '/path-1-new/' },
        { id: '2', path: '/path-2/' },
      ]),
      {
        allPaths: [
          { id: '1', path: '/de-de/path-1-new/' },
          { id: '2', path: '/de-de/path-2/' },
        ],
        redirects: [{ from: '/de-de/path-1/', to: '/de-de/path-1-new/' }],
      },
      ''
    )
)
