/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/nb-no/index')))

config.location = 'lusini_nb-no'
config.locale = 'nb-no'

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'http://checkout.lusini.local/nb-no/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'http://checkout.lusini.local/nb-no/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'http://checkout.lusini.local/nb-no/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'http://checkout.lusini.local/nb-no/checkout/cart'
config.modules.cart.shareCartUrl =
  'http://checkout.lusini.local/nb-no/cart/share'
config.modules.cart.accountUrl = 'http://checkout.lusini.local/nb-no/account'
config.modules.cart.cartRecreate =
  'http://checkout.lusini.local/nb-no/cartrecall/items/'
config.modules.cart.newsletterUrl =
  'http://checkout.lusini.local/nb-no/newsletter'
config.modules.cart.fetchUserStateUrl =
  'http://checkout.lusini.local/nb-no/widgets/userstatus'
config.features.onetrust = false
config.features.devMode = true
config.features.seoNoFollow = true

config.index.products = 'dev_lusini_nb_NO_products'
config.index.categories = 'dev_lusini_nb_NO_categories'
config.index.series = 'dev_lusini_nb_NO_series'

config.baseUrl = 'http://www.lusini.local'
config.hrefLang = ['lusini_dev.nb-no']
config.slugifyLocale = 'nb'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}

module.exports = config
