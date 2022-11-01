import * as React from 'react'
import { graphql } from 'gatsby'
import Template from './MagazineArticle'
import * as t from './types'

export default function MagazineArticle(props: t.Props) {
  return <Template {...props} />
}

export const query = graphql`
  query MagazineArticleTemplate($contentfulID: String!) {
    magazineArticle(contentfulID: { eq: $contentfulID }) {
      urlPath
      title
      seoTitle
      seoDescription
      contentfulID
      story
      teaser
      canonicalUrl
      hrefLang {
        url
        locale
      }
      relatedArticles {
        fields {
          active
          slug
          title
          teaserImageUrl {
            original_secure_url
          }
        }
      }
    }
  }
`
