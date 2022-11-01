import * as React from 'react'
import { navigate } from 'gatsby'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import Story from 'theme/atoms/Story'
import Seo from 'theme/atoms/SEO'
import config from 'config'
import * as t from './types'

export default function Home(props: t.Props) {
  const hrefLang = [
    {
      locale: 'de-de',
      url: 'https://www.lusini.com/de-de/',
    },
    {
      locale: 'de-at',
      url: 'https://www.lusini.com/de-at/',
    },
    {
      locale: 'de-ch',
      url: 'https://www.lusini.com/de-ch/',
    },
    {
      locale: 'fr-ch',
      url: 'https://www.lusini.com/fr-ch/',
    },
    {
      locale: 'fr-fr',
      url: 'https://www.lusini.com/fr-fr/',
    },
    {
      locale: 'it-it',
      url: 'https://www.lusini.com/it-it/',
    },
    {
      locale: 'es-es',
      url: 'https://www.lusini.com/es-es/',
    },
    {
      locale: 'nl-nl',
      url: 'https://www.lusini.com/nl-nl/',
    },
    {
      locale: 'sv-se',
      url: 'https://www.lusini.com/sv-se/',
    },
    {
      locale: 'nb-no',
      url: 'https://www.lusini.com/nb-no/',
    },
    {
      locale: 'fr-be',
      url: 'https://www.lusini.com/fr-be/',
    },
    {
      locale: 'nl-be',
      url: 'https://www.lusini.com/nl-be/',
    },
    {
      locale: 'en-gb',
      url: 'https://www.lusini.com/en/',
    },
    {
      locale: 'x-default',
      url: 'https://www.lusini.com/en/',
    },
  ]
  if (!props.data.staticBlock) {
    navigate('/404/')
    return null
  }

  return (
    <Layout>
      <Seo
        canonicalUrl={`${config.baseUrl}${props.location.pathname}`}
        location={props.location}
        title={props.data.staticBlock.title}
        description={props.data.staticBlock.description}
        type="website"
        noFollow={config.features.seoNoFollow}
        hrefLang={hrefLang}
      />
      <Container>
        <div style={{ height: 40 }} />
        <Story
          story={props.data.staticBlock?.story}
          cfId={props.data.staticBlock?.contentfulID}
        />
      </Container>
    </Layout>
  )
}
