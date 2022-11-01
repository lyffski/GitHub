import Component from './ListingFilter'
import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'molecules-ListingFilter': {
      use_selected_filter_btn: void
      price_filter_headline: void
      color_filter_headline: void
      style_filter_headline: void
      size_filter_headline: void
      variant_filter_headline: void
      brand_filter_headline: void
      sorting_filter_btn: void
      sorting_filter_best_results: void
      sorting_filter_lowest_price: void
      category_filter_color_btn: void
      category_filter_size_btn: void
      category_filter_variant_btn: void
      category_filter_all_filters_btn: void
      reset_selected_filters_btn: void
      from_unit_selected_filters: {
        unit: string
      }
      to_unit_selected_filters: {
        unit: string
      }
    }
  }
}

{
  /*TO DO PREISFILTER B2B B2C Textbausteine*/
}

export default withTranslations(Component, () =>
  useStaticQuery(graphql`
    query molecules_ListingFilter_translations {
      use_selected_filter_btn: snippet(
        group: "molecules-ListingFilter"
        name: "use_selected_filter_btn"
      )
      color_filter_headline: snippet(
        group: "molecules-ListingFilter"
        name: "color_filter_headline"
      )
      price_filter_headline: snippet(
        group: "molecules-ListingFilter"
        name: "price_filter_headline"
      )
      size_filter_headline: snippet(
        group: "molecules-ListingFilter"
        name: "size_filter_headline"
      )
      style_filter_headline: snippet(
        group: "molecules-ListingFilter"
        name: "style_filter_headline"
      )
      variant_filter_headline: snippet(
        group: "molecules-ListingFilter"
        name: "variant_filter_headline"
      )
      brand_filter_headline: snippet(
        group: "molecules-ListingFilter"
        name: "brand_filter_headline"
      )
      sorting_filter_btn: snippet(
        group: "molecules-ListingFilter"
        name: "sorting_filter_btn"
      )
      sorting_filter_best_results: snippet(
        group: "molecules-ListingFilter"
        name: "sorting_filter_best_results"
      )
      sorting_filter_lowest_price: snippet(
        group: "molecules-ListingFilter"
        name: "sorting_filter_lowest_price"
      )
      category_filter_color_btn: snippet(
        group: "molecules-ListingFilter"
        name: "category_filter_color_btn"
      )
      category_filter_size_btn: snippet(
        group: "molecules-ListingFilter"
        name: "category_filter_size_btn"
      )
      category_filter_variant_btn: snippet(
        group: "molecules-ListingFilter"
        name: "category_filter_variant_btn"
      )
      category_filter_all_filters_btn: snippet(
        group: "molecules-ListingFilter"
        name: "category_filter_all_filters_btn"
      )
      reset_selected_filters_btn: snippet(
        group: "molecules-ListingFilter"
        name: "reset_selected_filters_btn"
      )
      from_unit_selected_filters: snippet(
        group: "molecules-ListingFilter"
        name: "from_unit_selected_filters"
      )
      to_unit_selected_filters: snippet(
        group: "molecules-ListingFilter"
        name: "to_unit_selected_filters"
      )
    }
  `)
)
