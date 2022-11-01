export type Product = {
  objectID: string
  sku: string
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
    referencePriceNetString: null | string
    referencePriceGrossString: null | string
    discountGroup: null | string
    piecePriceNetString: null | string
    piecePriceGrossString: null | string
    productCheapestPiecePriceNet: null | number
    productCheapestPiecePriceGross: null | number
    productMostexpensivePiecePriceNet: null | number
    productMostexpensivePiecePriceGross: null | number
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
    referencePriceNetString: null | string
    referencePriceGrossString: null | string
    discountGroup: null | string
    piecePriceNetString: null | string
    piecePriceGrossString: null | string
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
  title: string
  subtitle: string
  variantData: Record<
    'color' | 'size' | 'variant' | 'style',
    {
      label?: string | null
      image?: string
    }
  >

  brand: string
  unit: {
    unitName: string
    purchaseUnit: number
    referenceUnit: number
    packUnit: string
  }
  variantImages: string[]
  flags: string[]
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
  stock: number
  deliveryDate: string | null
  deliveryDays: number | null
  specialDelivery: boolean
  sellOut: boolean
  sellable?: boolean
}

export type Index = 'default' | 'price-asc'

export type FilterValues = {
  page: number
  query: string
  category: string
  minPrice: number | null
  maxPrice: number | null
  index: Index
  mode: 'SELLABLE' | 'ACTIVE'
  productLine: string
  distinct: boolean
  flags: string[]
  attributes: Record<string, string[]>
  numericAttributes: Record<string, Range>
  skus: string[]
  configurableProduct: boolean
  analyticTags: string[]
}

export type SearchOption = 'page' | 'query' | 'brand' | 'index'

export type FacetOption = {
  label: string
  nbHits: number
}

export type Facet = {
  key: string
  options: FacetOption[]
  value: string[]
  label: string
  filtertype: string
  unit?: string
}

export type NumericFacet = {
  key: string
  options: Range
  value: Range
  label: string
  filtertype: string
  unit?: string
}

export type CategoryOption = {
  count: number
  data: CategoryOption[] | null
  exhaustive: boolean
  isRefined: boolean
  name: string
  /** e.g Besteck > Gabel > Menügabel */
  path: string
  /** e.g /category/besteck/gabel/menuegabel */
  urlPath: string
}

export type Range = { min: number | null; max: number | null }

export namespace api {
  export type Fetch = {
    hits: Product[]
    nbPages: number
    facets: Record<string, FacetOption[]>
    numericFacets: Record<string, Range | null>
    categoryTree: Array<CategoryOption>
    page: number
    minPrice: number
    maxPrice: number
    nbHits: number
  }
}

export type Page = {
  page: number
  nbPages: number
}

export type FilterInfo = {
  key: string
  label: string
  type: string
  unit?: string
}
