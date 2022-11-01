import Component from './Header'
import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'app-Header': {
      header_b2c_switch_link_label: void
      header_b2b_switch_link_label: void
      header_hotline_text: void
      header_phone_number: void
      header_office_hours: void
      header_more_label_btn: void
      header_search_input_placeholder: void
      header_topline_customer_switch_headline: void
      header_topline_customer_switch_description: void
      header_topline_customer_switch_privat_yes: void
      header_topline_customer_switch_privat_no: void
    }
  }
}

export default withTranslations(Component, () =>
  useStaticQuery(graphql`
    query app_Header_translations {
      header_b2c_switch_link_label: snippet(
        group: "app-Header"
        name: "header_b2c_switch_link_label"
      )
      header_b2b_switch_link_label: snippet(
        group: "app-Header"
        name: "header_b2b_switch_link_label"
      )
      header_hotline_text: snippet(
        group: "app-Header"
        name: "header_hotline_text"
      )
      header_phone_number: snippet(
        group: "app-Header"
        name: "header_phone_number"
      )
      header_office_hours: snippet(
        group: "app-Header"
        name: "header_office_hours"
      )
      header_more_label_btn: snippet(
        group: "app-Header"
        name: "header_more_label_btn"
      )
      header_search_input_placeholder: snippet(
        group: "app-Header"
        name: "header_search_input_placeholder"
      )

      header_topline_customer_switch_headline: snippet(
        group: "app-Header"
        name: "header_topline_customer_switch_headline"
      )
      header_topline_customer_switch_description: snippet(
        group: "app-Header"
        name: "header_topline_customer_switch_description"
      )
      header_topline_customer_switch_privat_yes: snippet(
        group: "app-Header"
        name: "header_topline_customer_switch_privat_yes"
      )
      header_topline_customer_switch_privat_no: snippet(
        group: "app-Header"
        name: "header_topline_customer_switch_privat_no"
      )
    }
  `)
)
