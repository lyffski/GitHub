import Component from './Newsletter'
import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'molecules-Newsletter': {
      btn_label: void
      placeholder: void
    }
  }
}

export default withTranslations(Component, () =>
  useStaticQuery(graphql`
    query molecules_Newsletter_translations {
      btn_label: snippet(group: "molecules-Newsletter", name: "btn_label")
      placeholder: snippet(group: "molecules-Newsletter", name: "placeholder")
    }
  `)
)
