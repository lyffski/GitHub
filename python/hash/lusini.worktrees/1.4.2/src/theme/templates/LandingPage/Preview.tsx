import * as React from 'react'
import Template from './LandingPage'
import config from 'config'
import * as t from './types'

export default function Preview(props: t.PreviewProps) {
  return (
    <Template
      data={{
        ...props,
        landingPage: {
          ...props.fields,
          hrefLang: config.hrefLang.map((hrefLang) => {
            const [folder, locale] = hrefLang.split('.')
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const subConfig = require(`config/${folder}/${locale}/index.js`)
            return {
              url: subConfig.baseUrl + '/' + subConfig.locale + '/',
              locale: subConfig.locale,
            }
          }),
          contentfulID: props.contentfulID,
        },
      }}
      location={{
        pathname: `/${config.locale}/`,
        origin: config.baseUrl,
      }}
      pageContext={{ contentfulID: props.contentfulID }}
    />
  )
}
