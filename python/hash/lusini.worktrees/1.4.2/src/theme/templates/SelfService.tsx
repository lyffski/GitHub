import * as React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import Seo from 'theme/atoms/SEO'
import ShopwareIframeComponent from 'theme/atoms/ShopwareIframeComponent'
import config from 'config'

type Props = {
  location: {
    pathname: string
    origin: string
    hash: string
  }
}

export default function SelfService(props: Props) {
  const selfserviceUrl = config.features.devMode
    ? 'https://selfservice.lusini.dev'
    : 'https://selfservice.lusini.com'

  const hash = props.location.hash

  const params =
    `?language=${config.locale.split('-')[0]}&country=${
      config.locale.split('-')[1]
    }&location=${config.locale}` + hash

  return (
    <Layout>
      <Seo
        canonicalUrl={`${config.baseUrl}${props.location.pathname}`}
        location={props.location}
        title="SelfService"
        description=""
        type="website"
        noFollow={true}
      />
      <Container>
        <Wrapper>
          <ShopwareIframeComponent
            defaultHeight={650}
            src={selfserviceUrl + params}
          />
        </Wrapper>
      </Container>
    </Layout>
  )
}

const Wrapper = styled.div`
  margin: ${theme.spacing('l')} 0;
`
