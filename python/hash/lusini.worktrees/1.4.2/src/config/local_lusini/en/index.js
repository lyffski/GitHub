/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/en/index')))

config.location = 'lusini_en'
config.locale = 'en'

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'http://checkout.lusini.local/en/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'http://checkout.lusini.local/en/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'http://checkout.lusini.local/en/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'http://checkout.lusini.local/en/checkout/cart'
config.modules.cart.shareCartUrl = 'http://checkout.lusini.local/en/cart/share'
config.modules.cart.accountUrl = 'http://checkout.lusini.local/en/account'
config.modules.cart.cartRecreate =
  'http://checkout.lusini.local/en/cartrecall/items/'
config.modules.cart.newsletterUrl = 'http://checkout.lusini.local/en/newsletter'
config.modules.cart.fetchUserStateUrl =
  'http://checkout.lusini.local/en/widgets/userstatus'
config.features.onetrust = false
config.features.devMode = true
config.features.seoNoFollow = true

config.index.products = 'dev_lusini_en_products'
config.index.categories = 'dev_lusini_en_categories'
config.index.series = 'dev_lusini_en_series'

config.baseUrl = 'http://www.lusini.local'
config.hrefLang = ['lusini_dev.en']
config.slugifyLocale = 'en'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}

module.exports = config
