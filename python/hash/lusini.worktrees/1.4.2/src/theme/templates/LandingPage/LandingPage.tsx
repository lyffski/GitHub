import * as React from 'react'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import Story from 'theme/atoms/Story'
import Seo from 'theme/atoms/SEO'
import styled from 'styled-components'
import theme from 'theme'
import config from 'config'
import * as t from './types'

export default function LandingPage(props: t.Props) {
  return (
    <Layout>
      <Seo
        canonicalUrl={
          props.data.landingPage.canonicalUrl ||
          `${config.baseUrl}${props.location.pathname}`
        }
        location={props.location}
        title={props.data.landingPage.seoTitle}
        description={props.data.landingPage.seoDescription}
        type="website"
        noFollow={config.features.seoNoFollow}
        hrefLang={props.data.landingPage.hrefLang}
      />
      <Container>
        <Headline>{props.data.landingPage.title}</Headline>
        <Story
          story={props.data.landingPage.story}
          cfId={props.data.landingPage.contentfulID}
        />
      </Container>
    </Layout>
  )
}

const Headline = styled.h1`
  ${theme.ty('rc-4xl')}
  margin: ${theme.spacing('ml')} 0 ${theme.spacing('m')} 0;
  color: ${theme.colors.primary};
`
