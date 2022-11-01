import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'
declare global {
  interface Snippets {
    'templates-PDP': {
      per_piece_text: void
      add_to_cart_btn: void
      sold_out_btn: void
      color_label: void
      size_label: void
      variant_label: void
      style_label: void
      filter_apply_btn: void
      price_range_from: void
      pdp_article_number_text: void
      pdp_article_has_specimen_text: void
      product_informations: void
      downloads: void
      productSlider_related_to: void
      series_link: {
        seriesName: string
      }
      oneToOneBundle_table_column: string
      oneToOneBundle_table_top: string
      please_customize: void
      square: void
      circle: void
      oval: void
      rectangle: void
      form_label: void
      brink_label: void
      please_choose_option: void
      width_label: void
      length_label: void
      choose_size: void
      width_in_unit: { width: string; unit: string }
      length_in_unit: { length: string; unit: string }
      desired_size: void
      normal_brink_type: void
      cuvert_brink_type: void
    }
    deliveryInfo: {
      available_furniture: void
      available: void
      available_amount: void
      unit: {
        packUnit: string
      }
      closeout_exceed: {
        stock: string
        amount: string
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
      query templates_PDP_translations {
        per_piece_text: snippet(group: "templates-PDP", name: "per_piece_text")
        pdp_article_has_specimen_text: snippet(
          group: "templates-PDP"
          name: "pdp_article_has_specimen_text"
        )
        add_to_cart_btn: snippet(
          group: "templates-PDP"
          name: "add_to_cart_btn"
        )
        sold_out_btn: snippet(group: "templates-PDP", name: "sold_out_btn")
        product_informations: snippet(
          group: "templates-PDP"
          name: "product_informations"
        )
        downloads: snippet(group: "templates-PDP", name: "downloads")
        productSlider_related_to: snippet(
          group: "templates-PDP"
          name: "productSlider_related_to"
        )
        color_label: snippet(group: "templates-PDP", name: "color_label")
        series_link: snippet(group: "templates-PDP", name: "series_link")
        variant_label: snippet(group: "templates-PDP", name: "variant_label")
        size_label: snippet(group: "templates-PDP", name: "size_label")
        style_label: snippet(group: "templates-PDP", name: "style_label")
        price_range_from: snippet(
          group: "templates-PDP"
          name: "price_range_from"
        )
        filter_apply_btn: snippet(
          group: "templates-PDP"
          name: "filter_apply_btn"
        )
        pdp_article_number_text: snippet(
          group: "templates-PDP"
          name: "pdp_article_number_text"
        )
        oneToOneBundle_table_column: snippet(
          group: "templates-PDP"
          name: "oneToOneBundle_table_column"
        )
        oneToOneBundle_table_top: snippet(
          group: "templates-PDP"
          name: "oneToOneBundle_table_top"
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
        please_customize: snippet(
          group: "templates-PDP"
          name: "please_customize"
        )
        square: snippet(group: "templates-PDP", name: "square")
        circle: snippet(group: "templates-PDP", name: "circle")
        oval: snippet(group: "templates-PDP", name: "oval")
        rectangle: snippet(group: "templates-PDP", name: "rectangle")
        form_label: snippet(group: "templates-PDP", name: "form_label")
        brink_label: snippet(group: "templates-PDP", name: "brink_label")
        please_choose_option: snippet(
          group: "templates-PDP"
          name: "please_choose_option"
        )
        width_label: snippet(group: "templates-PDP", name: "width_label")
        length_label: snippet(group: "templates-PDP", name: "length_label")
        choose_size: snippet(group: "templates-PDP", name: "choose_size")
        width_in_unit: snippet(group: "templates-PDP", name: "width_in_unit")
        length_in_unit: snippet(group: "templates-PDP", name: "length_in_unit")
        desired_size: snippet(group: "templates-PDP", name: "desired_size")
        normal_brink_type: snippet(
          group: "templates-PDP"
          name: "normal_brink_type"
        )
        cuvert_brink_type: snippet(
          group: "templates-PDP"
          name: "cuvert_brink_type"
        )
      }
    `)
  )
