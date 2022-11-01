import Component from './ListingCategoryTree'
import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'molecules-ListingCategoryTree': {
      category_side_nav_back_link: {
        categoryname: string | number
      }
      category_side_nav_back_link_fallback: void
      category_side_nav_default_title: void
    }
  }
}

export default withTranslations(Component, () =>
  useStaticQuery(graphql`
    query molecules_ListingCategoryTree_translations {
      category_side_nav_back_link: snippet(
        group: "molecules-ListingCategoryTree"
        name: "category_side_nav_back_link"
      )
      category_side_nav_back_link_fallback: snippet(
        group: "molecules-ListingCategoryTree"
        name: "category_side_nav_back_link_fallback"
      )
      category_side_nav_default_title: snippet(
        group: "molecules-ListingCategoryTree"
        name: "category_side_nav_default_title"
      )
    }
  `)
)
