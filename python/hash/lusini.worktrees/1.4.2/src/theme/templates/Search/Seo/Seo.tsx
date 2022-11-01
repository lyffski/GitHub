import * as React from 'react'
import SeoAtom from 'theme/atoms/SEO'
import { useSearchValue } from 'modules/ui'
import config from 'config'
import useTranslations from 'hooks/useTranslations'
import withTranslations from 'theme/templates/Search/withTranslations'

type Props = {
  location: {
    pathname: string
    origin: string
  }
  initialSearchValue: string
}

export default withTranslations(function Seo(props: Props) {
  const searchValue = useSearchValue().data
  const t = useTranslations<'templates-Search'>()
  const text = t.asText(false, 'search_Seo_search')
  return (
    <SeoAtom
      location={props.location}
      title={text + searchValue || props.initialSearchValue}
      description=""
      type="website"
      noFollow={config.features.seoNoFollow}
    />
  )
})
