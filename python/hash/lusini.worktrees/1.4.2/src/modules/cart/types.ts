/**
 * Minimal configuration to add a Product to cart
 */

export type RawItem = {
  sku: string
  amount: number
  position_id?: string
  shopwarePrice: number
  variant: Variant
  config?: Config
}
/**
 * configuration for custom tailor products
 */
export type Config = {
  form: 'square' | 'rectangular' | 'round' | 'oval'
  size: { width: string; length?: string }
  brink: { type: 'normal' | 'cuvert'; width: string }
  squareM: string
  priceTotal: { net: string; gross: string }
  price: string
  amount: string
}
export type Cart = {
  items: RawItem[]
  totalNetto: number
  totalBrutto: number
}

export type Variant = {
  sku: string
  isDummy?: boolean
  title: string
  subtitle: string
  description: string
  shippingFree: boolean
  specialDelivery: boolean
  unit: {
    unitName: string
    purchaseUnit: number
    referenceUnit: number
    packUnit: string
  }
  images: {
    imageWeb: {
      url: string
      classes: Array<'ASSET_FS' | string>
    }[]
    image360: unknown
  }
  objectID: string
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
  attributes: {
    [key: string]: {
      label: string
      values: {
        value?: string | number
        icon?: string
        document?: string
        unit?: string
      }[]
      is_pdp_attribute: boolean
      is_filter: boolean
    }
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
    referencePriceGrossString: string | null
    referencePriceNetString: string | null
    discountGroup: string | null
    piecePriceNetString: string | null
    piecePriceGrossString: string | null
  }[]
  brand: string
  containerID: string
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
    referencePriceGrossString: string | null
    referencePriceNetString: string | null
    discountGroup: string | null
    piecePriceNetString: string | null
    piecePriceGrossString: string | null
  }
  variantData: Record<
    'color' | 'size' | 'variant' | 'style',
    {
      label?: string | null
      image?: string
    }
  >
  stock: number
  sellOut: boolean
  sellable: boolean
  deliveryDate: string | null
  deliveryDays: number | null
  flags: string[]
  taxRate: string
  documents?: {
    url: string
    title: string
  }[]
  configurations: {
    custom_tailor: {
      is_custom_tailor: boolean
      configuration_data?: {
        saumbreite: string
      }
    }
  }
}

export declare namespace api {
  export type Fetch = Cart
  export type AddItem = Cart
  export type RemoveItem = Cart
  export type FetchAlgolia = Variant[]
}
