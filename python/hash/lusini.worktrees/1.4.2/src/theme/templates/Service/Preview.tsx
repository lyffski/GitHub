import * as React from 'react'
import Template from './Service'
import * as t from './types'
import config from 'config'

export default function Preview(props: t.PreviewProps) {
  return (
    <Template
      data={{ servicePage: props.fields }}
      location={{
        pathname: `/${config.locale}/`,
        origin: config.baseUrl,
      }}
      pageContext={{
        slug: '',
      }}
      path={`/${config.locale}/`}
    />
  )
}
