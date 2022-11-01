/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('../../lusini/de-at/index')

config.modules.cart.domain = 'lusini.local'
config.modules.cart.fetchCartUrl =
  'http://checkout.lusini.local/de-at/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'http://checkout.lusini.local/de-at/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'http://checkout.lusini.local/de-at/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'http://checkout.lusini.local/de-at/checkout/cart'
config.modules.cart.shareCartUrl =
  'http://checkout.lusini.local/de-at/cart/share'
config.modules.cart.accountUrl = 'http://checkout.lusini.local/de-at/account'
config.modules.cart.cartRecreate =
  'http://checkout.lusini.local/de-at/cartrecall/items/'
config.modules.cart.newsletterUrl =
  'http://checkout.lusini.local/de-at/newsletter'
config.modules.cart.fetchUserStateUrl =
  'http://checkout.lusini.local/de-at/widgets/userstatus'
config.features.onetrust = false

config.index.products = 'prod_lusini_de_AT_products'
config.index.productsPriceAsc = 'prod_lusini_de_AT_products_priceAsc'
config.index.categories = 'prod_lusini_de_AT_categories'
config.index.series = 'prod_lusini_de_AT_series'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}

module.exports = config
