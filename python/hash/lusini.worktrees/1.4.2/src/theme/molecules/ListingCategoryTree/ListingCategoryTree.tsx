import * as React from 'react'
import * as t from './types'
import styled from 'styled-components'
import DesktopCategories from './DesktopCategories'
import MobileCategories from './MobileCategories'
import theme from 'theme'

export type Props = {
  item: t.CategoryOption | null
  parent: t.CategoryOption | null
}

export default function ListingCategoryTree(props: Props) {
  return (
    <Wrapper
      className="ListingCategoryTree"
      data-cy-ctx="molecules/ListingCategoryTree"
    >
      <DesktopCategories {...props} />
      <MobileCategories {...props} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .DesktopCategories {
    display: none;
  }

  @media (min-width: ${theme.ms.LG}px) {
    > .MobileCategories {
      display: none;
    }
    > .DesktopCategories {
      display: block;
    }
  }
`
