import Component from './Flags'
import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'molecules-Flags': {
      new: void
      discount: void
      sale: void
      series: void
    }
  }
}

export default withTranslations(Component, () =>
  useStaticQuery(graphql`
    query molecules_Flags_translations {
      new: snippet(group: "molecules-Flags", name: "new")
      discount: snippet(group: "molecules-Flags", name: "discount")
      sale: snippet(group: "molecules-Flags", name: "sale")
      series: snippet(group: "molecules-Flags", name: "series")
    }
  `)
)
