import * as React from 'react'
import styled, { css } from 'styled-components'
import Drawer from 'theme/atoms/Drawer'
import Button from 'theme/atoms/Button'
import { useFilter } from 'modules/productDetail'
import ProductImage from 'theme/atoms/ProductImage'
import CheckRadio from 'theme/atoms/CheckRadio'
import theme from 'theme'
import useTranslations from 'hooks/useTranslations'
import CustomizableFilter from './CustomizableFilter/CustomizableDrawerFilter'

type Props = {
  onClose: () => void
  'data-cy-state'?: string
}

export default function FilterDrawer(props: Props) {
  const colorFilter = useFilter('color')
  const sizeFilter = useFilter('size')
  const variantFilter = useFilter('variant')
  const styleFilter = useFilter('style')
  const t = useTranslations<'templates-PDP'>()

  return (
    <Drawer
      hideOverlay
      visible={true}
      onClose={props.onClose}
      data-cy-handle-close-icon="close-icon"
      data-cy-handle-overlay="overlay"
      data-cy-collection="FilterDrawer"
      data-cy-state={props['data-cy-state']}
    >
      <Wrapper data-cy-collection="FilterDrawer">
        {colorFilter.data.options.length > 1 && (
          <div className="row" data-cy-state="has-color">
            <div className="label category">{t('color_label')}</div>
            <ul className="color">
              {colorFilter.data.options.map((opt) => (
                <ColorItem
                  selectable={opt.selectable}
                  selected={opt.label === colorFilter.data.value}
                  key={opt.label}
                  data-cy-handle="color-option"
                  onClick={() => colorFilter.setValue(opt.label)}
                >
                  <ProductImage img={opt.image} alt={opt.label} size="xs" />
                </ColorItem>
              ))}
            </ul>
          </div>
        )}
        {sizeFilter.data.options.length > 1 && (
          <div className="row" data-cy-state="has-size">
            <div className="label category">{t('size_label')}</div>
            <ul className="bullets">
              {sizeFilter.data.options.map((opt) => (
                <li key={opt.label} className="h4">
                  <CheckRadio
                    notAvailable={!opt.selectable}
                    variation="radio"
                    radiogroup="size"
                    label={opt.label}
                    data-cy-handle="size-option"
                    checked={sizeFilter.data.value === opt.label}
                    onClick={() => sizeFilter.setValue(opt.label)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {variantFilter.data.options.length > 1 && (
          <div className="row" data-cy-state="has-variant">
            <div className="label category">{t('variant_label')}</div>
            <ul className="bullets">
              {variantFilter.data.options.map((opt) => (
                <li key={opt.label} className="h4">
                  <CheckRadio
                    notAvailable={!opt.selectable}
                    variation="radio"
                    radiogroup="variant"
                    label={opt.label}
                    data-cy-handle="variant-option"
                    checked={variantFilter.data.value === opt.label}
                    onClick={() => variantFilter.setValue(opt.label)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {styleFilter.data.options.length > 1 && (
          <div className="row" data-cy-state="has-style">
            <div className="label category">{t('style_label')}</div>
            <ul className="bullets">
              {styleFilter.data.options.map((opt) => (
                <li key={opt.label} className="h4">
                  <CheckRadio
                    notAvailable={!opt.selectable}
                    variation="radio"
                    radiogroup="style"
                    label={opt.label}
                    data-cy-handle="style-option"
                    checked={styleFilter.data.value === opt.label}
                    onClick={() => styleFilter.setValue(opt.label)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        <CustomizableFilter />
        <Button
          variation="primary"
          data-cy-handle="close"
          onClick={props.onClose}
        >
          {t('filter_apply_btn')}
        </Button>
      </Wrapper>
    </Drawer>
  )
}

const Wrapper = styled.div`
  padding: 0 ${theme.spacing('l')};
  padding-bottom: 10rem;

  > .row {
    padding: ${theme.spacing('m')} 0;
    border-bottom: 1px solid ${theme.colors.shade.b5};
    > .label {
      margin-bottom: ${theme.spacing('m')};
    }
    > ul.color {
      display: flex;
      flex-wrap: wrap;
    }

    > ul.bullets {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: ${theme.spacing('s')};
    }
  }

  > button {
    display: block;
    margin: 0 auto;
    width: 15rem;
    text-align: center;
    margin-top: ${theme.spacing('l')};
  }
`

const ColorItem = styled.li<{ selected: boolean; selectable: boolean }>`
  width: 2rem;
  height: 2rem;
  margin-right: 10px;
  margin-bottom: 10px;

  ${theme.rounding('m')}
  border: 1px solid
    ${(p) => (p.selected ? theme.colors.primary : theme.colors.shade.b5)};
  padding: ${theme.spacing('xxs')};
  position: relative;
  cursor: pointer;

  ${(p) =>
    !p.selectable &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      position: relative;
      overflow: hidden;

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

  ${(p) =>
    p.selected &&
    css`
      &:after {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${theme.colors.primary};
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `}
`
