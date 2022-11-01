import * as React from 'react'
import styled from 'styled-components'

import theme from 'theme'
import config from 'config'

import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import ShopwareIframeComponent from 'theme/atoms/ShopwareIframeComponent'

import Seo from 'theme/atoms/SEO'

type Props = {
  location: {
    pathname: string
    origin: string
    state: {
      email: string
    }
  }
}

export default function Newsletter(props: Props) {
  const iframeContainer = React.useRef<HTMLIFrameElement>(null)

  React.useEffect(() => {
    const sendNewsletterData = (e) => {
      const { type } = e.data

      if (type !== 'setHeight' || !iframeContainer.current) {
        return
      }

      const iframe = iframeContainer.current
        .getElementsByTagName('iframe')
        .item(0)

      if (iframe === null) return

      const newsletterData = {
        email: props.location.state?.email,
      }

      iframe.contentWindow?.postMessage(
        { type: 'newsletterForm', ...newsletterData },
        '*'
      )

      window.removeEventListener('message', sendNewsletterData)
    }

    window.addEventListener('message', sendNewsletterData)

    return () => {
      window.removeEventListener('message', sendNewsletterData)
    }
  }, [])

  return (
    <Layout>
      <Seo
        location={props.location}
        title="Newsletter"
        description=""
        type="website"
        noFollow={config.features.seoNoFollow}
      />
      <Container>
        <Wrapper ref={iframeContainer}>
          <ShopwareIframeComponent
            src={config.modules.cart.newsletterUrl}
            defaultHeight={2000}
          />
        </Wrapper>
      </Container>
    </Layout>
  )
}

const Wrapper = styled.div`
  margin: ${theme.spacing('l')} 0;
`
