import * as React from 'react'
import * as t from '../types'
import { useInitializer } from 'modules/seriesListing'
import styled from 'styled-components'
import SeriesList from './SeriesList'
import theme from 'theme'
import CategoryTree from './CategoryTree'
import { LISTING_RECORD_ID } from '../const'

export default function SeriesWrapper(props: t.Props) {
  useInitializer(
    LISTING_RECORD_ID,
    React.useMemo(
      () => ({
        categoryId: props.categoryId,
        categoryPath: props.context.categoryPath,
      }),
      []
    )
  )

  return (
    <Wrapper className="SeriesWrapper">
      <CategoryTree recordId={LISTING_RECORD_ID} />
      <SeriesList recordId={LISTING_RECORD_ID} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > .CategoryTree {
    margin-bottom: ${theme.spacing('xs')};
    @media (min-width: ${theme.ms.LG}px) {
      width: 16.25rem;
      margin-right: ${theme.spacing('ml')};
      height: fit-content;
    }
  }

  @media (min-width: ${theme.ms.LG}px) {
    flex-direction: row;
  }

  > .SeriesList {
    width: 100%;
  }
`
