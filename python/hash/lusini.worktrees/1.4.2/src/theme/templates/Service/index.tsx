import * as React from 'react'
import { graphql } from 'gatsby'
import Template from './Service'
import * as t from './types'

export default function ServiceWrapper(props: t.Props) {
  return <Template {...props} />
}

export const query = graphql`
  query ServicePageTemplate($contentfulID: String!) {
    servicePage(contentfulID: { eq: $contentfulID }) {
      urlPath
      title
      seoTitle
      seoDescription
      headline
      contentfulID
      story
      parentPage {
        title
        urlPath
        parentPage {
          title
          urlPath
        }
      }
    }
  }
`
