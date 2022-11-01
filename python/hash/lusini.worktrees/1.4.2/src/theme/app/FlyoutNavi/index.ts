import Component from './FlyoutNavi'
import { withTranslations } from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'

declare global {
  interface Snippets {
    'app-FlyoutNavi': {
      app_flyout_show_all_btn: void
    }
  }
}

export default withTranslations(Component, () =>
  useStaticQuery(graphql`
    query app_FlyoutNavi_translations {
      app_flyout_show_all_btn: snippet(
        group: "app-FlyoutNavi"
        name: "app_flyout_show_all_btn"
      )
    }
  `)
)
