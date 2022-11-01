import * as React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import config from 'config'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import ShopwareIframeComponent from 'theme/atoms/ShopwareIframeComponent'
import Seo from 'theme/atoms/SEO'
import { refreshCart } from './events'
import { useCustomerType } from 'modules/b2cSwitch'
import useShopwareEvent from 'hooks/useShopwareEvent'

type Props = {
  '*': string
  location: {
    pathname: string
    search: string
    origin: string
  }
}

export default function Cart(props: Props) {
  const customerType = useCustomerType().data.customerType
  const searchParams = props.location.search.match(/share=([^&]*)/)
  const shareHash = searchParams ? searchParams[1] : null

  useShopwareEvent(
    'REMOVE_CART_ITEM',
    React.useCallback(() => {
      refreshCart()
    }, [customerType])
  )

  return (
    <Layout>
      <Seo
        location={props.location}
        title="Warenkorb"
        description=""
        type="website"
        noFollow={true}
      />
      <Container>
        <Wrapper data-cy-ctx="templates/Cart">
          {shareHash ? (
            <ShopwareIframeComponent
              data-cy-state="is-shared-cart"
              src={`${config.modules.cart.shareCartUrl}/c/${shareHash}`}
              iframeKey={customerType}
              defaultHeight={2200}
            />
          ) : (
            <ShopwareIframeComponent
              src={config.modules.cart.cartPixelUrl}
              iframeKey={customerType}
              defaultHeight={2200}
            />
          )}
        </Wrapper>
      </Container>
    </Layout>
  )
}

const Wrapper = styled.div`
  margin: ${theme.spacing('l')} 0;
`
