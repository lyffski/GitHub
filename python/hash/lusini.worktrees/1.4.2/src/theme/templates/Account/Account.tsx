import * as React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import config from 'config'
import Layout from 'containers/Layout'
import useShopwareEvent from 'hooks/useShopwareEvent'
import Container from 'theme/atoms/Container'
import ShopwareIframeComponent from 'theme/atoms/ShopwareIframeComponent'
import Seo from 'theme/atoms/SEO'
import { refreshCart } from './events'

type Props = {
  location: {
    pathname: string
    origin: string
  }
}

export default function Account(props: Props) {
  useShopwareEvent(
    'REFRESH_CART_LOGIN',
    React.useCallback(() => {
      refreshCart()
    }, [])
  )

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
        <Wrapper data-cy-ctx="templates/Account">
          <ShopwareIframeComponent
            src={config.modules.cart.accountUrl}
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
