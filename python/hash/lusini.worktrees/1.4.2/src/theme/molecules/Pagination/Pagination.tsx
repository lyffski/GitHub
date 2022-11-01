import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import ArrowLeft from 'assets/arrow-left.svg'
import ArrowRight from 'assets/arrow-right.svg'

type Props = {
  currentPage: number
  pageCount: number
  pageIndices: number[]
  handlePageChange: (setPage: number) => void
}

export default function Pagination(props: Props) {
  const { currentPage, pageCount, handlePageChange } = props

  if (pageCount <= 1 || pageCount === undefined) return null
  return (
    <Wrapper className="Pagination" data-cy-ctx="molecules/Pagination">
      {currentPage !== 0 && (
        <Li
          className={'left'}
          selected={false}
          onClick={() => handlePageChange(currentPage - 1)}
          data-cy-state={'pagination-arrow-left-shown'}
          data-cy-handle={'pagination-arrow-left'}
        >
          <ArrowLeft />
        </Li>
      )}

      {props.pageIndices.map((pageIndex) => (
        <Li
          key={pageIndex}
          selected={currentPage === pageIndex - 1}
          onClick={() => handlePageChange(pageIndex - 1)}
          data-cy-handle={'pagination-number'}
          data-cy-state={
            currentPage === pageIndex - 1 ? 'selected' : 'not-selected'
          }
        >
          {pageIndex}
        </Li>
      ))}

      {currentPage + 1 !== pageCount && (
        <Li
          className={'right'}
          selected={false}
          onClick={() => handlePageChange(currentPage + 1)}
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
