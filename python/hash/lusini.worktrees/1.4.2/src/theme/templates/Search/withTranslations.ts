import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'
declare global {
  interface Snippets {
    'templates-Search': {
      mobile_search_input_placeholder: void
      search_Seo_search: void
    }
  }
}

export default (Component) =>
  withTranslations(Component, () =>
    useStaticQuery(graphql`
      query templates_Search_translations {
        mobile_search_input_placeholder: snippet(
          group: "templates-Search"
          name: "mobile_search_input_placeholder"
        )
        search_Seo_search: snippet(
          group: "templates-Search"
          name: "search_Seo_search"
        )
      }
    `)
  )
