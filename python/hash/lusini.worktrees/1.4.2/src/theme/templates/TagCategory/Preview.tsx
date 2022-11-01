import * as React from 'react'
import Template from './TagCategory'
import * as t from './types'
import config from 'config'

export default function Preview(props: t.PreviewProps) {
  return (
    <Template
      data={{ tagCategory: props.fields, existingPaths: { nodes: [] } }}
      location={{
        pathname: `/${config.locale}/`,
        origin: config.baseUrl,
      }}
    />
  )
}
