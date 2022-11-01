import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'organisms-Category': {
      series_reference_title_example: {
        title: string
      }
      series_per_piece_label: {
        unit: string
      }
      series_from_price: void
    }
  }
}

export default (Component) =>
  withTranslations(Component, () =>
    useStaticQuery(graphql`
      query organisms_Category_translations {
        series_reference_title_example: snippet(
          group: "organisms-Category"
          name: "series_reference_title_example"
        )
        series_per_piece_label: snippet(
          group: "organisms-Category"
          name: "series_per_piece_label"
        )
        series_from_price: snippet(
          group: "organisms-Category"
          name: "series_from_price"
        )
      }
    `)
  )
