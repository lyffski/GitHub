import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { usePage } from 'modules/seriesListing'
import ArrowLeft from 'assets/arrow-left.svg'
import ArrowRight from 'assets/arrow-right.svg'

type Props = {
  recordId: string
  scrollRef: React.MutableRefObject<HTMLElement | null>
}

export default function Pagination(props: Props) {
  const page = usePage(props.recordId)
  const handlePageChange = (setPage: number) => {
    page.set(setPage)
    props.scrollRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
  if (page.options.length === 1) return null
  return (
    <Wrapper className="Pagination" data-cy-collection="Pagination">
      {page.data.page + 1 !== 1 && (
        <Li
          className={'left'}
          selected={false}
          onClick={() => handlePageChange(page.data.page - 1)}
          data-cy-state={'pagination-arrow-left-shown'}
          data-cy-handle={'pagination-arrow-left'}
        >
          <ArrowLeft />
        </Li>
      )}

      {page.options.map((pageItem) => (
        <Li
          key={pageItem}
          selected={!!(pageItem - 1 === page.data.page)}
          onClick={() => handlePageChange(pageItem - 1)}
          data-cy-handle={'pagination-number'}
          data-cy-state={
            pageItem - 1 === page.data.page ? 'selected' : undefined
          }
        >
          {pageItem}
        </Li>
      ))}

      {page.data.page + 1 !== page.data.nbPages && (
        <Li
          className={'right'}
          selected={false}
          onClick={() => handlePageChange(page.data.page + 1)}
          data-cy-state={'pagination-arrow-right-shown'}
          data-cy-handle={'pagination-arrow-right'}
        >
          <ArrowRight />
        </Li>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
`
const Li = styled.li<{ selected: boolean }>`
  ${theme._ty([18, 0, 29], theme.fontSpecial)}
  color: ${theme.colors.shade.b4};
  cursor: pointer;
  padding: 0 ${theme.spacing('xs')};

  ${(p) =>
    p.selected &&
    `
    color: ${theme.colors.shade.b2};
    background-color: ${theme.colors.shade.b6};
    border-radius: 50%;
    cursor: default;
  `}

  &.left,
  &.right {
    > svg {
      width: 10px;
      height: 10px;
    }
  }
`
