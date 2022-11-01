/* eslint-disable @typescript-eslint/no-var-requires */
var path = require('path')
var fs = require('fs')
const fsExtra = require('fs-extra')
var store = process.argv[2]
var location = process.argv[3]
var config = require(`./${store}/${location}`)

// create config
fs.writeFileSync(
  path.resolve(__dirname, './index.js'),
  '/** @fire' +
    'scoutMockVar Config.config */\nvar config = ' +
    JSON.stringify(config, null, 2) +
    '\nmodule.exports = config'
)

// copy global static files
if (fs.existsSync(path.resolve(__dirname, 'global_static'))) {
  fsExtra.copySync(
    path.resolve(__dirname, 'global_static'),
    path.resolve(__dirname, '../../static')
  )
}

// copy static files
if (fs.existsSync(path.resolve(__dirname, store, location, 'static'))) {
  fsExtra.copySync(
    path.resolve(__dirname, store, location, 'static'),
    path.resolve(__dirname, '../../static')
  )
}

// provide app config under /app-config.json
if (!fs.existsSync(path.resolve(__dirname, '../../static'))) {
  fs.mkdirSync(path.resolve(__dirname, '../../static'))
}
fs.writeFileSync(
  path.resolve(__dirname, '../../static/app-config.json'),
  JSON.stringify(config)
)

if (!fs.existsSync(path.resolve(__dirname, '../../.base64Cache'))) {
  fs.mkdirSync(path.resolve(__dirname, '../../.base64Cache'))
  console.log('create empty base64 cache folder ')
}
