/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/de-de/index')))

config.baseUrl = 'https://www.lusini.dev'
config.hrefLang = ['lusini_dev.de-de', 'lusini_dev.de-at', 'lusini_dev.de-ch']

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'https://checkout.lusini.dev/de-de/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'https://checkout.lusini.dev/de-de/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'https://checkout.lusini.dev/de-de/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'https://checkout.lusini.dev/de-de/checkout/cart'
config.modules.cart.shareCartUrl =
  'https://checkout.lusini.dev/de-de/cart/share'
config.modules.cart.cartRecreate =
  'https://checkout.lusini.dev/de-de/cartrecall/items/'
config.modules.cart.accountUrl = 'https://checkout.lusini.dev/de-de/account'
config.modules.cart.newsletterUrl =
  'https://checkout.lusini.dev/de-de/newsletter'
config.modules.cart.fetchUserStateUrl =
  'https://checkout.lusini.dev/de-de/widgets/userstatus'
config.features.onetrust = false
config.features.devMode = true
config.features.seoNoFollow = true

config.index.products = 'dev_lusini_de_DE_products'
config.index.categories = 'dev_lusini_de_DE_categories'
config.index.series = 'dev_lusini_de_DE_series'
config.index.productsPriceAsc = 'dev_lusini_de_DE_products_priceAsc'

config.abTests.backToTopButton = false
config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}
config.assetPrefix = ''

module.exports = config
