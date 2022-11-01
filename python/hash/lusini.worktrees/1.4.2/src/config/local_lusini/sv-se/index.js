/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/sv-se/index')))

config.location = 'lusini_sv-se'
config.locale = 'sv-se'

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'http://checkout.lusini.local/sv-se/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'http://checkout.lusini.local/sv-se/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'http://checkout.lusini.local/sv-se/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'http://checkout.lusini.local/sv-se/checkout/cart'
config.modules.cart.shareCartUrl =
  'http://checkout.lusini.local/sv-se/cart/share'
config.modules.cart.accountUrl = 'http://checkout.lusini.local/sv-se/account'
config.modules.cart.cartRecreate =
  'http://checkout.lusini.local/sv-se/cartrecall/items/'
config.modules.cart.newsletterUrl =
  'http://checkout.lusini.local/sv-se/newsletter'
config.modules.cart.fetchUserStateUrl =
  'http://checkout.lusini.local/sv-se/widgets/userstatus'
config.features.onetrust = false
config.features.devMode = true
config.features.seoNoFollow = true

config.index.products = 'dev_lusini_sv_SE_products'
config.index.categories = 'dev_lusini_sv_SE_categories'
config.index.series = 'dev_lusini_sv_SE_series'

config.baseUrl = 'http://www.lusini.local'
config.hrefLang = ['lusini_dev.sv-se']
config.slugifyLocale = 'sv'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}

module.exports = config
