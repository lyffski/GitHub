import * as React from 'react'
import styled from 'styled-components'
import * as t from './types'
import ProductListWrapper from './ProductListWrapper'
import SeriesWrapper from './SeriesWrapper'
import withTranslations from './withTranslations'

export function Category(props: t.Props) {
  if (props.context.mode === 'SERIES')
    return (
      <Wrapper data-cy-ctx="organisms/Category" data-cy-state="series">
        <SeriesWrapper {...props} />
      </Wrapper>
    )

  return (
    <Wrapper data-cy-ctx="organisms/Category" data-cy-state="listing">
      <ProductListWrapper {...props} />
    </Wrapper>
  )
}

export default withTranslations(Category)

const Wrapper = styled.div``
