import * as React from 'react'
import { graphql } from 'gatsby'
import Template from './Home'
import * as t from './types'

export default function HomeWrapper(props: t.Props) {
  return <Template {...props} />
}

export const query = graphql`
  query HomepageBlock {
    staticBlock(identifier: { eq: "homepage-block" }) {
      story
      contentfulID
      title
      description
    }
  }
`
