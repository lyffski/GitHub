export type Props = {
  pageContext: {
    slug: string
  }
  data: {
    servicePage: {
      urlPath: string
      title: string
      seoTitle: string
      seoDescription: string
      headline: string
      contentfulID: string
      story: any
      parentPage: {
        title: string
        urlPath: string
        parentPage: {
          title: string
          urlPath: string
        }
      }
    }
  }
  location: {
    pathname: string
    origin: string
  }
  path: string
}

export type PreviewProps = {
  fields: {
    urlPath: string
    title: string
    seoTitle: string
    seoDescription: string
    headline: string
    contentfulID: string
    story: any
    parentPage: {
      title: string
      urlPath: string
      parentPage: {
        title: string
        urlPath: string
      }
    }
  }
}
