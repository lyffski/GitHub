export type Props = {
  location: any
  data: {
    tagCategory: {
      tag: string
      contentfulID: string
      story: any
      title: string
      canonicalUrl: string
      urlPath: string
      seoTitle: string
      seoDescription: string
      hrefLang: {
        url: string
        locale: string
      }[]
    }
    existingPaths: {
      nodes: {
        categoryPath: string
        urlPath: string
      }[]
    }
  }
}

export type PreviewProps = {
  fields: {
    tag: string
    contentfulID: string
    story: any
    title: string
    canonicalUrl: string
    urlPath: string
    seoTitle: string
    seoDescription: string
    hrefLang: {
      url: string
      locale: string
    }[]
  }
}
