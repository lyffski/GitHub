import Component from './Footer'
import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'
declare global {
  interface Snippets {
    'app-Footer': {
      app_footer_contact_hotline: void
      app_footer_phone: void
      app_footer_opening: void
      copyright: void
      bottomLine_b2c: void
      bottomLine_b2b: void
      social_icons_headline: void
      footer_column_helpandservice: void
      footer_column_about: void
      footer_column_advantages: void
      best_shop_info: void
      catalog_headline: void
      catalog_button: void
      payment_invoice: void
      payment_prepayment: void
      payment_cash_on_delivery: void
      payment_paypal_partial_payment: void
      payment_paypal_invoice: void
      brands_headline: void
      country_switch_de: void
      country_switch_at: void
      country_switch_ch_de: void
      country_switch_ch_fr: void
      country_switch_dk: void
      country_switch_int: void
      country_switch_es: void
      country_switch_fr: void
      country_switch_be_fr: void
      country_switch_be_nl: void
      country_switch_it: void
      country_switch_no: void
      country_switch_nl: void
      country_switch_se: void
    }
  }
}

export default withTranslations(Component, () =>
  useStaticQuery(graphql`
    query app_Footer_translations {
      footer_column_helpandservice: snippet(
        group: "app-Footer"
        name: "footer_column_helpandservice"
      )

      footer_column_about: snippet(
        group: "app-Footer"
        name: "footer_column_about"
      )

      footer_column_advantages: snippet(
        group: "app-Footer"
        name: "footer_column_advantages"
      )

      app_footer_contact_hotline: snippet(
        group: "app-Footer"
        name: "app_footer_contact_hotline"
      )

      app_footer_phone: snippet(group: "app-Footer", name: "app_footer_phone")
      app_footer_opening: snippet(
        group: "app-Footer"
        name: "app_footer_opening"
      )
      copyright: snippet(group: "app-Footer", name: "copyright")
      bottomLine_b2b: snippet(group: "app-Footer", name: "bottomLine_b2b")
      bottomLine_b2c: snippet(group: "app-Footer", name: "bottomLine_b2c")
      social_icons_headline: snippet(
        group: "app-Footer"
        name: "social_icons_headline"
      )
      best_shop_info: snippet(group: "app-Footer", name: "best_shop_info")
      catalog_headline: snippet(group: "app-Footer", name: "catalog_headline")
      catalog_button: snippet(group: "app-Footer", name: "catalog_button")

      payment_invoice: snippet(group: "app-Footer", name: "payment_invoice")
      payment_prepayment: snippet(
        group: "app-Footer"
        name: "payment_prepayment"
      )
      payment_cash_on_delivery: snippet(
        group: "app-Footer"
        name: "payment_cash_on_delivery"
      )
      payment_paypal_partial_payment: snippet(
        group: "app-Footer"
        name: "payment_paypal_partial_payment"
      )
      payment_paypal_invoice: snippet(
        group: "app-Footer"
        name: "payment_paypal_invoice"
      )
      brands_headline: snippet(group: "app-Footer", name: "brands_headline")

      country_switch_de: snippet(group: "app-Footer", name: "country_switch_de")
      country_switch_at: snippet(group: "app-Footer", name: "country_switch_at")
      country_switch_ch_de: snippet(
        group: "app-Footer"
        name: "country_switch_ch_de"
      )
      country_switch_ch_fr: snippet(
        group: "app-Footer"
        name: "country_switch_ch_fr"
      )
      country_switch_dk: snippet(group: "app-Footer", name: "country_switch_dk")
      country_switch_int: snippet(
        group: "app-Footer"
        name: "country_switch_int"
      )
      country_switch_es: snippet(group: "app-Footer", name: "country_switch_es")
      country_switch_fr: snippet(group: "app-Footer", name: "country_switch_fr")
      country_switch_be_fr: snippet(
        group: "app-Footer"
        name: "country_switch_be_fr"
      )
      country_switch_be_nl: snippet(
        group: "app-Footer"
        name: "country_switch_be_nl"
      )
      country_switch_it: snippet(group: "app-Footer", name: "country_switch_it")
      country_switch_no: snippet(group: "app-Footer", name: "country_switch_no")
      country_switch_nl: snippet(group: "app-Footer", name: "country_switch_nl")
      country_switch_se: snippet(group: "app-Footer", name: "country_switch_se")
    }
  `)
)
