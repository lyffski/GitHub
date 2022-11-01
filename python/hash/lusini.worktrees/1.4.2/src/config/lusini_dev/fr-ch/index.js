/* eslint-disable @typescript-eslint/no-var-requires */
const config = JSON.parse(JSON.stringify(require('../../lusini/fr-ch/index')))

config.baseUrl = 'https://www.lusini.dev'
config.hrefLang = ['lusini_dev.fr-fr', 'lusini_dev.fr-be', 'lusini_dev.fr-ch']

config.langShop = {
  current: {
    language: 'Language',
    locale: 'FR',
  },
  alternate: [
    { label: 'deutsch', url: 'https://www.lusini.dev/de-ch/', active: false },
    { label: 'français', url: 'https://www.lusini.dev/fr-ch/', active: true },
  ],
}

config.modules.cart.domain = 'lusini.dev'
config.modules.cart.fetchCartUrl =
  'https://checkout.lusini.dev/fr-ch/CustomRequests/ajaxCartData'
config.modules.cart.addCartItemUrl =
  'https://checkout.lusini.dev/fr-ch/Checkout/ajaxAddArticleCart'
config.modules.cart.removeCartItemUrl =
  'https://checkout.lusini.dev/fr-ch/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart'
config.modules.cart.cartPixelUrl =
  'https://checkout.lusini.dev/fr-ch/checkout/cart'
config.modules.cart.shareCartUrl =
  'https://checkout.lusini.dev/fr-ch/cart/share'
config.modules.cart.cartRecreate =
  'https://checkout.lusini.dev/fr-ch/cartrecall/items/'
config.modules.cart.accountUrl = 'https://checkout.lusini.dev/fr-ch/account'
config.modules.cart.newsletterUrl =
  'https://checkout.lusini.dev/fr-ch/newsletter'
config.modules.cart.fetchUserStateUrl =
  'https://checkout.lusini.dev/fr-ch/widgets/userstatus'

config.features.onetrust = false
config.features.devMode = true

config.index.products = 'dev_lusini_fr_CH_products'
config.index.categories = 'dev_lusini_fr_CH_categories'
config.index.series = 'dev_lusini_fr_CH_series'

config.baseUrl = 'https://www.lusini.dev'
config.hrefLang = ['lusini_dev.fr-fr', 'lusini_dev.fr-be', 'lusini_dev.fr-ch']
config.slugifyLocale = 'fr'
config.langShop = {
  current: {
    language: 'Language',
    locale: 'FR',
  },
  alternate: [
    { label: 'deutsch', url: 'https://www.lusini.dev/de-ch/', active: false },
    { label: 'français', url: 'https://www.lusini.dev/fr-ch/', active: true },
  ],
}

config.modules.dynamicYield = {
  apiKey: '272f313d481fea0f5e0c1aaabef2eac667890df241bd7d3c9220ffe8459f8531',
  campaignID: '9877574',
}
config.assetPrefix = ''

module.exports = config
