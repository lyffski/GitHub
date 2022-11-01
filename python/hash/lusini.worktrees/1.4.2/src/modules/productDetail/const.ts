import * as t from './types'
import whitePixel from 'utils/whitePixel'

export const FETCH_REQUEST: 'productDetail/FETCH_REQUEST' =
  'productDetail/FETCH_REQUEST'
export const FETCH_SUCCESS: 'productDetail/FETCH_SUCCESS' =
  'productDetail/FETCH_SUCCESS'
export const FETCH_FAILURE: 'productDetail/FETCH_FAILURE' =
  'productDetail/FETCH_FAILURE'
export const INIT: 'productDetail/INIT' = 'productDetail/INIT'
export const SET_FILTER_VALUE: 'productDetail/SET_FILTER_VALUE' =
  'productDetail/SET_FILTER_VALUE'
export const SET_FILTER_VALUES: 'productDetail/SET_FILTER_VALUES' =
  'productDetail/SET_FILTER_VALUES'
export const CLEAR: 'productDetail/CLEAR' = 'productDetail/CLEAR'
export const SET_CUSTOM_TAILOR: 'productDetail/SET_CUSTOM_TAILOR' =
  'productDetail/SET_CUSTOM_TAILOR'

export const INIT_CUSTOM_TAILOR: 'productDetail/INIT_CUSTOM_TAILOR' =
  'productDetail/INIT_CUSTOM_TAILOR'

export const defaultFilterValues: t.FilterValues = {
  containerID: '',
  color: null,
  size: null,
  variant: null,
  style: null,
}

export const dummyVariant: t.Variant = {
  sku: 'dummy',
  isDummy: true,
  shippingFree: false,
  specialDelivery: false,
  deliveryDate: '',
  deliveryDays: null,
  related: {
    crossSells: [],
    alternatives: [],
    optionalAdditions: [],
  },
  unit: {
    unitName: 'dummy',
    purchaseUnit: 1,
    referenceUnit: 1,
    packUnit: 'dummy',
  },
  images: {
    imageWeb: [
      {
        url: whitePixel,
        classes: ['DUMMY'],
      },
      {
        url: whitePixel,
        classes: ['DUMMY'],
      },
    ],
    image360: [],
  },
  objectID: 'dummy',
  categories: {
    lvl0: ['dummy'],
    lvl1: ['dummy'],
  },
  title: '||||||| ||||||||',
  description: 'lorem ipsum dorlor sit amet',
  priceRules: [],
  brand: 'VEGA',
  containerID: 'dummy',
  prices: {
    ecoTaxNet: null,
    ecoTaxGross: null,
    packPriceNet: 10,
    packPriceGross: 10,
    piecePriceNet: 10,
    piecePriceGross: 10,
    packPseudoPriceNet: 0,
    packPseudoPriceGross: 0,
    piecePseudoPriceNet: 0,
    piecePseudoPriceGross: 0,
    referencePriceNet: null,
    referencePriceGross: null,
    referencePriceNetString: null,
    referencePriceGrossString: null,
    piecePriceNetString_template: '13,99 € / {$unit}',
    productCheapestPiecePriceNet: 13.99,
    piecePriceGrossString_template: '16,65 € / {$unit}',
    productCheapestPiecePriceGross: 16.65,
    productMostexpensivePiecePriceNet: 13.99,
    productMostexpensivePiecePriceGross: 16.65,
    discountGroup: null,
    piecePriceNetString: null,
    piecePriceGrossString: null,
  },
  variantData: {
    color: {
      label: 'Gestell grau',
    },
    size: {
      label: '80x80x73 cm (LxBxH)',
    },
    style: {
      label: null,
    },
    variant: {
      label: null,
    },
  },
  subtitle: 'lorem ipsum',
  stock: 1,
  sellOut: false,
  flags: [],
  sellable: false,
  attributes: {},
  documents: [],
  specimen: {
    isSpecimen: false,
    hasSpecimenProducts: [],
  },
  mainCategory: {
    lvl0: ['dummy'],
    lvl1: ['dummy>dummy'],
  },
  configurations: {
    custom_tailor: {
      is_custom_tailor: false,
      configuration_data: {
        shapes: ['square'],
        brinks: [{ type: 'normal', length: [0] }],
      },
    },
  },
}
