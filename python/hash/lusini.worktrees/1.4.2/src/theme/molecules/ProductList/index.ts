import Component from './ProductList'
import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'molecules-ProductList': {
      no_hits_info: void
      no_hits_reset_btn: void
      no_hits_headline: {
        query: string
      }
      category_side_nav_back_link: {
        categoryname: string
      }
    }
  }
}

{
  /*TO DO PREISFILTER B2B B2C Textbausteine*/
}

export default withTranslations(Component, () =>
  useStaticQuery(graphql`
    query molecules_ProductList_translations {
      no_hits_info: snippet(
        group: "molecules-ProductList"
        name: "no_hits_info"
      )
      no_hits_headline: snippet(
        group: "molecules-ProductList"
        name: "no_hits_headline"
      )
      no_hits_reset_btn: snippet(
        group: "molecules-ProductList"
        name: "no_hits_reset_btn"
      )
      category_side_nav_back_link: snippet(
        group: "molecules-ProductList"
        name: "category_side_nav_back_link"
      )
    }
  `)
)
