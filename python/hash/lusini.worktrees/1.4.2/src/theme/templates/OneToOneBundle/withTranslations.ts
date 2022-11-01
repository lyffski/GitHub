import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'templates-OneToOneBundle': {
      page_headline: string
      configbox_default_text: string
      configbox_delete: string
      buy_box_add_to_cart: string
      buy_box_add_to_cart_disabled: string
      buy_box_price_info: string
      buy_box_tax: string
      buy_box_delivery: string
    }
    deliveryInfo: {
      available_furniture: void
      available: void
      available_amount: void
      closeout_exceed: {
        stock: string
        amount: string
      }
      unit: {
        packUnit: string
      }
      shippable_with_reduced_stock: {
        stock: string
      }
      shippable_soon: {
        stock: string
      }
      shippable_currently_not: void
      full_delivery_at_date_weeks: {
        stock: string
        weeks: string
      }
      full_delivery_at_date_months: {
        stock: string
        months: string
      }
      no_stock_with_delivery_in_weeks: {
        weeks: string
      }
      no_stock_with_delivery_in_months: {
        months: string
      }
    }
  }
}

export default (Component) =>
  withTranslations(Component, () =>
    useStaticQuery(graphql`
      query templates_OneToOneBundle_translations {
        page_headline: snippet(
          group: "templates-OneToOneBundle"
          name: "page_headline"
        )
        configbox_default_text: snippet(
          group: "templates-OneToOneBundle"
          name: "configbox_default_text"
        )
        configbox_delete: snippet(
          group: "templates-OneToOneBundle"
          name: "configbox_delete"
        )
        buy_box_add_to_cart: snippet(
          group: "templates-OneToOneBundle"
          name: "buy_box_add_to_cart"
        )
        buy_box_add_to_cart_disabled: snippet(
          group: "templates-OneToOneBundle"
          name: "buy_box_add_to_cart_disabled"
        )
        buy_box_price_info: snippet(
          group: "templates-OneToOneBundle"
          name: "buy_box_price_info"
        )
        buy_box_tax: snippet(
          group: "templates-OneToOneBundle"
          name: "buy_box_tax"
        )
        buy_box_delivery: snippet(
          group: "templates-OneToOneBundle"
          name: "buy_box_delivery"
        )

        available_furniture: snippet(
          group: "deliveryInfo"
          name: "available_furniture"
        )
        available_amount: snippet(
          group: "deliveryInfo"
          name: "available_amount"
        )
        available: snippet(group: "deliveryInfo", name: "available")
        closeout_exceed: snippet(group: "deliveryInfo", name: "closeout_exceed")
        shippable_with_reduced_stock: snippet(
          group: "deliveryInfo"
          name: "shippable_with_reduced_stock"
        )
        shippable_soon: snippet(group: "deliveryInfo", name: "shippable_soon")
        shippable_currently_not: snippet(
          group: "deliveryInfo"
          name: "shippable_currently_not"
        )
        full_delivery_at_date_weeks: snippet(
          group: "deliveryInfo"
          name: "full_delivery_at_date_weeks"
        )
        full_delivery_at_date_months: snippet(
          group: "deliveryInfo"
          name: "full_delivery_at_date_months"
        )
        no_stock_with_delivery_in_weeks: snippet(
          group: "deliveryInfo"
          name: "no_stock_with_delivery_in_weeks"
        )
        no_stock_with_delivery_in_months: snippet(
          group: "deliveryInfo"
          name: "no_stock_with_delivery_in_months"
        )
      }
    `)
  )
