export type SeriesContainer = {
  objectID: string
  title: string
  description: string
  brand: string
  images: {
    imageWeb: {
      url: string
      classes: ('ASSET_M' | 'ASSET_FS')[]
    }[]
  }
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
}

export namespace api {
  export type Fetch = {
    container: SeriesContainer
    filters: {
      label: string
      key: string
      filtertype: string
    }[]
  }
}
