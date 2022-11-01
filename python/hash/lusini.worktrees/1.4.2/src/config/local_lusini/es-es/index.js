/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/es-es/index')))

config.location = 'lusini_es-es'
config.locale = 'es-es'

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'http://checkout.lusini.local/es-es/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'http://checkout.lusini.local/es-es/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'http://checkout.lusini.local/es-es/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'http://checkout.lusini.local/es-es/checkout/cart'
config.modules.cart.shareCartUrl =
  'http://checkout.lusini.local/es-es/cart/share'
config.modules.cart.accountUrl = 'http://checkout.lusini.local/es-es/account'
config.modules.cart.cartRecreate =
  'http://checkout.lusini.local/es-es/cartrecall/items/'
config.modules.cart.newsletterUrl =
  'http://checkout.lusini.local/es-es/newsletter'
config.modules.cart.fetchUserStateUrl =
  'http://checkout.lusini.local/es-es/widgets/userstatus'
config.features.onetrust = false
config.features.devMode = true
config.features.seoNoFollow = true

config.index.products = 'dev_lusini_es_ES_products'
config.index.categories = 'dev_lusini_es_ES_categories'
config.index.series = 'dev_lusini_es_ES_series'

config.baseUrl = 'http://www.lusini.local'
config.hrefLang = ['lusini_dev.es-es']
config.slugifyLocale = 'es'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}

module.exports = config
