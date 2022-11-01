import * as React from 'react'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import Story from 'theme/atoms/Story'
import Seo from 'theme/atoms/SEO'
import config from 'config'
import * as t from './types'

export default function Error(props: t.Props) {
  return (
    <Layout
      breadcrumbs={[
        { label: 'Startseite', link: '/' },
        { label: 'Fehler Seite' },
      ]}
    >
      <Seo
        canonicalUrl={`${config.baseUrl}${props.location.pathname}`}
        location={props.location}
        title="Fehlerseite"
        description="Ein Fehler ist aufgetreten. "
        type="website"
        noFollow={config.features.seoNoFollow}
      />
      <Container>
        <div style={{ height: 40 }} />
        <Story
          story={props.data.staticBlock.story}
          cfId={props.data.staticBlock.contentfulID}
        />
      </Container>
    </Layout>
  )
}
