/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/nl-nl/index')))

config.location = 'lusini_nl-nl'
config.locale = 'nl-nl'

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'http://checkout.lusini.local/nl-nl/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'http://checkout.lusini.local/nl-nl/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'http://checkout.lusini.local/nl-nl/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'http://checkout.lusini.local/nl-nl/checkout/cart'
config.modules.cart.shareCartUrl =
  'http://checkout.lusini.local/nl-nl/cart/share'
config.modules.cart.accountUrl = 'http://checkout.lusini.local/nl-nl/account'
config.modules.cart.cartRecreate =
  'http://checkout.lusini.local/nl-nl/cartrecall/items/'
config.modules.cart.newsletterUrl =
  'http://checkout.lusini.local/nl-nl/newsletter'
config.modules.cart.fetchUserStateUrl =
  'http://checkout.lusini.local/nl-nl/widgets/userstatus'
config.features.onetrust = false
config.features.devMode = true
config.features.seoNoFollow = true

config.index.products = 'dev_lusini_nl_NL_products'
config.index.categories = 'dev_lusini_nl_NL_categories'
config.index.series = 'dev_lusini_nl_NL_series'

config.baseUrl = 'http://www.lusini.local'
config.hrefLang = ['lusini_dev.nl-nl']
config.slugifyLocale = 'nl'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}

module.exports = config
