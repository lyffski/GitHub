export type Props = {
  pageContext: {
    contentfulID: string
  }
  data: { staticBlock: { story: any; contentfulID: string } }
  location: {
    pathname: string
    origin: string
  }
}

export type PreviewProps = {
  fields: {
    identifier: string
    story: any
  }
  contentfulID: string
}
