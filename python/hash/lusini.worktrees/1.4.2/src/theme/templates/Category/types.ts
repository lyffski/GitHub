export type CategoryCrumb = {
  label: string
  urlPath: string
  parent: null | CategoryCrumb
  categoryLevel: number
}

export type Props = {
  pageContext: {
    objectID: string
  }
  location: {
    origin: string
    pathname: string
  }
  data: {
    category: {
      noIndex: boolean
      hrefLang: {
        url: string
        locale: string
      }[]
      title: string
      brand: string | null
      seoTitle: string
      seoText: string
      seoDescription: string
      label: string
      story: any
      canonicalUrl: string
      path: string
      urlPath: string
      parent: CategoryCrumb
      contentfulID: string
      hasSeries: boolean
      categoryLevel: number
    }
  }
}
