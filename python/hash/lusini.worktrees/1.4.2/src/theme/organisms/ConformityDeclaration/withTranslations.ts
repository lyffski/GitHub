import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    organisms_forms_conformity_declaration: {
      firstname: void
      surname: void
      email: void
      product_name: void
      article_number: void
      form_description: void
      submit: void
    }
  }
}

export default (Component) =>
  withTranslations(Component, () =>
    useStaticQuery(graphql`
      query forms_conformity_declaration_translations {
        firstname: snippet(
          group: "organisms_forms_conformity_declaration"
          name: "firstname"
        )
        surname: snippet(
          group: "organisms_forms_conformity_declaration"
          name: "surname"
        )
        email: snippet(
          group: "organisms_forms_conformity_declaration"
          name: "email"
        )
        product_name: snippet(
          group: "organisms_forms_conformity_declaration"
          name: "product_name"
        )
        article_number: snippet(
          group: "organisms_forms_conformity_declaration"
          name: "article_number"
        )
        form_description: snippet(
          group: "organisms_forms_conformity_declaration"
          name: "form_description"
        )
        submit: snippet(
          group: "organisms_forms_conformity_declaration"
          name: "submit"
        )
      }
    `)
  )
