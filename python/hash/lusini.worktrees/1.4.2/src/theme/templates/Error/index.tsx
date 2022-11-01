import * as React from 'react'
import Template from './Error'
import { graphql } from 'gatsby'
import * as t from './types'

export default function LandingPageWrapper(props: t.Props) {
  return <Template {...props} />
}

export const query = graphql`
  query ErrorBlock {
    staticBlock(identifier: { eq: "error-block" }) {
      story
      contentfulID
    }
  }
`
