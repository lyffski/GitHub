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
  specimen: {
    isSpecimen: boolean
    hasSpecimenProducts: string[]
  }
  images: {
    imageWeb: {
      url: string
      classes: Array<'ASSET_FS' | string>
    }[]
    image360: unknown
    video?: {
      wistiaID?: string
      classes?: string[]
    }[]
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
    piecePriceNetString_template: string | null
    productCheapestPiecePriceNet: number | null
    piecePriceGrossString_template: string | null
    productCheapestPiecePriceGross: number | null
    productMostexpensivePiecePriceNet: number | null
    productMostexpensivePiecePriceGross: number | null
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
    piecePriceNetString_template: string | null
    productCheapestPiecePriceNet: number | null
    piecePriceGrossString_template: string | null
    productCheapestPiecePriceGross: number | null
    productMostexpensivePiecePriceNet: number | null
    productMostexpensivePiecePriceGross: number | null
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
  documents?: DocumentData[]
  product_line?: string[]
  series?: string[]
  related: {
    crossSells: string[]
    alternatives: string[]
    optionalAdditions: string[]
    configurableRelations?: ConfigurableRelationData[]
  }
  hreflang?: {
    lang: string
    url: string
  }[]
  mainCategory: Partial<{
    lvl0: string[]
    lvl1: string[]
    lvl2: string[]
    lvl3: string[]
    lvl4: string[]
    lvl5: string[]
    lvl6: string[]
    lvl7: string[]
  }>
  configurations: {
    custom_tailor: {
      is_custom_tailor: boolean
      configuration_data?: {
        shapes: Form[]
        brinks: {
          type: string
          length: number[]
          activeAt?: string[]
          additionalPricePercent?: number
        }[]
      }
    }
  }
}

export type FilterValues = {
  containerID: string
  color: string | null
  style: string | null
  variant: string | null
  size: string | null
}

export type DocumentData = {
  url: string
  title: string
}
export namespace api {
  export type Fetch = Variant[]
}

export type FilterKey = 'color' | 'size' | 'variant' | 'style'

export type FilterOption = {
  selectable: boolean
  label: string
  image: {
    url: string
    classes: Array<'ASSET_FS' | string>
  }
}

export type Filter = {
  options: FilterOption[]
  key: FilterKey
  value: null | string
}

export type ConfigurableRelationData = {
  skus: string[]
  type: string
}
type Form = 'square' | 'rectangular' | 'round' | 'oval'

export type CustomTailorType = {
  form: Form
  size: { width: number; length?: number }
  brink: { type: 'normal' | 'cuvert'; width: number }
  amount: number
} | null

type Width = { unit: string; value: number }

export type CustomTailorFullType = {
  priceSquareM: number
  shapes: Form[]
  sizes: {
    minWidth: Width
    maxWidth: Width
    minHeight: Width
    maxHeight: Width
  }
  brinks: {
    type: string
    length: number[]
    activeAt?: string[] | undefined
    additionalPricePercent?: number
  }[]
} | null

export type CustomTailorAction =
  | 'form'
  | 'size'
  | 'brink'
  | 'priceSquareM'
  | 'priceTotal'
  | 'amount'
