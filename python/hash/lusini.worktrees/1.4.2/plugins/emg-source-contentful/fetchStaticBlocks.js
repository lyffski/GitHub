/* eslint-disable @typescript-eslint/no-var-requires */
var getBufferedEntries = require('./getBufferedEntries')

module.exports = async function fetchStaticBlocks(client, timestamp, opt) {
  const config = await require('../../src/config')
  const fromCache = (await opt.cache.get('cf-saved-staticblocks')) || []

  const fetchConfig = {
    content_type: 'staticBlock',
    locale: config.i18n.locale,
    'sys.updatedAt[gte]': timestamp,
    limit: process.env.LIGHT_START ? 1 : 250,
    bufferSize: process.env.LIGHT_START ? 1 : 250,
  }

  const changedData = await getBufferedEntries(client, fetchConfig)
  const staticBlocks = [].concat(fromCache, changedData)
  await opt.cache.set('cf-saved-staticblocks', staticBlocks)

  return staticBlocks.map((staticBlock) => {
    const nodeMeta = {
      id: opt.createNodeId(`staticBlock-${staticBlock.identifier}`),
      parent: null,
      children: [],
      internal: {
        type: `StaticBlock`,
        mediaType: `application/json`,
        content: JSON.stringify(staticBlock),
        contentDigest: opt.createContentDigest(staticBlock),
      },
    }
    return Object.assign({}, staticBlock, nodeMeta)
  })
}
