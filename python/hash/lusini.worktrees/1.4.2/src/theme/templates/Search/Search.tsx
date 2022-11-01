import * as React from 'react'
import Layout from 'containers/Layout'
import theme from 'theme'
import ProductList from 'theme/molecules/ProductList'
import styled from 'styled-components'
import Container from 'theme/atoms/Container'
import { useInitializer } from 'modules/listing'
import store from 'store'
import MobileInput from './MobileInput'
import Seo from './Seo'
import { graphql } from 'gatsby'
import { convertFilters } from 'utils/categories'

type Props = {
  location: {
    pathname: string
    origin: string
  }
  data: {
    category: {
      filters: string
    }
  }
}

export default function SearchRoute(props: Props) {
  const initialSearchValue = React.useMemo(() => {
    const state = store.getState()
    return state.ui.searchValue
  }, [])

  useInitializer(
    'search',
    React.useMemo(
      () => ({
        query: initialSearchValue,
        mode: 'ACTIVE',
      }),
      []
    ),
    React.useMemo(() => {
      return convertFilters(JSON.parse(props.data.category.filters))
    }, [])
  )

  return (
    <Layout>
      <Seo location={props.location} initialSearchValue={initialSearchValue} />
      <Container>
        <Wrapper data-cy-ctx="templates/Search">
          <MobileInput />
          <ProductList recordId="search" listname={`Search Listing`} />
        </Wrapper>
      </Container>
    </Layout>
  )
}

const Wrapper = styled.div`
  margin-top: ${theme.spacing('s')};
  padding-bottom: ${theme.spacing('xl')};

  > .MobileInput {
    margin: ${theme.spacing('ml')} 0;
  }
`

export const query = graphql`
  query SearchTemplate($rootCategoryId: String!) {
    category(objectID: { eq: $rootCategoryId }) {
      filters
    }
  }
`
