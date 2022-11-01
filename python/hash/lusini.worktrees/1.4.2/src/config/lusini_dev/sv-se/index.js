/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/sv-se/index')))

config.baseUrl = 'https://www.lusini.dev'
config.hrefLang = ['lusini_dev.sv-se']

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'https://checkout.lusini.dev/sv-se/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'https://checkout.lusini.dev/sv-se/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'https://checkout.lusini.dev/sv-se/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'https://checkout.lusini.dev/sv-se/checkout/cart'
config.modules.cart.shareCartUrl =
  'https://checkout.lusini.dev/sv-se/cart/share'
config.modules.cart.cartRecreate =
  'https://checkout.lusini.dev/sv-se/cartrecall/items/'
config.modules.cart.accountUrl = 'https://checkout.lusini.dev/sv-se/account'
config.modules.cart.newsletterUrl =
  'https://checkout.lusini.dev/sv-se/newsletter'
config.modules.cart.fetchUserStateUrl =
  'https://checkout.lusini.dev/sv-se/widgets/userstatus'

config.features.onetrust = false
config.features.devMode = true

config.index.products = 'dev_lusini_sv_SE_products'
config.index.productsPriceAsc = 'dev_lusini_sv_SE_products_priceAsc'
config.index.categories = 'dev_lusini_sv_SE_categories'
config.index.series = 'dev_lusini_sv_SE_series'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}
config.assetPrefix = ''

module.exports = config
