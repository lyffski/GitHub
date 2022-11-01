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
  }[]
  images: {
    imageWeb: {
      url: string
      classes: Array<'ASSET_FS' | string>
    }[]
  }
  flags: string[]
  title: string
  brand: string
  unit: {
    unitName: string
    purchaseUnit: number
    referenceUnit: number
    packUnit: string
  }
}

export type Props = {
  product: Product
  type: 'pdp' | 'widget'
}

export type WrapperProps = {
  type: 'pdp' | 'widget'
}

export type Flags = 'new' | 'discount' | 'sale' | 'series'
