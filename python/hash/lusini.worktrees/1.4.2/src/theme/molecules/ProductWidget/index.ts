import Component from './ProductWidget'
import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'molecules-ProductWidget': {
      from_price: void
      per_piece_label: string
    }
  }
}

export default withTranslations(Component, () =>
  useStaticQuery(graphql`
    query molecules_ProductWidget_translations {
      per_piece_label: snippet(
        group: "molecules-ProductWidget"
        name: "per_piece_label"
      )
      from_price: snippet(group: "molecules-ProductWidget", name: "from_price")
    }
  `)
)
