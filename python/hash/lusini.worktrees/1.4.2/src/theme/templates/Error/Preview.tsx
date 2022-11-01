import * as React from 'react'
import Template from './Error'
import config from 'config'
import * as t from './types'

export default function Preview(props: t.PreviewProps) {
  return (
    <Template
      data={{
        staticBlock: {
          story: props.fields.story,
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
