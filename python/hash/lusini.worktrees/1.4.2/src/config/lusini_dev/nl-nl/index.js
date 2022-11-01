/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/nl-nl/index')))

config.baseUrl = 'https://www.lusini.dev'
config.hrefLang = ['lusini_dev.nl-be', 'lusini_dev.nl-nl']

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'https://checkout.lusini.dev/nl-nl/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'https://checkout.lusini.dev/nl-nl/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'https://checkout.lusini.dev/nl-nl/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'https://checkout.lusini.dev/nl-nl/checkout/cart'
config.modules.cart.shareCartUrl =
  'https://checkout.lusini.dev/nl-nl/cart/share'
config.modules.cart.cartRecreate =
  'https://checkout.lusini.dev/nl-nl/cartrecall/items/'
config.modules.cart.accountUrl = 'https://checkout.lusini.dev/nl-nl/account'
config.modules.cart.newsletterUrl =
  'https://checkout.lusini.dev/nl-nl/newsletter'
config.modules.cart.fetchUserStateUrl =
  'https://checkout.lusini.dev/nl-nl/widgets/userstatus'

config.features.onetrust = false
config.features.devMode = true

config.index.products = 'dev_lusini_nl_NL_products'
config.index.productsPriceAsc = 'dev_lusini_nl_NL_products_priceAsc'
config.index.categories = 'dev_lusini_nl_NL_categories'
config.index.series = 'dev_lusini_nl_NL_series'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}

config.assetPrefix = ''

module.exports = config
