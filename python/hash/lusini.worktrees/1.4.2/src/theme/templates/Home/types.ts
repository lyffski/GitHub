export type Props = {
  data: {
    staticBlock: {
      story: any
      contentfulID: string
      title: string
      description: string
    }
  }
  location: {
    pathname: string
    origin: string
  }
  pageContext: {
    hrefLang: {
      url: string
      locale: string
    }[]
  }
}

export type PreviewProps = {
  fields: {
    title: string
    description: string
    identifier: string
    story: any
  }
  contentfulID: string
}
