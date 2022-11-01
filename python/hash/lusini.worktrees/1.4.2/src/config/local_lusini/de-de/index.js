/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('../../lusini/de-de/index')

config.modules.cart.domain = 'lusini.local'
config.modules.cart.fetchCartUrl =
  'http://checkout.lusini.local/de-de/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'http://checkout.lusini.local/de-de/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'http://checkout.lusini.local/de-de/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'http://checkout.lusini.local/de-de/checkout/cart'
config.modules.cart.shareCartUrl =
  'http://checkout.lusini.local/de-de/cart/share'
config.modules.cart.accountUrl = 'http://checkout.lusini.local/de-de/account'
config.modules.cart.cartRecreate =
  'http://checkout.lusini.local/de-de/cartrecall/items/'
config.modules.cart.newsletterUrl =
  'http://checkout.lusini.local/de-de/newsletter'
config.modules.cart.fetchUserStateUrl =
  'http://checkout.lusini.local/de-de/widgets/userstatus'
config.features.onetrust = false

config.index.products = 'dev_lusini_de_DE_products'
config.index.categories = 'dev_lusini_de_DE_categories'
config.index.series = 'dev_lusini_de_DE_series'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}

module.exports = config
