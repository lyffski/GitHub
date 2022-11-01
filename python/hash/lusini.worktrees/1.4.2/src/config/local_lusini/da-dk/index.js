/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/da-dk/index')))

config.baseUrl = 'http://www.lusini.local'
config.hrefLang = ['lusini_dev.da-dk']

config.modules.cart.domain = 'lusini.local'
config.modules.cart.fetchCartUrl =
  'http://checkout.lusini.local/da-dk/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'http://checkout.lusini.local/da-dk/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'http://checkout.lusini.local/da-dk/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'http://checkout.lusini.local/da-dk/checkout/cart'
config.modules.cart.shareCartUrl =
  'http://checkout.lusini.local/da-dk/cart/share'
config.modules.cart.accountUrl = 'http://checkout.lusini.local/da-dk/account'
config.modules.cart.cartRecreate =
  'http://checkout.lusini.local/da-dk/cartrecall/items/'
config.modules.cart.newsletterUrl =
  'http://checkout.lusini.local/da-dk/newsletter'
config.modules.cart.fetchUserStateUrl =
  'http://checkout.lusini.local/da-dk/widgets/userstatus'
config.features.onetrust = false

config.features.devMode = true

config.index.products = 'dev_lusini_da_DK_products'
config.index.categories = 'dev_lusini_da_DK_categories'
config.index.series = 'dev_lusini_da_DK_series'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}

module.exports = config
