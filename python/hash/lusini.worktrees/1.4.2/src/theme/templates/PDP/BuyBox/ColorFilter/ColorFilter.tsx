import * as React from 'react'
import styled, { css } from 'styled-components'
import { useFilter } from 'modules/productDetail'
import ProductImage from 'theme/atoms/ProductImage'
import PlusIcon from 'assets/plus.svg'
import theme from 'theme'
import useTranslations from 'hooks/useTranslations'

type Props = {
  onMoreClick: () => void
}

export default function ColorFilter(props: Props) {
  const filter = useFilter('color')
  const t = useTranslations<'templates-PDP'>()
  const options = filter.data.options
  if (options.length === 0) return null

  return (
    <Wrapper className="ColorFilter" data-cy-collection="ColorFilter">
      <div className="label">{t('color_label')}</div>
      {options.length > 1 && (
        <ul className="options" data-cy-state="has-color-options">
          {options.slice(0, 5).map((opt) => (
            <Option
              key={opt.label}
              data-cy-handle="option"
              selectable={opt.selectable}
              selected={opt.label === filter.data.value}
              onClick={() => opt.selectable && filter.setValue(opt.label)}
            >
              <ProductImage img={opt.image} alt={opt.label} size="xs" />
            </Option>
          ))}
          {options.length > 5 && (
            <Option
              selectable
              selected={false}
              className="more-colors"
              data-cy-state="has-more-colors"
              data-cy-handle="more-colors"
              onClick={props.onMoreClick}
            >
              <PlusIcon />
            </Option>
          )}
        </ul>
      )}
      {options.length === 1 && (
        <div className="value" data-cy-state="is-single-filter">
          {filter.data.value}
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid ${theme.colors.shade.b5};
  padding: ${theme.spacing('s')} 0;
  &:last-child {
    border-bottom: 1px solid ${theme.colors.shade.b5};
  }

  > .label {
    min-width: 5rem;
    ${theme.ty('rc-base')}
  }

  > .value {
    flex: 1;
    color: ${theme.colors.shade.b3};
    margin-left: ${theme.spacing('s')};
  }

  > .options {
    display: flex;
    height: 2rem;
    margin-left: ${theme.spacing('xs')};
    position: relative;
    flex-wrap: wrap;

    > .more-colors {
      display: flex;
      border: 1px solid ${theme.colors.shade.b5};
      justify-content: center;
      border-radius: 0.313rem;
    }

    > li:nth-child(4),
    > li:nth-child(5) {
      display: none;
    }

    @media (min-width: 350px) {
      > li:nth-child(4) {
        display: flex;
      }
    }

    @media (min-width: 410px) {
      li:nth-child(5) {
        display: flex;
      }
    }
  }
`

const Option = styled.li<{ selected: boolean; selectable: boolean }>`
  ${theme.rounding('s')}
  justify-content: center;
  position: relative;
  align-items: center;
  display: flex;
  width: 2rem;
  max-width: 2rem;
  height: 2rem;
  flex: 1 1 1.875rem;
  margin-bottom: 2rem;
  overflow: hidden;
  cursor: pointer;
  margin-right: ${theme.spacing('xs')};
  > img {
    width: 90%;
    height: 90%;
  }
  border: 1px solid
    ${(p) => (p.selected ? theme.colors.b0 : theme.colors.shade.b5)};

  ${(p) =>
    !p.selectable &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
      &:after {
        content: '';
        position: absolute;
        width: 200%;
        left: -50%;
        top: calc(50% - 1px);
        height: 1px;
        background: ${theme.colors.shade.b3};
        transform: rotate(-45deg);
      }
    `}
`
