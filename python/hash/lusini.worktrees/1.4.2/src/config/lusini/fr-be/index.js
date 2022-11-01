module.exports = {
  assetPrefix: '',
  location: 'lusini_fr-be',
  shopName: 'lusini',
  locale: 'fr-be',
  rootCategoryId: 'EMG',
  i18n: {
    currency_ISO: 'EUR',
    locale: 'fr-BE',
  },
  slugifyLocale: 'fr',
  hrefLang: ['lusini.fr-be', 'lusini.fr-ch', 'lusini.fr-fr'],
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
        'https://checkout.lusini.com/fr-be/CustomRequests/ajaxCartData',
      addCartItemUrl:
        'https://checkout.lusini.com/fr-be/Checkout/ajaxAddArticleCart',
      removeCartItemUrl:
        'https://checkout.lusini.com/fr-be/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart',
      cartPixelUrl: 'https://checkout.lusini.com/fr-be/checkout/cart',
      shareCartUrl: 'https://checkout.lusini.com/fr-be/cart/share',
      cartRecreate: 'https://checkout.lusini.com/fr-be/cartrecall/items/',
      accountUrl: 'https://checkout.lusini.com/fr-be/account',
      newsletterUrl: 'https://checkout.lusini.com/fr-be/newsletter',
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
        'fd5dbeea5324385f765477f01dc7b252450f5361bf3b6229649172256ef9d29c',
      campaignID: '9878638',
    },
    trustedshop: {
      id: '',
    },
  },
  index: {
    products: 'prod_lusini_fr_BE_products',
    productsPriceAsc: 'prod_lusini_fr_BE_products_priceAsc',
    categories: 'prod_lusini_fr_BE_categories',
    series: 'prod_lusini_fr_BE_series',
  },
  deliveryDate: {
    shippingTooLong: 150,
  },
  features: {
    onetrust: true,
    seoNoFollow: false,
    devMode: false,
    trustedshop: false,
    b2c: false,
    userLikeWidgetUrl: '',
  },
  langShop: {
    current: {
      language: 'Langue',
      locale: 'FR',
    },
    alternate: [
      { label: 'Français', url: 'https://www.lusini.com/fr-be/', active: true },
      {
        label: 'Néerlandais',
        url: 'https://www.lusini.com/nl-be/',
        active: false,
      },
    ],
  },
}
