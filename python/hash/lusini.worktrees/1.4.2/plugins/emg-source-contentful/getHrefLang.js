/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-async-promise-executor */
var config = require('../../src/config')
var getBufferedEntries = require('./getBufferedEntries')

module.exports = async function getHrefLang(contentType, id, client) {
  const subConfigs = config.hrefLang || []
  if (subConfigs.length === 0) return []

  const list = await Promise.all(
    subConfigs.map(async (configName) => {
      const dict = await fetchLocale(contentType, configName, client)
      return dict[id]
    })
  )

  return list.filter(Boolean)
}

let promises = {}

async function fetchLocale(contentType, configName, client) {
  const [folder, locale] = configName.split('.')
  const key = contentType + locale + folder

  if (!promises[key]) {
    promises[key] = new Promise(async (resolve, reject) => {
      try {
        const subConfig = require(`../../src/config/${folder}/${locale}`)

        const fetchConfig = {
          content_type: contentType,
          locale: subConfig.i18n.locale,
          limit: process.env.LIGHT_START ? 1 : 1000,
          'fields.active': true,
          bufferSize: process.env.LIGHT_START ? 1 : 250,
        }
        const data = await getBufferedEntries(client, fetchConfig)

        const pagePrefix = contentType === 'page' ? 'p' : 'm'

        const dict = {}
        for (const row of data) {
          dict[row.contentfulID] = {
            url:
              subConfig.baseUrl +
              '/' +
              subConfig.locale +
              `/${pagePrefix}/${row.slug}/`,
            locale: locale,
          }
        }
        resolve(dict)
      } catch (e) {
        reject(e)
      }
    })
  }

  return promises[key]
}
