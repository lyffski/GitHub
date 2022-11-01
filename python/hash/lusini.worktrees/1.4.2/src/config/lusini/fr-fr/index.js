module.exports = {
  assetPrefix: '',
  location: 'lusini_fr-fr',
  shopName: 'lusini',
  locale: 'fr-fr',
  rootCategoryId: 'EMG',
  i18n: {
    currency_ISO: 'EUR',
    locale: 'fr-FR',
  },
  slugifyLocale: 'fr',
  hrefLang: ['lusini.fr-ch', 'lusini.fr-fr'],
  baseUrl: 'https://www.lusini.com',
  modules: {
    cloudinary: {
      endpoint: 'https://res.cloudinary.com/lusini/',
      transformations: {
        // big pdp images
        freisteller_l: 'w_1500,h_1500,q_80,c_pad,f_auto',
        freisteller_l_2: 'w_1500,h_1500,q_80,c_pad,f_auto',
        milieu_l: 'w_1500,h_1500,g_auto,q_80,c_fill,f_auto',
        milieu_l_2: 'w_1500,h_1500,g_auto,q_80,c_fill,f_auto',
        // small pdp images
        freisteller_m: 'w_500,h_500,q_70,c_pad,f_auto',
        freisteller_m_2: 'w_500,h_500,q_70,c_pad,f_auto',
        milieu_m: 'ws_500,h_500,g_auto,q_70,c_fill,f_auto',
        milieu_m_2: 'ws_500,h_500,g_auto,q_70,c_fill,f_auto',
        // listing images
        freisteller_s: 'w_300,h_300,q_70,c_pad,f_auto',
        freisteller_s_2: 'w_600,h_600,q_70,c_pad,f_auto',
        milieu_s: 'w_300,h_300,g_auto,q_70,c_fill,f_auto',
        milieu_s_2: 'w_600,h_600,g_auto,q_70,c_fill,f_auto',
        // color images-
        freisteller_xs: 'w_50,h_50,q_50,c_pad,fl_lossy,f_auto',
        freisteller_xs_2: 'w_100,h_100,q_50,c_pad,fl_lossy,f_auto',
        milieu_xs: 'w_50,h_50,g_auto,q_50,c_fill,fl_lossy,f_auto',
        milieu_xs_2: 'w_100,h_100,g_auto,q_50,c_fill,fl_lossy,f_auto',
      },
      fallback_product_picture:
        'https://res.cloudinary.com/lusini/image/upload/v1643182695/application/products/lusini-online-shop-platzhalter-produktbild-in-kuerze-fr.svg',
    },
    cart: {
      domain: 'lusini.com',
      fetchCartUrl:
        'https://checkout.lusini.com/fr-fr/CustomRequests/ajaxCartData',
      addCartItemUrl:
        'https://checkout.lusini.com/fr-fr/Checkout/ajaxAddArticleCart',
      removeCartItemUrl:
        'https://checkout.lusini.com/fr-fr/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart',
      cartPixelUrl: 'https://checkout.lusini.com/fr-fr/checkout/cart',
      shareCartUrl: 'https://checkout.lusini.com/fr-fr/cart/share',
      cartRecreate: 'https://checkout.lusini.com/fr-fr/cartrecall/items/',
      accountUrl: 'https://checkout.lusini.com/fr-fr/account',
      newsletterUrl: 'https://checkout.lusini.com/fr-fr/newsletter',
    },
    algolia: {
      apiKey: '1c9701a0cd415235591cb737e2c47e27',
      applicationId: 'WAVYBEW6OQ',
    },
    contentful: {
      space: 'aza65graowyr',
      environment: 'master',
      accessToken:
        process.env.CONTENTFUL_ACCESS_TOKEN ||
        'OExq-bY8Ujs7M06rQEL1drC2kfafk-qmEzA8DZO0CCE',
      previewToken: 'QP7JxRhc0mYWGrX3I8vj9WdBO_eF7n9r0xnmcX11HAw',
      host: process.env.CONTENTFUL_HOST,
    },
    dynamicYield: {
      apiKey:
        '2cb6455eb1d9d3b2b8d9115f70824ab5e55e52e8b3b13f7741b6312afc52ec9c',
      campaignID: '9878637',
    },
    trustedshop: {
      id: '',
    },
  },
  index: {
    products: 'prod_lusini_fr_FR_products',
    productsPriceAsc: 'prod_lusini_fr_FR_products_priceAsc',
    categories: 'prod_lusini_fr_FR_categories',
    series: 'prod_lusini_fr_FR_series',
  },
  deliveryDate: {
    shippingTooLong: 150,
  },
  features: {
    onetrust: true,
    seoNoFollow: false,
    devMode: false,
    trustedshop: false,
    b2c: true,
    userLikeWidgetUrl: '',
  },
}
