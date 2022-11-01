import Component from './CategoryHeadline'
import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'molecules-CategoryHeadline': {
      category_products_label: void
      category_link_label: void
    }
  }
}

export default withTranslations(Component, () =>
  useStaticQuery(graphql`
    query molecules_CategoryHeadline_translations {
      category_products_label: snippet(
        group: "molecules-CategoryHeadline"
        name: "category_products_label"
      )
      category_link_label: snippet(
        group: "molecules-CategoryHeadline"
        name: "category_link_label"
      )
    }
  `)
)
