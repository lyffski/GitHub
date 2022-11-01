import * as React from 'react'
import styled from 'styled-components'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import Seo from 'theme/atoms/SEO'

type Props = {
  location: {
    pathname: string
    origin: string
  }
}

export default function Error(props: Props) {
  return (
    <Layout>
      <Seo
        location={props.location}
        title="Something went wrong!!"
        description="Something went wrong!!"
        type="website"
      />
      <Container>
        <Wrapper>Something went wrong!!</Wrapper>
      </Container>
    </Layout>
  )
}

const Wrapper = styled.h1``
