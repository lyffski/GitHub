var fetch = require('node-fetch')
var fs = require('fs')
var path = require('path')
var config = require('../../src/config')

const REMOTE_CACHE_URL = 'https://www.lusini.com'
const STATIC_REDIRECTS_PATH = path.resolve(__dirname, '../../static/_redirects')
const REMOTE_CACHE_PATH = path.resolve(
  __dirname,
  '../../static/redirect-cache.json'
)

exports.createPages = async ({ graphql }) => {
  if (!config.features.devMode) {
    const [remoteCache, staticRedirects] = await Promise.all([
      fetch(REMOTE_CACHE_URL + '/' + config.locale + '/redirect-cache.json')
        .then((res) => res.json())
        /** uncomment next line if this is the very first deployment */
        .catch(() => ({ allPaths: [], redirects: [] })),
      // .catch(() => {
      //   throw new Error(
      //     'uncomment in "plugins/redirects/gatsby-node.js" the catch block if this is the very first deployment'
      //   )
      // }),
      fs.promises
        .readFile(STATIC_REDIRECTS_PATH)
        .then(parseStaticRedirects)
        .catch(() => []),
    ])

    const gq = await graphql(`
      {
        allCategory {
          nodes {
            path: urlPath
            id: objectID
          }
        }
        allTagCategory {
          nodes {
            path: urlPath
            id: contentfulID
          }
        }
        allServicePage {
          nodes {
            path: urlPath
            id: contentfulID
          }
        }
        allLandingPage {
          nodes {
            path: urlPath
            id: contentfulID
          }
        }
        allMagazineArticle {
          nodes {
            path: urlPath
            id: contentfulID
          }
        }
      }
    `)

    let allPaths = [
      ...gq.data.allCategory.nodes,
      ...gq.data.allTagCategory.nodes,
      ...gq.data.allServicePage.nodes,
      ...gq.data.allLandingPage.nodes,
      ...gq.data.allMagazineArticle.nodes,
    ]

    // add location
    allPaths = allPaths.map((row) => ({
      ...row,
      path: '/' + config.locale + row.path,
    }))

    const comparedPaths = comparePaths(remoteCache.allPaths, allPaths)

    const newRedirects = createRedirects(
      comparedPaths.changed,
      remoteCache.redirects,
      staticRedirects
    )

    let newPaths = [
      ...remoteCache.allPaths,
      ...comparedPaths.added,
      ...comparedPaths.changed,
    ]

    // remove duplicate ids in a way that only the newest nodes are added
    // --> since the old paths are added first, if we iterate over all newPaths
    // --> the newer ones will override the old ones
    let newPathsDict = {}
    newPaths.forEach((node) => (newPathsDict[node.id] = node))
    newPaths = Object.values(newPathsDict)

    // remove prevPath
    newPaths = newPaths.map((row) => ({
      id: row.id,
      path: row.path,
    }))

    const [redirectsFile, cachedDataFile] = await createFiles(
      newRedirects,
      newPaths
    )

    /**
     * log data
     */
    console.log('################## REDIRECTS LOG ########################')
    console.log('new paths: ', comparedPaths.added.length)
    console.log('changed paths: ', comparedPaths.changed.length)
    console.log('removed paths: ', comparedPaths.removed.length)
    console.log('total paths: ', allPaths.length)
    console.log('------------------ redirects ----------------------------')
    console.log(redirectsFile)
    console.log('----------------- new changed ---------------------------')
    comparedPaths.changed.forEach((path) => {
      console.log(path.prevPath.path + '   ---> ' + path.path)
    })
    console.log('-------------------- removed ----------------------------')
    comparedPaths.removed.forEach((path) => {
      console.log(path.path)
    })
    console.log('---------------------------------------------------------')

    /**
     * check if error happens
     */
    if (comparedPaths.changed.length > 250) {
      throw new Error('there are too many new redirects. Please check!')
    }

    /**
     * write files
     */
    await Promise.all([
      fs.promises.writeFile(STATIC_REDIRECTS_PATH, redirectsFile),
      fs.promises.writeFile(REMOTE_CACHE_PATH, cachedDataFile),
    ])
  }
}

/**
 * converts the `_redirects` file to a list of paths
 * @param {string} buffer
 */
function parseStaticRedirects(buffer) {
  buffer = buffer.toString()

  const parsePath = (path, line) => {
    const err = new Error(`path "${path}" is not valid. check line "${line}"`)
    if (!path) throw err
  }

  return buffer
    .split('\n')
    .filter(
      (s) =>
        // needs chars -> at least one slash needs to be present
        s.includes('/') &&
        // remove comments -> first char is not a #
        s[0] !== '#'
    )
    .map((s) => {
      const [from, to] = s.split(/ +/)
      parsePath(from)
      parsePath(to)
      return { from, to }
    })
}

/**
 * Compares to path lists and outputs `changed`, `added` and `removed` paths
 * @param {{id:string, path:string}[]} prevPaths
 * @param {{id:string, path:string}[]} nextPaths
 */
function comparePaths(prevPaths, nextPaths) {
  const prevNodePathDict = {}
  const prevNodeIdDict = {}
  for (let node of prevPaths) {
    prevNodePathDict[node.path] = node
    prevNodeIdDict[node.id] = node
  }
  const nextNodeIdDict = {}
  for (let node of nextPaths) {
    nextNodeIdDict[node.id] = node
  }

  const result = {
    added: [],
    changed: [],
    removed: [],
  }

  for (let path of nextPaths) {
    if (!prevNodeIdDict[path.id]) result.added.push(path)
    else if (!prevNodePathDict[path.path]) {
      path.prevPath = prevNodeIdDict[path.id] // is needed for redirecting
      result.changed.push(path)
    }
  }

  for (let path of prevPaths) {
    if (!nextNodeIdDict[path.id]) result.removed.push(path)
  }

  return result
}

/** fix
 * creates the new redirects for the cache. the `resolveUrl` helper decides
 * how the url should be resolved
 *
 * - if path was redirected and later the redirect was removed we return the identiy
 * - if there is a static entry in _redirects we return it
 * - if we find a existing redirect we update out existing one (to prevent cycles)
 *
 * @param {{id:string, path:string}[]} changedPaths
 * @param {{from:string, to:string}[]} prevRedirects redirects from cache
 * @param {{from:string, to:string}[]} staticRedirects redirects from static _redirects
 */
function createRedirects(changedPaths, prevRedirects, staticRedirects) {
  const prevRedirectsDict = {}
  for (let r of prevRedirects) prevRedirectsDict[r.from] = r.to
  const staticRedirectsDict = {}
  for (let r of staticRedirects) staticRedirectsDict[r.from] = r.to
  let newRedirectsDict = {}

  const resolveUrl = (from, to) => {
    if (from === to) return to
    if (staticRedirectsDict[to])
      return resolveUrl(from, staticRedirectsDict[to])
    if (prevRedirectsDict[to]) {
      if (prevRedirectsDict[to] === from) return to
      return resolveUrl(from, prevRedirectsDict[to])
    }
    if (newRedirectsDict[to]) return resolveUrl(from, newRedirectsDict[to])
    return to
  }

  for (let path of changedPaths) {
    newRedirectsDict[path.prevPath.path] = resolveUrl(
      path.prevPath.path,
      path.path
    )
  }
  for (let r of prevRedirects) {
    newRedirectsDict[r.from] = resolveUrl(r.from, r.to)
  }

  return Object.keys(newRedirectsDict)
    .filter((key) => newRedirectsDict[key] !== key)
    .map((key) => ({
      from: key,
      to: newRedirectsDict[key],
    }))
}

/**
 * Creates to file contents for the __redirect file and the remote cache
 * @param {{from:string, to:string}[]} redirects
 * @param {{id:string, path:string}[]} paths
 */
async function createFiles(redirects, paths) {
  /*
   * create redirects file
   */
  let redirectsFile = await fs.promises.readFile(STATIC_REDIRECTS_PATH)

  redirectsFile += '\n\n\n# Autogenerated redirects\n\n'

  for (let r of redirects) {
    redirectsFile += r.from + '     ' + r.to + '      301' + '\n'
  }

  /*
   * move 404 rule to the bottom to be sure that this rule applies last
   */
  let rule404 = ''
  let sortedFile = ''

  for (let line of redirectsFile.split('\n')) {
    if (line.endsWith('404')) {
      rule404 = line
    } else {
      sortedFile += line + '\n'
    }
  }

  if (!rule404) {
    throw new Error('cannot find 404 rule in static redirects file')
  }

  sortedFile += '\n# 404 should be at bottom \n' + rule404
  redirectsFile = sortedFile

  /*
   * create cached data file
   */
  const cachedData = JSON.stringify({ allPaths: paths, redirects }, null, 2)

  return [redirectsFile, cachedData]
}
