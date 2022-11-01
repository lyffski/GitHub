/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/fr-ch/index')))

config.location = 'lusini_fr-ch'
config.locale = 'fr-ch'

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'http://checkout.lusini.local/fr-ch/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'http://checkout.lusini.local/fr-ch/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'http://checkout.lusini.local/fr-ch/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'http://checkout.lusini.local/fr-ch/checkout/cart'
config.modules.cart.shareCartUrl =
  'http://checkout.lusini.local/fr-ch/cart/share'
config.modules.cart.accountUrl = 'http://checkout.lusini.local/fr-ch/account'
config.modules.cart.cartRecreate =
  'http://checkout.lusini.local/fr-ch/cartrecall/items/'
config.modules.cart.newsletterUrl =
  'http://checkout.lusini.local/fr-ch/newsletter'
config.modules.cart.fetchUserStateUrl =
  'http://checkout.lusini.local/fr-ch/widgets/userstatus'
config.features.onetrust = false
config.features.devMode = true
config.features.seoNoFollow = true

config.index.products = 'dev_lusini_fr_CH_products'
config.index.categories = 'dev_lusini_fr_CH_categories'
config.index.series = 'dev_lusini_fr_CH_series'

config.baseUrl = 'http://www.lusini.local'
config.hrefLang = ['lusini_dev.fr-fr', 'lusini_dev.fr-be', 'lusini_dev.fr-ch']
config.slugifyLocale = 'fr'

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}

module.exports = config
