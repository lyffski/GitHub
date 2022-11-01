import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'templates-Series': {
      listing_title: {
        seriesName: string
      }
      cart_btn_label: void
      sold_out_btn_series: void
      sku_piece_price_label: void
      sku_article_number_label: void
      sku_detail_link: void
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
      query templates_Series_translations {
        listing_title: snippet(group: "templates-Series", name: "listing_title")
        cart_btn_label: snippet(
          group: "templates-Series"
          name: "cart_btn_label"
        )
        sold_out_btn_series: snippet(
          group: "templates-Series"
          name: "sold_out_btn_series"
        )
        sku_piece_price_label: snippet(
          group: "templates-Series"
          name: "sku_piece_price_label"
        )
        sku_article_number_label: snippet(
          group: "templates-Series"
          name: "sku_article_number_label"
        )
        sku_detail_link: snippet(
          group: "templates-Series"
          name: "sku_detail_link"
        )
        available_amount: snippet(
          group: "deliveryInfo"
          name: "available_amount"
        )
        available_furniture: snippet(
          group: "deliveryInfo"
          name: "available_furniture"
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
