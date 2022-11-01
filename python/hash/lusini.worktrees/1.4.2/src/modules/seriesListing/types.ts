export type Hit = {
  objectID: string
  title: string
  brand: string
  images: {
    imageWeb: {
      url: string
      classes: ('ASSET_M' | 'ASSET_FS' | 'EMG')[]
    }[]
  }
  referenceSku: {
    sku_uuid: string
    product_type: string
    sorting: number
    sellable: boolean
    sku_title: string
    ecoTaxNet: null
    ecoTaxGross: null
    piecePriceNet: number
    piecePriceGross: number
    packPriceNet: number
    packPriceGross: number
    packPseudoPriceNet: number
    packPseudoPriceGross: number
    piecePseudoPriceNet: number
    piecePseudoPriceGross: number
    referencePriceNet: number | null
    referencePriceGross: number | null
    piecePriceNetString: string | null
    piecePriceGrossString: string | null
    referencePriceNetString: string | null
    referencePriceGrossString: string | null
    unitName: string | null
    packUnit: string | null
    referenceUnit: number | null
    purchaseUnit: number | null
  } | null
}

export type FilterValues = {
  categoryId: string
  page: number
  categoryPath: string
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

export namespace api {
  export type Fetch = {
    hits: Hit[]
    nbPages: number
    categoryTree: Array<CategoryOption>
    page: number
    nbHits: number
  }
}
