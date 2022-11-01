export type Props = {
  pageContext: {
    contentfulID: string
  }
  data: {
    landingPage: {
      urlPath: string
      title: string
      seoTitle: string
      seoDescription: string
      canonicalUrl: string
      contentfulID: string
      story: any
      hrefLang: {
        url: string
        locale: string
      }[]
    }
  }
  location: {
    pathname: string
    origin: string
  }
}

export type PreviewProps = {
  fields: {
    urlPath: string
    title: string
    seoTitle: string
    seoDescription: string
    canonicalUrl: string
    story: any
    hrefLang: {
      url: string
      locale: string
    }[]
  }
  contentfulID: string
}
