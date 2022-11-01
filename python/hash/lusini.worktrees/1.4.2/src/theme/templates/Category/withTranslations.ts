import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'templates-Category': {
      category_no_hits_below: void
      category_title_below: {
        numHits: string | number
        categoryName: string
      }
      series_title: {
        numHits: string | number
      }
      default_title_text: string
      default_description_text: string
    }
  }
}

export default (Component) =>
  withTranslations(Component, () =>
    useStaticQuery(graphql`
      query templates_Category_translations {
        category_title_below: snippet(
          group: "templates-Category"
          name: "category_title_below"
        )
        default_title_text: snippet(
          group: "templates-Category"
          name: "default_title_text"
        )
        default_description_text: snippet(
          group: "templates-Category"
          name: "default_description_text"
        )
        category_no_hits_below: snippet(
          group: "templates-Category"
          name: "category_no_hits_below"
        )
        series_title: snippet(group: "templates-Category", name: "series_title")
      }
    `)
  )
