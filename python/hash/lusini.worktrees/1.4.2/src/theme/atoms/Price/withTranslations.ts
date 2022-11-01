import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    prices: {
      incl_tax: void
      excl_tax: void
      eco_tax: {
        ecoTax: string
      }
      excl_delivery_costs: void
      from: void
      to: void
    }
  }
}

export default (Component) =>
  withTranslations(Component, () =>
    useStaticQuery(graphql`
      query prices_translations {
        incl_tax: snippet(group: "prices", name: "incl_tax")
        excl_tax: snippet(group: "prices", name: "excl_tax")
        eco_tax: snippet(group: "prices", name: "eco_tax")
        excl_delivery_costs: snippet(
          group: "prices"
          name: "excl_delivery_costs"
        )
        from: snippet(group: "prices", name: "from")
        to: snippet(group: "prices", name: "to")
      }
    `)
  )
