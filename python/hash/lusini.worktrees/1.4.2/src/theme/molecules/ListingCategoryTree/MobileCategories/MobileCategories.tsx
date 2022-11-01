import * as React from 'react'
import styled from 'styled-components'
import ArrowLeft from 'assets/arrow-left.svg'
import theme from 'theme'
import Link from 'theme/atoms/Link'
import { ms } from 'modules/browser/const'
import * as t from '../types'
import { useCategoryTree } from 'modules/listing'
import useTagCategoryPaths from 'hooks/useTagCategoryPaths'

type Props = {
  item: t.CategoryOption | null
  parent: t.CategoryOption | null
}

export default function MobileCategories(props: Props) {
  const { item, parent } = props
  const categoryTree = useCategoryTree('category')
  const tc = useTagCategoryPaths()

  const items = item?.data?.length ? item.data : parent?.data || []

  const isRoot = categoryTree.data.item.path === ''
  const hasBackBtn = tc.active ? !isRoot : Boolean(parent)
  let backLink = tc.active ? tc.get(parent?.path || '') : parent?.urlPath || ''
  // when we want to navigate from a virtual category to a real category we cannot navigate
  // because the url won't change. Instead we use the filter mechanics
  if (typeof window !== 'undefined' && backLink === window.location.pathname)
    backLink = ''

  return (
    <Wrapper
      className="MobileCategories"
      data-cy-ctx="molecules/ListingCategoryTree"
    >
      {hasBackBtn && backLink && (
        <Link
          to={backLink}
          data-cy-state="show-back-button"
          data-cy-handle="back-button"
        >
          <ArrowLeft />
        </Link>
      )}
      {hasBackBtn && !backLink && (
        <button
          className="back-btn"
          data-cy-state="show-back-button"
          onClick={() => categoryTree.setCategory(parent?.path || '')}
          data-cy-handle="back-button"
        >
          <ArrowLeft />
        </button>
      )}
      <div className="categories">
        {items.map((item) =>
          tc.active ? (
            tc.has(item.path) ? (
              <Item
                key={item.path}
                selected={item.isRefined}
                to={tc.get(item.path)}
                data-cy-handle="cat-option"
              >
                {item.name}
              </Item>
            ) : (
              <Item
                key={item.path}
                as="button"
                selected={item.isRefined}
                onClick={() => categoryTree.setCategory(item.path)}
                data-cy-handle="cat-option"
              >
                {item.name}
              </Item>
            )
          ) : (
            <Item
              key={item.path}
              selected={item.isRefined}
              to={item.urlPath}
              data-cy-handle="cat-option"
            >
              {item.name}
            </Item>
          )
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  max-width: 100%;
  position: relative;

  > a > svg,
  > .back-btn > svg {
    width: 6px;
    @media (min-width: ${ms.MD}px) {
      width: 7px;
      margin-top: 2px;
    }
  }

  > a,
  > .back-btn {
    position: relative;
    padding: ${theme.spacing('xs')} 0;
    &:after {
      content: '';
      background: linear-gradient(
        270deg,
        rgba(255, 255, 255, 0.61) 0%,
        #ffffff 100%
      );
      position: absolute;
      top: 0;
      bottom: 0;
      right: -10px;
      width: 10px;
    }
  }

  > .categories {
    display: flex;
    flex: 1;
    width: calc(100vw - 80px);
    overflow: scroll;
    padding: ${theme.spacing('xs')} 0;
    padding-left: ${theme.spacing('xs')};
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &:after {
      content: 'eol';
      color: transparent;
      font-size: 10px;
    }
  }

  &:after {
    content: '';
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.61) 0%,
      #ffffff 100%
    );
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 20px;
  }
`

const Item = styled(Link)<{ selected: boolean }>`
  ${theme.ty('rc-s')}
  white-space: nowrap;
  margin-right: ${theme.spacing('xs')};

  @media (min-width: ${ms.MD}px) {
    ${theme.ty('rc-base')}
  }

  ${(p) => p.selected && `color: ${theme.colors.primary};`}
`
