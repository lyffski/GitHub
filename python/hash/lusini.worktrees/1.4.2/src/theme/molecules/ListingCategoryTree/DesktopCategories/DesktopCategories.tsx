/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import styled from 'styled-components'
import Link from 'theme/atoms/Link'
import theme from 'theme'
import ArrowButtonLeft from 'assets/arrow-button-left.svg'
import useTranslations from 'hooks/useTranslations'
import * as t from '../types'
import { useCategoryTree } from 'modules/listing'
import useTagCategoryPaths from 'hooks/useTagCategoryPaths'

type Props = {
  item: t.CategoryOption | null
  parent: t.CategoryOption | null
}

export default function DesktopCategories(props: Props) {
  const { item, parent } = props
  const t = useTranslations<'molecules-ListingCategoryTree'>()
  const items = item?.data?.length ? item.data : parent?.data || []
  const categoryTree = useCategoryTree('category')
  const tc = useTagCategoryPaths()

  const isRoot = categoryTree.data.item.path === ''
  const hasBackBtn = tc.active ? !isRoot : Boolean(parent)

  let backLink = tc.active
    ? tc.get(item?.path || '')
      ? tc.get(parent?.path || '')
      : ''
    : parent?.urlPath || ''

  // when we want to navigate from a virtual category to a real category we cannot navigate
  // because the url won't change. Instead we use the filter mechanics
  if (typeof window !== 'undefined' && backLink === window.location.pathname)
    backLink = ''

  return (
    <Wrapper
      className="DesktopCategories"
      data-cy-ctx="molecules/ListingCategoryTree"
    >
      <h3>{item?.name || t('category_side_nav_default_title')}</h3>
      {hasBackBtn && backLink && (
        <Link
          className="back-button"
          data-cy-state="show-back-button"
          data-cy-handle="back-button"
          to={backLink}
        >
          <ArrowButtonLeft />
          <span>
            {parent?.name
              ? t('category_side_nav_back_link', { categoryname: parent?.name })
              : t('category_side_nav_back_link_fallback')}
          </span>
        </Link>
      )}

      {hasBackBtn && !backLink && (
        <button
          className="back-button"
          data-cy-state="show-back-button"
          data-cy-handle="back-button"
          onClick={() => categoryTree.setCategory(parent?.path || '')}
        >
          <ArrowButtonLeft />
          <span>
            {parent?.name
              ? t('category_side_nav_back_link', { categoryname: parent?.name })
              : t('category_side_nav_back_link_fallback')}
          </span>
        </button>
      )}
      <ul>
        {items.map((item) => (
          <ListItem key={item.path} selected={item.isRefined}>
            {!tc.active && (
              // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
              <Link to={item.urlPath} data-cy-handle="cat-option">
                <span>{item.name}</span>
                <small>{item.count}</small>
              </Link>
            )}
            {tc.active && tc.has(item.path) && (
              // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
              <Link to={tc.get(item.path)} data-cy-handle="cat-option">
                <span>{item.name}</span>
                <small>{item.count}</small>
              </Link>
            )}
            {tc.active && !tc.has(item.path) && (
              // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
              <button
                onClick={() => categoryTree.setCategory(item.path)}
                data-cy-handle="cat-option"
              >
                <span>{item.name}</span>
                <small>{item.count}</small>
              </button>
            )}
          </ListItem>
        ))}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: ${theme.spacing('m')};
  background: #f9f9f8;
  padding-bottom: 8rem;

  > h3 {
    margin-bottom: ${theme.spacing('m')};
    ${theme.ty('rc-xl')}
  }
  > .back-button {
    ${theme.ty('rc-base', '700')}
    color:${theme.colors.primary};
    margin-bottom: ${theme.spacing('m')};
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    > svg {
      height: 12px;
      width: 12px;
      flex: 1;

      g {
        stroke: ${theme.colors.primary};
      }
    }
    > span {
      margin-left: ${theme.spacing('xxs')};
      overflow: hidden;
      flex: 13;
    }
  }
`

const ListItem = styled.li<{ selected: boolean }>`
  margin-bottom: ${theme.spacing('s')};

  > span,
  > a,
  > button {
    background: none;
    text-align: left;
    > span {
      color: ${(props) =>
        props.selected ? theme.colors.primary : theme.colors.shade.b2};
      ${theme.ty('rc-base')}
    }

    > small {
      color: ${theme.colors.shade.b3};
      ${theme.ty('rc-s')}
      margin-left: ${theme.spacing('xxs')};
    }
  }
`
