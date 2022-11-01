export type Props = {
  listname: string
  maxProducts: number
  title?: string
  initialProducts?: Product[]
  hideScrollbar?: boolean
  layoutSize?: string
  fetchFn: (page: number) => Promise<{
    data: Product[]
    finished: boolean
  }>
  'data-cy-state'?: string
}

export type Product = {
  containerID: string
  sku: string
  prices: {
    ecoTaxNet: number | null
    ecoTaxGross: number | null
    packPriceNet: number
    packPriceGross: number
    piecePriceNet: number
    piecePriceGross: number
    packPseudoPriceNet: number
    packPseudoPriceGross: number
    piecePseudoPriceNet: number
    piecePseudoPriceGross: number
    referencePriceNet: null | number
    referencePriceGross: null | number
    referencePriceNetString: null | string
    referencePriceGrossString: null | string
    productCheapestPiecePriceNet: null | number
    productCheapestPiecePriceGross: null | number
    productMostexpensivePiecePriceNet: null | number
    productMostexpensivePiecePriceGross: null | number
  }
  priceRules: {
    customerGroupKey: string
    from: number
    to: string | number
    packPriceNet: number
    packPriceGross: number
    piecePriceNet: number
    piecePriceGross: number
    packPseudoPriceNet: number
    packPseudoPriceGross: number
    piecePseudoPriceNet: number
    piecePseudoPriceGross: number
    referencePriceNet: null | number
    referencePriceGross: null | number
    referencePriceNetString: null | string
    referencePriceGrossString: null | string
    productCheapestPiecePriceNet: null | number
    productCheapestPiecePriceGross: null | number
    productMostexpensivePiecePriceNet: null | number
    productMostexpensivePiecePriceGross: null | number
  }[]
  images: {
    imageWeb: {
      url: string
      classes: Array<'ASSET_FS' | string>
    }[]
  }
  title: string
  brand: string
  unit: {
    unitName: string
    purchaseUnit: number
    referenceUnit: number
    packUnit: string
  }
  attributes: {
    [key: string]: {
      label: string
      values: {
        value?: string | number | boolean
        icon?: string
        document?: string
        unit?: string
      }[]
      is_pdp_attribute: boolean
      is_filter: boolean
    }
  }
  flags: string[]
  variantImages: string[]
  categories: Partial<{
    lvl0: string[]
    lvl1: string[]
    lvl2: string[]
    lvl3: string[]
    lvl4: string[]
    lvl5: string[]
    lvl6: string[]
    lvl7: string[]
  }>
  variantData: Record<
    'color' | 'size' | 'variant' | 'style',
    {
      label?: string | null
      image?: string
    }
  >
}
