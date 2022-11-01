var config = require('../../src/config')
var contentful = require('contentful')
var fetchServicePages = require('./fetchServicePages')
var fetchStaticBlocks = require('./fetchStaticBlocks')
var fetchLandingPages = require('./fetchLandingPages')
var fetchMagazineArticles = require('./fetchMagazineArticles')
var fetchFooter = require('./fetchFooter')

exports.sourceNodes = async (opt) => {
  const { cache, actions } = opt
  const { createNode } = actions

  const client = contentful.createClient({
    space: config.modules.contentful.space,
    environment: config.modules.contentful.environment, // defaults to 'master' if not set
    accessToken: config.modules.contentful.accessToken,
    host: config.modules.contentful.host,
  })

  const current = new Date().toISOString()
  const timestamp = await cache.get('cf-source-nodes')
  await cache.set('cf-source-nodes', current)

  /**
   * fetch
   * Footer
   */
  const footer = await fetchFooter(client, timestamp, opt)
  createNode(footer)

  /**
   * fetch
   * static blocks
   */
  const staticBlocks = await fetchStaticBlocks(client, timestamp, opt)
  staticBlocks.map((node) => createNode(node))

  /*
   * fetch
   * Service pages
   * Create a node for each service page from contentful - FLAT
   */
  const servicePageNodes = await fetchServicePages(client, timestamp, opt)
  servicePageNodes.map((node) => createNode(node))

  /*
   * fetch
   * Landing pages
   * Create a node for each landing page from contentful - FLAT
   */
  const landingPageNodes = await fetchLandingPages(client, timestamp, opt)
  landingPageNodes.map((node) => createNode(node))

  /*
   * fetch
   * Magazine Articles
   * Create a node for each magazine article from contentful - FLAT
   */
  const magazineArticles = await fetchMagazineArticles(client, timestamp, opt)
  magazineArticles.map((node) => createNode(node))
}
