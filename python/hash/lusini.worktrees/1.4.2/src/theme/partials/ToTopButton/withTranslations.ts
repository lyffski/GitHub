import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'partials-toTopButton': {
      label: string
    }
  }
}

export default (Component) =>
  withTranslations(Component, () =>
    useStaticQuery(graphql`
      query partials_ToTopButton_translations {
        label: snippet(group: "partials-toTopButton", name: "label")
      }
    `)
  )
