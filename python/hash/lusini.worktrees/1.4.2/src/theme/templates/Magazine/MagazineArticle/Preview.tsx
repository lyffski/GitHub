import * as React from 'react'
import Template from './MagazineArticle'
import * as t from './types'
import config from 'config'

export default function ArticlePreview(props: t.PreviewProps) {
  return (
    <Template
      data={{
        magazineArticle: {
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
          relatedArticles: props.fields.relatedArticles || [],
        },
      }}
      location={{
        pathname: `/${config.locale}/`,
        origin: config.baseUrl,
      }}
    />
  )
}
