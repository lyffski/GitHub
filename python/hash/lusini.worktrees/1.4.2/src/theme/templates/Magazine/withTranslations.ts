import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'templates-Magazine': {
      headline: void
      seo_description: void
      to_magazine_article: void
      related_article_headline: void
    }
  }
}

export default (Component) =>
  withTranslations(Component, () =>
    useStaticQuery(graphql`
      query templates_Maazine_translations {
        headline: snippet(group: "templates-Magazine", name: "headline")
        related_article_headline: snippet(
          group: "templates-Magazine"
          name: "related_article_headline"
        )
        seo_description: snippet(
          group: "templates-Magazine"
          name: "seo_description"
        )
        to_magazine_article: snippet(
          group: "templates-Magazine"
          name: "to_magazine_article"
        )
      }
    `)
  )
