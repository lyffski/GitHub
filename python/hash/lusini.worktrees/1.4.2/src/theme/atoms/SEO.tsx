/* eslint-disable @kaminrunde/firescout/jsx-expression-needs-state */
import * as React from 'react'
import { Helmet } from 'react-helmet'
import config from 'config'
import * as t from 'modules/productDetail/types'

type Props = {
  title: string
  description: string
  type: 'profile' | 'website' | 'article' | 'blog'
  noFollow?: boolean
  prevPath?: string
  nextPath?: string
  hrefLang?: {
    url: string
    locale: string
  }[]
  location: {
    origin: string
    pathname: string
  }
  breadcrumbs?: {
    label: string
    link?: string
  }[]
  product?: Partial<t.Variant>
  // publishTime?: string
  // author?: string
  canonicalUrl?: string | false
  // prevPath?: string | false
  // nextPath?: string | false
}

export default function Seo(props: Props) {
  let ldJson
  if (props.breadcrumbs) {
    ldJson = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [],
    }
    props.breadcrumbs.map((item, i) => {
      ldJson.itemListElement.push({
        '@type': 'ListItem',
        position: i + 1,
        name: item.label,
        item: item.link
          ? config.baseUrl + '/' + config.locale + item.link
          : undefined,
      })
    })
  }

  return (
    <Helmet>
      <title>{props.title}</title>
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="/images/favicon.svg"
      />
      {props.canonicalUrl && <link rel="canonical" href={props.canonicalUrl} />}
      {props.noFollow ? (
        <meta name="robots" content="noindex" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}
      {props.hrefLang &&
        props.hrefLang.map((row) => (
          <link
            key={row.locale}
            rel="alternate"
            href={row.url}
            hrefLang={row.locale}
          />
        ))}
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:site_name" content={config.siteName} />
      <meta property="og:url" content={props.location.pathname} />
      <meta property="og:type" content={props.type} />
      <meta property="og:description" content={props.description} />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/lusini/image/upload/v1618839582/lusini-meta-logo.jpg"
      ></meta>
      {props.prevPath && <link rel="prev" href={props.prevPath} />}
      {props.nextPath && <link rel="next" href={props.nextPath} />}
      {props.breadcrumbs && (
        <script
          data-react-helmet="true"
          id="breadcrumbs"
          type="application/ld+json"
        >
          {JSON.stringify(ldJson)}
        </script>
      )}
    </Helmet>
  )
}
