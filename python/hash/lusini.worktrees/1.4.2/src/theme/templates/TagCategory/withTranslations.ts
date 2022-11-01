import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'templates-Tag-Category': {
      tag_category_no_hits_below: void
      tag_category_title_below: {
        numHits: string | number
        categoryName: string
      }
    }
  }
}

export default (Component) =>
  withTranslations(Component, () =>
    useStaticQuery(graphql`
      query templates_Tag_Category_translations {
        tag_category_title_below: snippet(
          group: "templates-Category"
          name: "category_title_below"
        )
        tag_category_no_hits_below: snippet(
          group: "templates-Category"
          name: "category_no_hits_below"
        )
      }
    `)
  )
