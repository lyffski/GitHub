import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'partials-FlyoutCart': {
      last_added: void
      products_in_cart: {
        productsCount: string | number
      }
      total_label: void
      flyoutcart_price_with_tax: {
        totalBrutto: string | number
      }
      to_checkout_btn: void
      flyoutcart_headline_text: void
      flyoutcart_per_piece: void
      flyoutcart_amount: void
      flyoutcart_slider_title: void
    }
  }
}

export default (Component) =>
  withTranslations(Component, () =>
    useStaticQuery(graphql`
      query partials_FlyoutCart_translations {
        last_added: snippet(group: "partials-FlyoutCart", name: "last_added")
        total_label: snippet(group: "partials-FlyoutCart", name: "total_label")
        flyoutcart_price_with_tax: snippet(
          group: "partials-FlyoutCart"
          name: "flyoutcart_price_with_tax"
        )
        to_checkout_btn: snippet(
          group: "partials-FlyoutCart"
          name: "to_checkout_btn"
        )
        flyoutcart_headline_text: snippet(
          group: "partials-FlyoutCart"
          name: "flyoutcart_headline_text"
        )
        flyoutcart_per_piece: snippet(
          group: "partials-FlyoutCart"
          name: "flyoutcart_per_piece"
        )
        flyoutcart_amount: snippet(
          group: "partials-FlyoutCart"
          name: "flyoutcart_amount"
        )

        products_in_cart: snippet(
          group: "partials-FlyoutCart"
          name: "products_in_cart"
        )
        flyoutcart_slider_title: snippet(
          group: "partials-FlyoutCart"
          name: "flyoutcart_slider_title"
        )
      }
    `)
  )
