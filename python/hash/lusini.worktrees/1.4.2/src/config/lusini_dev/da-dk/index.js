/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/da-dk/index')))

config.baseUrl = 'https://www.lusini.dev'
config.hrefLang = ['lusini_dev.da-dk']

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'https://checkout.lusini.dev/da-dk/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'https://checkout.lusini.dev/da-dk/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'https://checkout.lusini.dev/da-dk/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'https://checkout.lusini.dev/da-dk/checkout/cart'
config.modules.cart.shareCartUrl =
  'https://checkout.lusini.dev/da-dk/cart/share'
config.modules.cart.cartRecreate =
  'https://checkout.lusini.dev/da-dk/cartrecall/items/'
config.modules.cart.accountUrl = 'https://checkout.lusini.dev/da-dk/account'
config.modules.cart.newsletterUrl =
  'https://checkout.lusini.dev/da-dk/newsletter'
config.modules.cart.fetchUserStateUrl =
  'https://checkout.lusini.dev/da-dk/widgets/userstatus'
config.features.onetrust = false

config.features.devMode = true

config.index.products = 'dev_lusini_da_DK_products'
config.index.categories = 'dev_lusini_da_DK_categories'
config.index.series = 'dev_lusini_da_DK_series'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}
config.assetPrefix = ''

module.exports = config
