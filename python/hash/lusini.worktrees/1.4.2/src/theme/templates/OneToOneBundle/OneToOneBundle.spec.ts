import { RenderFactory } from 'utils/test-helper'
import { OneToOneBundle as Component } from './OneToOneBundle'

describe('templates/oneToOneBundle', () => {
  const factory = new RenderFactory(Component, {})

  beforeEach(async () => {
    factory.clearMocks()
    factory.module('utils').fn('categories_getAllCatgories').mock('empty')
    await factory
      .module('OneToOneBundle')
      .fn('getProductFromSku')
      .mock('default')
    await factory
      .module('listing')
      .fn('fetch')
      .mock('configurator-related-products')
  })

  it('renders a list of related products, which are related to the already selected product', async () => {
    const f = await factory.create()
    const ctx = f.context('templates/OneToOneBundle')
    ctx.shouldHaveState('configurable-preselected-product')
  })

  it('renders a clickable productWidget in related-ProductList', async () => {
    const f = await factory.create()
    const ctx = f.context('molecules/ProductWidget')
    expect(ctx.handle('click-out')).toBeDefined
  })

  it('shows both delete_btns if both products are selected', async () => {
    factory.clearMocks()
    await factory
      .module('OneToOneBundle')
      .fn('useBundledProducts')
      .mock({
        value: {
          firstProduct: product,
          secondProduct: product,
        },
        sync: true,
      })
    const f = await factory.create()
    f.context('templates/OneToOneBundle').shouldHaveState('show-delete-button')
  })

  it('does not show the buybox if only one product is selected', async () => {
    const f = await factory.create()
    f.context('templates/OneToOneBundle').shouldNotHaveState('show-buy-box')
  })

  it('shows the buybox if both products are selected', async () => {
    factory.clearMocks()
    await factory
      .module('OneToOneBundle')
      .fn('useBundledProducts')
      .mock({
        value: {
          firstProduct: product,
          secondProduct: product,
        },
        sync: true,
      })
    const f = await factory.create()
    f.context('templates/OneToOneBundle').shouldHaveState('show-buy-box')
  })

  it('shows the add to cart button, if both products are selected and available', async () => {
    factory.clearMocks()
    await factory
      .module('OneToOneBundle')
      .fn('useBundledProducts')
      .mock({
        value: {
          firstProduct: product,
          secondProduct: product,
        },
        sync: true,
      })
    const f = await factory.create()
    f.context('templates/OneToOneBundle').shouldHaveState('show-add-to-cart')
  })
})

const product = {
  sku: '10089392',
  title: 'Tischsäule Nostalgie',
  brand: 'VEGA',
  containerID: '106928',
  sellable: true,
  sellOut: false,
  stock: 1,
  specialDelivery: false,
  deliveryDate: null,
  variantData: {
    size: {
      label: '42x42x72 cm (BxLxH)',
    },
    color: {
      label: 'schwarz',
    },
    style: {},
    variant: {},
  },
  attributes: {
    BRAND: {
      label: 'Marke',
      values: [
        {
          icon: 'pim/92a8f2/f4f1c2/e01903/fa84f8/5201f3/87/92a8f2f4f1c2e01903fa84f85201f387.svg',
          value: 'VEGA',
        },
      ],
      is_filter: true,
      is_pdp_attribute: false,
    },
    COLOR: {
      label: 'Farbe',
      values: [
        {
          value: 'schwarz',
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    WIDTH: {
      label: 'Breite',
      values: [
        {
          unit: 'cm',
          value: 42,
        },
      ],
      is_filter: true,
      is_pdp_attribute: true,
    },
    HEIGHT: {
      label: 'Höhe',
      values: [
        {
          unit: 'cm',
          value: 72,
        },
      ],
      is_filter: true,
      is_pdp_attribute: true,
    },
    LENGTH: {
      label: 'Länge',
      values: [
        {
          unit: 'cm',
          value: 42,
        },
      ],
      is_filter: true,
      is_pdp_attribute: true,
    },
    MATERIAL: {
      label: 'Material',
      values: [
        {
          value: 'Stahl',
        },
      ],
      is_filter: true,
      is_pdp_attribute: false,
    },
    EMG_BRAND: {
      label: 'EMG-Marke',
      values: [
        {
          value: 'Vega',
        },
      ],
      is_filter: false,
      is_pdp_attribute: false,
    },
    HAS_STOCK: {
      label: 'Sofort verfügbar',
      values: [
        {
          value: true,
        },
      ],
      is_filter: true,
      is_pdp_attribute: false,
    },
    HIGHLIGHT: {
      label: 'Highlight',
      values: [
        {
          value: '.',
        },
      ],
      is_filter: false,
      is_pdp_attribute: false,
    },
    COLORSPACE: {
      label: 'Farbton',
      values: [
        {
          icon: 'pim/1877f0/de4cf0/b754b7/970691/af0281/59/1877f0de4cf0b754b7970691af028159.svg',
          value: 'Schwarz',
        },
      ],
      is_filter: true,
      is_pdp_attribute: false,
    },
    WEIGHT_NET: {
      label: 'Gewicht netto',
      values: [
        {
          unit: 'kg',
          value: 20.6,
        },
      ],
      is_filter: true,
      is_pdp_attribute: true,
    },
    MEASUREMENTS: {
      label: 'Abmessung',
      values: [
        {
          value: '42x42x72 cm (BxLxH)',
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    PRODUCT_NAME: {
      label: 'Produktname (Verkauf)',
      values: [
        {
          value: 'Tischsäule Nostalgie',
        },
      ],
      is_filter: false,
      is_pdp_attribute: false,
    },
    PRODUCT_TYPE: {
      label: 'PRODUCT_TYPE',
      values: [
        {
          value: 'Tischsäulen',
        },
      ],
      is_filter: true,
      is_pdp_attribute: true,
    },
    LIMIT_TABLETOP: {
      label: 'Max. zul. Tischplattengröße',
      values: [
        {
          value: '80 cm (Ø), 70x70 cm (BxL)',
        },
      ],
      is_filter: true,
      is_pdp_attribute: true,
    },
    STYLE_CATEGORY: {
      label: 'Stilwelt',
      values: [
        {
          value: 'Local Treasuries',
        },
      ],
      is_filter: false,
      is_pdp_attribute: false,
    },
    MATERIAL_DETAILS: {
      label: 'Materialdetails',
      values: [
        {
          value: 'Stahlguss pulverbeschichtet',
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    DELIVERYCONDITION: {
      label: 'Lieferzustand',
      values: [
        {
          value: 'Zerlegt',
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    OUTDOOR_INDOOR_USE: {
      label: 'Einsatzbereich',
      values: [
        {
          value: 'Innen',
        },
      ],
      is_filter: true,
      is_pdp_attribute: true,
    },
    PROPERTIES_PRODUCT: {
      label: 'Produkteigenschaft',
      values: [
        {
          value: 'besonders kratzfest',
        },
        {
          value: 'pflegeleicht',
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    WARRANTY_REPURCHASE: {
      label: 'Nachkaufgarantie(Jahre)',
      values: [
        {
          icon: 'pim/66bfc1/feeab4/1e22ef/b777f1/7e8333/8d/66bfc1feeab41e22efb777f17e83338d.svg',
          value: '3 Jahre',
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    LIMIT_TABLETOP_ROUND: {
      label: 'Max. empf. Tischplattengröße (rund)',
      values: [
        {
          value: '80 cm (Ø)',
        },
      ],
      is_filter: false,
      is_pdp_attribute: false,
    },
    LOWER_LIMIT_TABLETOP: {
      label: 'Min. empf. Tischplattengröße',
      values: [
        {
          value: '60 cm (Ø), 50x50 cm (BxL)',
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    LIMIT_TABLETOP_ANGULAR: {
      label: 'Max. empf. Tischplattengröße (eckig)',
      values: [
        {
          value: '70x70 cm (BxL)',
        },
      ],
      is_filter: false,
      is_pdp_attribute: false,
    },
    LOW_LIMIT_TABLETOP_ROUND: {
      label: 'Min. empf. Tischplattengröße (rund)',
      values: [
        {
          value: '60 cm (Ø)',
        },
      ],
      is_filter: false,
      is_pdp_attribute: false,
    },
    WARRANTY_REPURCHASE_ICON: {
      label: 'Nachkaufgarantie Icon',
      values: [
        {
          value: '400527',
        },
      ],
      is_filter: false,
      is_pdp_attribute: false,
    },
    WIDTH_MAX_RECOM_TABLETOP: {
      label: 'Breite (max. empf. Tischplattengröße)',
      values: [
        {
          unit: 'cm',
          value: 70,
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    WIDTH_MIN_RECOM_TABLETOP: {
      label: 'Breite (min. empf. Tischplattengröße)',
      values: [
        {
          unit: 'cm',
          value: 50,
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    DIAMET_MAX_RECOM_TABLETOP: {
      label: 'Durchmesser (max. empf. Tischplattengröße)',
      values: [
        {
          unit: 'cm',
          value: 80,
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    DIAMET_MIN_RECOM_TABLETOP: {
      label: 'Durchmesser (min. empf. Tischplattengröße)',
      values: [
        {
          unit: 'cm',
          value: 60,
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    LENGTH_MAX_RECOM_TABLETOP: {
      label: 'Länge (max. empf. Tischplattengröße)',
      values: [
        {
          unit: 'cm',
          value: 70,
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    LENGTH_MIN_RECOM_TABLETOP: {
      label: 'Länge (min. empf. Tischplattengröße)',
      values: [
        {
          unit: 'cm',
          value: 50,
        },
      ],
      is_filter: false,
      is_pdp_attribute: true,
    },
    LOW_LIMIT_TABLETOP_ANGULA: {
      label: 'Min. empf. Tischplattengröße (eckig)',
      values: [
        {
          value: '50x50 cm (BxL)',
        },
      ],
      is_filter: false,
      is_pdp_attribute: false,
    },
  },
  categories: {
    lvl0: ['Marken', 'Möbel'],
    lvl1: ['Marken > VEGA', 'Möbel > Tischsäulen'],
    lvl2: ['Marken > VEGA > Möbel'],
    lvl3: ['Marken > VEGA > Möbel > Tischsäulen'],
  },
  unit: {
    unitName: 'Stück',
    purchaseUnit: 1,
    referenceUnit: 1,
    packUnit: 'Stück',
  },
  prices: {
    ecoTaxNet: null,
    ecoTaxGross: null,
    packPriceNet: 69.99,
    piecePriceNet: 69.99,
    packPriceGross: 83.29,
    piecePriceGross: 83.29,
    referencePriceNet: null,
    packPseudoPriceNet: 0,
    piecePseudoPriceNet: 0,
    referencePriceGross: null,
    packPseudoPriceGross: 0,
    piecePseudoPriceGross: 0,
    referencePriceNetString: null,
    referencePriceGrossString: null,
    productCheapestPiecePriceNet: 69.99,
    productCheapestPiecePriceGross: 83.29,
    productMostexpensivePiecePriceNet: 79.99,
    productMostexpensivePiecePriceGross: 95.19,
  },
  priceRules: [
    {
      customerGroupKey: 'DE',
      from: 0,
      to: 'beliebig',

      packPriceNet: 69.99,
      packPriceGross: 83.29,
      piecePriceNet: 69.99,
      piecePriceGross: 83.29,
      packPseudoPriceNet: 0,
      packPseudoPriceGross: 0,
      piecePseudoPriceNet: 0,
      piecePseudoPriceGross: 0,
      referencePriceNet: null,
      referencePriceGross: null,
      referencePriceNetString: null,
      referencePriceGrossString: null,
      productCheapestPiecePriceNet: 69.99,
      productCheapestPiecePriceGross: 83.29,
      productMostexpensivePiecePriceNet: 79.99,
      productMostexpensivePiecePriceGross: 95.19,
    },
  ],
  images: {
    imageWeb: [
      {
        url: 'pim/162fa2/c6b3b9/3e1f79/737b27/4ce1ef/07/162fa2c6b3b93e1f79737b274ce1ef07.jpeg',
        classes: ['ASSET_FS'],
      },
      {
        url: 'pim/dea84b/fe667a/3bc256/97d54d/4d3ab7/4a/dea84bfe667a3bc25697d54d4d3ab74a.jpeg',
        classes: ['ASSET_M'],
      },
    ],
  },
  variantImages: [
    'pim/162fa2/c6b3b9/3e1f79/737b27/4ce1ef/07/162fa2c6b3b93e1f79737b274ce1ef07.jpeg',
    'pim/b9c057/760a20/334fa3/e8d81f/f9a4eb/49/b9c057760a20334fa3e8d81ff9a4eb49.jpeg',
  ],
  flags: [],
  related: {
    crossSells: ['30003095', '10090060', '10099083', '10089851'],
    alternatives: [
      '10089394',
      '10089561',
      '30040107',
      '10089558',
      '10089559',
      '10089560',
      '10089562',
      '30053189',
      '10092846',
      '10089573',
      '10089574',
      '10089575',
    ],
    optionalAdditions: [],
    configurableRelations: [
      {
        skus: [
          '10000086',
          '30040348',
          '10094698',
          '10094095',
          '10089816',
          '10093360',
          '10089826',
          '10095103',
          '30003902',
          '30003903',
          '30003909',
          '30003898',
          '30003908',
          '30003904',
          '30003897',
          '30067324',
          '30103817',
          '10094304',
          '30053045',
          '10094298',
          '10094701',
          '10095273',
          '30040345',
          '30040336',
          '30040341',
          '30040337',
          '30040342',
          '30045582',
          '10068240',
          '10066445',
          '10089926',
          '10091623',
          '10091610',
          '30044666',
          '10008426',
          '10089918',
          '10099081',
          '10094309',
          '10089654',
          '30044661',
          '20095208',
          '30052839',
          '30110673',
          '10094305',
          '10094293',
          '10094286',
          '10092198',
          '30107731',
          '10095033',
          '10095028',
          '10000088',
          '10094748',
          '10095097',
          '30108322',
          '30044663',
          '10089820',
          '10094302',
          '30056028',
          '30054495',
          '30044419',
          '10094739',
          '10094754',
          '10089533',
          '10092633',
          '30101899',
          '10089630',
          '30014560',
          '30014580',
          '10094921',
          '30089847',
          '30067329',
          '30108572',
          '10089811',
          '30002385',
          '30002381',
          '10094089',
          '30002384',
          '10089858',
          '10089821',
          '10089614',
          '10095063',
          '10094838',
          '10094841',
          '30003905',
          '30003912',
          '30003911',
          '30003896',
          '10094299',
          '10008993',
          '10008981',
          '30040343',
          '30040334',
          '30040339',
          '30040335',
          '10089888',
          '10099394',
          '10089919',
          '10089920',
          '10091999',
          '10008428',
          '10094296',
          '10089653',
          '10092126',
          '10092234',
          '10095282',
          '10000091',
          '10000089',
          '10000275',
          '10072168',
          '10066442',
          '30103818',
          '30044660',
          '10095284',
          '10089922',
          '10094514',
          '30000084',
          '30056036',
          '30014577',
          '30014565',
          '30108457',
          '30014567',
          '30014547',
          '10089921',
          '10089857',
          '30014590',
          '30014662',
          '10089849',
          '10094835',
          '10094844',
          '10008427',
          '30003906',
          '10089621',
          '10089825',
          '30067326',
          '30110677',
          '10094287',
          '30040344',
          '10093711',
          '10000090',
          '10000087',
          '10057854',
          '10045971',
          '30002515',
          '10069927',
          '10060767',
          '10092862',
          '10092865',
          '10094743',
          '10094442',
          '10094443',
          '10008491',
          '30043560',
          '30044421',
          '30044422',
          '30067330',
          '10094749',
          '10094744',
          '10095098',
          '10091622',
          '10091620',
          '10095061',
          '10089925',
          '30014556',
          '30003913',
          '10089622',
          '30000070',
          '10093358',
          '10089850',
          '30056041',
          '10008425',
          '30003901',
          '30003910',
          '10089613',
          '30067323',
          '30067325',
          '10089651',
          '30052841',
          '10089657',
          '10094292',
          '10094517',
          '30040340',
          '30040338',
          '10089927',
          '10091613',
          '10093424',
          '10093966',
          '10092856',
          '10092872',
          '10091616',
          '10092859',
          '10099397',
          '10094290',
          '30044667',
          '10089659',
          '30052842',
          '30053046',
          '30052840',
          '10094665',
          '30107732',
          '10070804',
          '10092628',
          '10094753',
          '10094738',
          '30003907',
          '30056033',
          '10008987',
          '10089660',
          '10094917',
          '30002828',
          '30002829',
          '10089599',
          '30067327',
          '30067328',
          '30108057',
          '30000077',
          '10095272',
          '10089923',
          '10089924',
          '30101896',
        ],
        type: 'tableTop',
      },
    ],
  },
}
