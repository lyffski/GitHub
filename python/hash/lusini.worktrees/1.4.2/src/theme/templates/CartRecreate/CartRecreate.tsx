import * as React from 'react'
import theme from 'theme'
import config from 'config'
import styled from 'styled-components'

import { refreshCart } from './events'
import Layout from 'containers/Layout'
import Seo from 'theme/atoms/SEO'
import ShopwareIframeComponent from 'theme/atoms/ShopwareIframeComponent'
import Container from 'theme/atoms/Container'

type Props = {
  '*': string
  location: {
    pathname: string
    search: string
    origin: string
  }
}

export default function CartRecreate(props: Props) {
  const searchParams = props.location.search.match(/all=([^&]*)/)
  const skuString = searchParams ? searchParams[1] : ''

  const refreshCartOnRecreate = (e) => {
    const { type } = e.data

    if (type === 'setHeight') {
      refreshCart()
    }
  }

  React.useEffect(() => {
    window.addEventListener('message', refreshCartOnRecreate)

    return () => {
      window.removeEventListener('message', refreshCartOnRecreate)
    }
  }, [])

  return (
    <Layout>
      <Seo
        location={props.location}
        title="Account"
        description=""
        type="website"
        noFollow={true}
      />
      <Container>
        <Wrapper>
          <ShopwareIframeComponent
            src={`${config.modules.cart.cartRecreate}all/${skuString}`}
            defaultHeight={1000}
          />
        </Wrapper>
      </Container>
    </Layout>
  )
}

const Wrapper = styled.div`
  margin: ${theme.spacing('l')} 0;
`
