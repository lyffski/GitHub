import * as React from 'react'
import { graphql } from 'gatsby'
import Template from './Magazine'
import * as t from './types'

export default function MagazineWrapper(props: t.Props) {
  return <Template {...props} />
}

export const query = graphql`
  query MagazineTemplate($limit: Int!, $skip: Int!, $hideStory: Boolean!) {
    staticBlock(identifier: { eq: "magazine-overview" }) @skip(if: $hideStory) {
      story
      contentfulID
    }
    articles: allMagazineArticle(limit: $limit, skip: $skip) {
      nodes {
        title
        urlPath
        teaserImageUrl
        shortenedTeaser
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        pageCount
      }
    }
  }
`
