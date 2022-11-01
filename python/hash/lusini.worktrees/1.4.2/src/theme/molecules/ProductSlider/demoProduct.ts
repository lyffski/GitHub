import * as t from './types'
const demoProduct: Partial<t.Product> = {
  containerID: '157300',
  title: 'Demo',
  sku: '132456',
  images: {
    imageWeb: [
      {
        url: 'https://d1e31blwg2sz0c.cloudfront.net/pim/095574/5074cf/c359b6/ae82b3/bc78c7/c9/0955745074cfc359b6ae82b3bc78c7c9.jpeg',
        classes: ['ASSET_FS'],
      },
    ],
  },
  variantData: {
    color: {},
    size: {},
    variant: {},
    style: {},
  },
  unit: {
    packUnit: 'Stück',
    purchaseUnit: 1,
    referenceUnit: 1,
    unitName: 'Stück',
  },
  prices: {
    ecoTaxNet: null,
    ecoTaxGross: null,
    packPriceNet: 24.54,
    packPriceGross: 29.2,
    piecePriceNet: 4.09,
    piecePriceGross: 4.87,
    packPseudoPriceNet: 35,
    packPseudoPriceGross: 37,
    piecePseudoPriceNet: 5,
    piecePseudoPriceGross: 6,
    referencePriceNet: null,
    referencePriceGross: null,
    referencePriceGrossString: null,
    productCheapestPiecePriceNet: null,
    productCheapestPiecePriceGross: null,
    productMostexpensivePiecePriceNet: null,
    productMostexpensivePiecePriceGross: null,
    referencePriceNetString: null,
  },
  priceRules: [],
  brand: 'Vega',
  flags: ['new', 'sale', 'discount'],
  variantImages: [
    'pim/b33704/72d6b7/3a4d8c/032a88/27dd32/87/b3370472d6b73a4d8c032a8827dd3287.jpeg',
    'pim/003c02/7747e9/92a092/844382/bc7d50/fe/003c027747e992a092844382bc7d50fe.jpeg',
    'pim/04785e/349813/9e0a37/5f0bb7/033481/61/04785e3498139e0a375f0bb703348161.jpeg',
    'pim/732679/cafcd3/eb7728/172926/71aaac/c2/732679cafcd3eb772817292671aaacc2.jpeg',
  ],
  attributes: {},
  categories: {},
}

export default demoProduct
