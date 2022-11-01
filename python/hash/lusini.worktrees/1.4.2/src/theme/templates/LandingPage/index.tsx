import * as React from 'react'
import Template from './LandingPage'
import { graphql } from 'gatsby'
import * as t from './types'

export default function LandingPageWrapper(props: t.Props) {
  return <Template {...props} />
}

export const query = graphql`
  query LandingPageTemplate($contentfulID: String!) {
    landingPage(contentfulID: { eq: $contentfulID }) {
      urlPath
      title
      seoTitle
      seoDescription
      contentfulID
      canonicalUrl
      story
      hrefLang {
        url
        locale
      }
    }
  }
`
