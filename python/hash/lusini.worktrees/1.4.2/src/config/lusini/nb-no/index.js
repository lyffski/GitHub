module.exports = {
  assetPrefix: '',
  location: 'lusini_nb-no',
  shopName: 'lusini',
  locale: 'nb-no',
  rootCategoryId: 'EMG',
  i18n: {
    currency_ISO: 'NOK',
    locale: 'nb-NO',
  },
  slugifyLocale: 'nb',
  hrefLang: ['lusini.nb-no'],
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
        'https://res.cloudinary.com/lusini/image/upload/v1643182695/application/products/lusini-online-shop-platzhalter-produktbild-in-kuerze-nb.svg',
    },
    cart: {
      domain: 'lusini.com',
      fetchCartUrl:
        'https://checkout.lusini.com/nb-no/CustomRequests/ajaxCartData',
      addCartItemUrl:
        'https://checkout.lusini.com/nb-no/Checkout/ajaxAddArticleCart',
      removeCartItemUrl:
        'https://checkout.lusini.com/nb-no/checkout/deleteArticle/sDelete/[position]/sTargetAction/cart',
      cartPixelUrl: 'https://checkout.lusini.com/nb-no/checkout/cart',
      shareCartUrl: 'https://checkout.lusini.com/nb-no/cart/share',
      cartRecreate: 'https://checkout.lusini.com/nb-no/cartrecall/items/',
      accountUrl: 'https://checkout.lusini.com/nb-no/account',
      newsletterUrl: 'https://checkout.lusini.com/nb-no/newsletter',
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
    products: 'prod_lusini_nb_NO_products',
    productsPriceAsc: 'prod_lusini_nb_NO_products_priceAsc',
    categories: 'prod_lusini_nb_NO_categories',
    series: 'prod_lusini_nb_NO_series',
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
    userLikeWidgetUrl:
      'https://userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/4f39d06e10a026aae5d280092f9e8bf6ea6644095ddc65f64079581c5fb44c37.js',
  },
  formApi: {
    conformityDeclaration:
      'https://getform.io/f/aec1a29b-dcdf-401c-801e-add63d6683bf',
  },
}
