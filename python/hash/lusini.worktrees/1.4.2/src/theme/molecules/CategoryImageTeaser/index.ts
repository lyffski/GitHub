import Component from './CategoryImageTeaser'
import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'molecules-CategoryImageTeaser': {
      categoryImageTeaser_products_label: void
      categoryImageTeaser_series_label: void
      categoryImageTeaser_link_label: void
    }
  }
}

export default withTranslations(Component, () =>
  useStaticQuery(graphql`
    query molecules_CategoryImageTeaser_translations {
      categoryImageTeaser_products_label: snippet(
        group: "molecules-CategoryImageTeaser"
        name: "categoryImageTeaser_products_label"
      )
      categoryImageTeaser_series_label: snippet(
        group: "molecules-CategoryImageTeaser"
        name: "categoryImageTeaser_series_label"
      )
      categoryImageTeaser_link_label: snippet(
        group: "molecules-CategoryImageTeaser"
        name: "categoryImageTeaser_link_label"
      )
    }
  `)
)
