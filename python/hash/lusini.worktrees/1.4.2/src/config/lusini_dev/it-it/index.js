/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/it-it/index')))

config.baseUrl = 'https://www.lusini.dev'
config.hrefLang = ['lusini_dev.it-it']

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'https://checkout.lusini.dev/it-it/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'https://checkout.lusini.dev/it-it/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'https://checkout.lusini.dev/it-it/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'https://checkout.lusini.dev/it-it/checkout/cart'
config.modules.cart.shareCartUrl =
  'https://checkout.lusini.dev/it-it/cart/share'
config.modules.cart.cartRecreate =
  'https://checkout.lusini.dev/it-it/cartrecall/items/'
config.modules.cart.accountUrl = 'https://checkout.lusini.dev/it-it/account'
config.modules.cart.newsletterUrl =
  'https://checkout.lusini.dev/it-it/newsletter'
config.modules.cart.fetchUserStateUrl =
  'https://checkout.lusini.dev/it-it/widgets/userstatus'

config.features.onetrust = false
config.features.devMode = true

config.index.products = 'dev_lusini_it_IT_products'
config.index.productsPriceAsc = 'dev_lusini_it_IT_products_priceAsc'
config.index.categories = 'dev_lusini_it_IT_categories'
config.index.series = 'dev_lusini_it_IT_series'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}
config.assetPrefix = ''

module.exports = config
