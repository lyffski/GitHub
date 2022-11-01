/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-var-requires */
var config = require('../../src/config')
var { getAllCategories } = require('../../src/utils/categories')

module.exports = async function getHrefLang(categoryId) {
  const subConfigs = config.hrefLang || []
  if (subConfigs.length === 0) return []

  const list = await Promise.all(
    subConfigs.map(async (configName) => {
      const dict = await fetchLocale(configName)
      return dict[categoryId]
    })
  )

  return list.filter(Boolean)
}

let promises = {}

async function fetchLocale(configName) {
  const [folder, locale] = configName.split('.')

  if (!promises[configName]) {
    promises[configName] = new Promise(async (resolve, reject) => {
      try {
        const subConfig = require(`../../src/config/${folder}/${locale}`)
        const slugify = require('../../src/utils/slugify').default
        let algoliaData = await getAllCategories()

        const result = {}
        for (const row of algoliaData)
          result[row.objectID] = {
            url:
              subConfig.baseUrl +
              '/' +
              subConfig.locale +
              '/category/' +
              slugify(row.path),
            locale: locale,
          }

        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }

  return promises[configName]
}
