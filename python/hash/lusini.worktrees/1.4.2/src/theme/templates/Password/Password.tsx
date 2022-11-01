import * as React from 'react'
import styled from 'styled-components'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import ShopwareIframeComponent from 'theme/atoms/ShopwareIframeComponent'
import Seo from 'theme/atoms/SEO'
import theme from 'theme'
import config from 'config'

type Props = {
  '*': string
  location: {
    pathname: string
    search: string
    origin: string
  }
}

export default function Password(props: Props) {
  const searchParams = props.location.search.match(/hash=([^&]*)/)
  const [mode, setMode] = React.useState<
    'empty' | 'password' | 'passwordReset'
  >('empty')

  const hash = searchParams ? searchParams[1] : null

  React.useEffect(() => {
    if (hash) {
      setMode('passwordReset')
      return
    }

    setMode('password')
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
        <Wrapper data-cy-ctx="templates/Password">
          {mode === 'empty' && <div data-cy-state="show-nothing"></div>}
          {mode === 'password' && (
            <ShopwareIframeComponent
              data-cy-state="show-password"
              src={`${config.modules.cart.accountUrl}/password`}
              defaultHeight={1000}
            />
          )}
          {mode === 'passwordReset' && (
            <div data-cy-state="show-passwordreset">
              <ShopwareIframeComponent
                src={`${config.modules.cart.accountUrl}/resetPassword/hash/${hash}`}
                defaultHeight={1000}
              />
            </div>
          )}
        </Wrapper>
      </Container>
    </Layout>
  )
}

const Wrapper = styled.div`
  margin: ${theme.spacing('l')} 0;
`
