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
    referencePriceGrossString: null | string
    referencePriceNetString: null | string
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
    referencePriceGrossString: null | string
    referencePriceNetString: null | string
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
    image360?: unknown[]
    video?: unknown[]
  }
  flags: string[]
  title: string
  brand: string
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
  variantImages: string[]
  related: {
    crossSells: string[]
    alternatives: string[]
    optionalAdditions: string[]
    configurableRelations?: ConfigurableRelationData[]
  }
  subtitle?: string
  stock: number
  deliveryDate: string | null
  specialDelivery: boolean
  deliveryDays?: number | null
  sellOut: boolean
  sellable: boolean
  unit: {
    unitName: string
    purchaseUnit: number
    referenceUnit: number
    packUnit: string
  }
}

export type ConfigurableRelationData = {
  skus: string[]
  type: string
}
