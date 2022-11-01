import * as React from 'react'
import styled from 'styled-components'
import Link from 'theme/atoms/Link'
import { FiArrowRight } from 'react-icons/fi'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import useTranslations from 'hooks/useTranslations'

type Props = {
  linkActive?: boolean
  link: string
  title: string
  numHits: number | null
  headerStyle: 'big' | 'small'
  hideLink?: boolean
}
export default function CategoryHeadline(props: Props) {
  const { link, title, numHits, headerStyle } = props
  const t = useTranslations<'molecules-CategoryHeadline'>()
  return (
    <Wrapper
      className="CategoryHeadline"
      data-cy-ctx="molecules/CategoryHeadline"
      $big={headerStyle === 'big'}
      as={Link}
      to={link}
    >
      <div className="headline">
        <div className="title">
          <h3>{title}</h3>
        </div>
        {props.numHits && (
          <div data-cy-state="hits-visible" className="hits">
            {numHits} {t('category_products_label')}
          </div>
        )}
      </div>

      {!props.hideLink && (
        <div data-cy-state="link-visible" className="link">
          <span>{t('category_link_label')}</span>
          <FiArrowRight />
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $big: boolean; showBorder?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${theme.spacing('m')};
  padding-top: 0;
  cursor: pointer;
  padding-right: 0;
  border-bottom: 1px solid ${theme.colors.shade.b6};

  > .headline > .title > h3 {
    margin-right: ${theme.spacing('xxs')};
    ${(p) => (p.$big ? theme.ty('rc-2xl') : theme.ty('rc-xl'))}

    @media (min-width: ${ms.SM}px) {
      ${(p) => (p.$big ? theme.ty('rc-3xl') : theme.ty('rc-2xl'))}
    }
    color: ${theme.colors.b0};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  > .headline > .hits {
    ${(p) => (p.$big ? theme.ty('r-base') : theme.ty('r-s'))}
    color: ${theme.colors.shade.b3};
  }

  > div {
    &.link {
      display: flex;
      align-items: flex-end;
      color: ${theme.colors.primary};
      margin-top: ${theme.spacing('xs')};
      > span {
        ${theme.ty('rc-base')}
        font-weight: bold;
        color: inherit;
      }
      > svg {
        color: inherit;
        margin-left: 5px;
        margin-bottom: 3px;
      }
    }
  }
`
