import * as React from 'react'
import { graphql } from 'gatsby'
import Template from './Category'
import * as t from './types'

export default function CategoryWrapper(props: t.Props) {
  return <Template {...props} />
}

export const query = graphql`
  query CategoryTemplate($objectID: String!) {
    category(objectID: { eq: $objectID }) {
      noIndex
      title
      seoTitle
      brand
      seoText
      seoDescription
      label
      story
      hasSeries
      canonicalUrl
      path
      contentfulID
      urlPath
      categoryLevel
      hrefLang {
        url
        locale
      }
      parent {
        ... on Category {
          label
          categoryLevel
          urlPath
          parent {
            ... on Category {
              label
              categoryLevel
              urlPath
              parent {
                ... on Category {
                  label
                  categoryLevel
                  urlPath
                  parent {
                    ... on Category {
                      label
                      categoryLevel
                      urlPath
                      parent {
                        ... on Category {
                          label
                          categoryLevel
                          urlPath
                          parent {
                            ... on Category {
                              label
                              categoryLevel
                              urlPath
                              parent {
                                ... on Category {
                                  label
                                  categoryLevel
                                  urlPath
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
