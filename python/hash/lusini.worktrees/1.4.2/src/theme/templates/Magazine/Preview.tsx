import * as React from 'react'
import Template from './Magazine'
import * as t from './types'
import config from 'config'

export default function Preview(props: t.PreviewProps) {
  return (
    <Template
      data={{
        staticBlock: props.fields,
        articles: {
          nodes: props.fields.story.componentsById[
            props.fields.story.allComponents[0]
          ].props.items.map((item) => {
            return {
              title: item.title,
              urlPath: item.link,
              teaserImageUrl: item.imgSrc,
              shortenedTeaser: item.description,
            }
          }),
          pageInfo: {
            currentPage: 1,
            pageCount: 2,
            hasNextPage: true,
            hasPreviousPage: true,
          },
        },
      }}
      location={{
        pathname: `/${config.locale}/`,
        origin: config.baseUrl,
      }}
    />
  )
}
