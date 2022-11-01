/* eslint-disable @typescript-eslint/no-var-requires */
var getBufferedEntries = require('./getBufferedEntries')

module.exports = async function fetchFooter(client, timestamp, opt) {
  const config = await require('../../src/config')

  const fetchConfig = {
    content_type: 'footer',
    locale: config.i18n.locale,
    limit: process.env.LIGHT_START ? 1 : 1000,
    bufferSize: process.env.LIGHT_START ? 1 : 250,
  }

  const footerList = await getBufferedEntries(client, fetchConfig)
  const footer = footerList[0]

  const fields = {
    serviceLinks: footer.serviceLinks?.length
      ? footer.serviceLinks.map((node) =>
          opt.createNodeId(`servicePage-${node.sys.id}`)
        )
      : [],
    aboutLinks: footer.aboutLinks?.length
      ? footer.aboutLinks.map((node) =>
          opt.createNodeId(`servicePage-${node.sys.id}`)
        )
      : [],
    legal: footer.legal?.length
      ? footer.legal.map((node) =>
          opt.createNodeId(`servicePage-${node.sys.id}`)
        )
      : [],
    advantages: footer.advantages || [],
    facebook: footer.facebook || '',
    youtube: footer.youtube || '',
    instagram: footer.instagram || '',
    whatsapp: footer.whatsapp || '',
    pinterest: footer.pinterest || '',
    linkedin: footer.linkedin || '',
    xing: footer.xing || '',
    catalogImage:
      footer.catalogImage?.[0]?.url.replace('http://', 'https://') || '',
    catalogLink: footer.catalogLink || '',
    availablePayments: footer.availablePayments || [],
    newsletter: footer.newsletter || {
      title: '',
      disclaimer: '',
      labels: [],
      iconSource: '',
    },
  }

  const nodeMeta = {
    id: opt.createNodeId('footer'),
    parent: null,
    children: [],
    internal: {
      type: `Footer`,
      mediaType: `application/json`,
      content: JSON.stringify(fields),
      contentDigest: opt.createContentDigest(fields),
    },
  }
  return Object.assign({}, fields, nodeMeta)
}
