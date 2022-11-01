import * as React from 'react'
import { graphql } from 'gatsby'
import Template from './TagCategory'
import * as t from './types'

export default function TagCategory(props: t.Props) {
  return <Template {...props} />
}

export const query = graphql`
  query TagCategoryTemplate($contentfulID: String!, $tag: String!) {
    tagCategory(contentfulID: { eq: $contentfulID }) {
      tag
      contentfulID
      story
      title
      canonicalUrl
      urlPath
      seoTitle
      seoDescription
      hrefLang {
        url
        locale
      }
    }
    existingPaths: allTagCategory(filter: { tag: { eq: $tag } }) {
      nodes {
        categoryPath
        urlPath
      }
    }
  }
`
