export type Props = {
  location: {
    pathname: string
    origin: string
  }
  data: {
    staticBlock: {
      story: any
      contentfulID: string
    }
    articles: {
      nodes: {
        title: string
        urlPath: string
        teaserImageUrl: string
        shortenedTeaser: string
      }[]
      pageInfo: {
        currentPage: number
        pageCount: number
        hasNextPage: boolean
        hasPreviousPage: boolean
      }
    }
  }
}

export type PreviewProps = {
  fields: {
    story: any
    contentfulID: string
  }
}
