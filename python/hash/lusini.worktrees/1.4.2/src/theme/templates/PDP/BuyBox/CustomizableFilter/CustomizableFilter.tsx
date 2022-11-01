import * as React from 'react'
import styled, { css } from 'styled-components'
import Circle from 'assets/shapes/icon_circle.svg'
import Oval from 'assets/shapes/icon_oval.svg'
import Rectangle from 'assets/shapes/icon_rectangle.svg'
import Square from 'assets/shapes/icon_square.svg'
import theme from 'theme'
import { useCustomTailor } from 'modules/productDetail'
import useTranslations from 'hooks/useTranslations'
import { useDisplayVariant } from 'modules/productDetail'
import ArrowRight from 'assets/arrow-right.svg'

type Props = {
  onInteract: () => void
  amount: number
}

export default function CustomizableFilter(props: Props) {
  const customTailor = useCustomTailor()
  const t = useTranslations<'templates-PDP'>()
  const { data: variant } = useDisplayVariant()
  const [drawerOpened, setDrawerOpened] = React.useState(false)
  const getTailorShapeIcon = (shape: string) => {
    switch (shape) {
      case 'round':
        return <Circle />
      case 'oval':
        return <Oval />
      case 'rectangular':
        return <Rectangle />
      case 'square':
        return <Square />
      default:
        return null
    }
  }
  const interact = () => {
    props.onInteract()
    setDrawerOpened(true)
  }

  React.useEffect(() => {
    customTailor.init({
      priceSquareM: variant.prices.packPriceNet,
      shapes: variant.configurations.custom_tailor.configuration_data
        ?.shapes || ['square'],
      sizes: {
        minWidth: variant.attributes.WIDTH_MIN.values[0] as {
          unit: string
          value: number
        },
        maxWidth: variant.attributes.WIDTH_MAX.values[0] as {
          unit: string
          value: number
        },
        minHeight: variant.attributes.LENGTH_MIN.values[0] as {
          unit: string
          value: number
        },
        maxHeight: variant.attributes.LENGTH_MAX.values[0] as {
          unit: string
          value: number
        },
      },
      brinks: variant.configurations.custom_tailor.configuration_data
        ?.brinks || [{ type: 'normal', length: [1] }],
    })
    customTailor.set('amount', props.amount)
  }, [])
  if (!customTailor.fullData) {
    return null
  }
  return (
    <Wrapper className="row" data-cy-collection="CustomTailor">
      <div
        className="Filter-shape Filter"
        data-cy-handle="shape-filter"
        onClick={interact}
      >
        <div className="inner-filter">
          <div className="label">{t('form_label')}</div>
          <ul className="options">
            {customTailor.fullData.shapes.map((form) => (
              <Option
                key={form}
                data-cy-handle="form-option"
                selectable={true}
                selected={customTailor.data?.form === form}
                onClick={() => customTailor.set('form', form)}
                data-cy-state={
                  customTailor.data?.form === form && 'shape-selected'
                }
              >
                <div className="svg-wrapper">{getTailorShapeIcon(form)}</div>
              </Option>
            ))}
          </ul>
        </div>
        <div className="arrow-container">
          <ArrowRight />
        </div>
      </div>
      <div
        className="Filter-size Filter"
        onClick={interact}
        data-cy-handle="size-filter"
      >
        <div className="inner-filter">
          <div className="label">{t('desired_size')}</div>
          {drawerOpened ? (
            <div data-cy-state="size-selected" className="description">
              {t('width_label')}:{' '}
              {customTailor.data?.size.width +
                customTailor.fullData.sizes.minWidth.unit}
              {(customTailor.data?.form === 'oval' ||
                customTailor.data?.form === 'rectangular') &&
                `, ${t.asText(false, 'length_label')}: ${
                  customTailor.data?.size.length +
                  customTailor.fullData.sizes.minWidth.unit
                }`}
            </div>
          ) : (
            <div className="description">{t('please_choose_option')}</div>
          )}
        </div>
        <div className="arrow-container">
          <ArrowRight />
        </div>
      </div>
      <div
        className="Filter-hem Filter"
        onClick={interact}
        data-cy-handle="brink-filter"
      >
        <div className="inner-filter">
          <div className="label">{t('brink_label')}</div>
          {customTailor.data?.brink ? (
            <div data-cy-state="brink-selected" className="description">
              {customTailor.data?.brink.type}
              {customTailor.data?.brink.type === 'cuvert' &&
                (!customTailor.data?.brink.width
                  ? `, ${t.asText(false, 'choose_size')}`
                  : `, ${
                      customTailor.data?.brink.width +
                      customTailor.fullData.sizes.minWidth.unit
                    }`)}
            </div>
          ) : (
            <div className="description">{t('please_choose_option')}</div>
          )}
        </div>
        <div className="arrow-container">
          <ArrowRight />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .Filter {
    width: 100%;
    display: flex;
    align-items: center;
    border-top: 1px solid ${theme.colors.shade.b5};
    &:last-child {
      border-bottom: 1px solid ${theme.colors.shade.b5};
    }

    > .arrow-container {
      height: 14px;
      cursor: pointer;
      > svg {
        height: 100%;
        path {
          fill: ${theme.colors.shade.b2};
        }
      }
    }

    > .inner-filter {
      padding: ${theme.spacing('s')} 0;
      width: 90%;
      display: flex;
      cursor: pointer;
      > .label {
        min-width: 5rem;
        ${theme.ty('rc-base')}
      }
      > .description {
        margin-left: 0.625rem;
        color: ${theme.colors.shade.b2};
        ${theme.ty('r-base')}
        line-height: 24px;
        cursor: pointer;
      }

      > .value {
        flex: 1;
        color: ${theme.colors.shade.b3};
        margin-left: ${theme.spacing('s')};
      }

      > .options {
        display: flex;
        height: 1.5rem;
        margin-left: ${theme.spacing('xs')};
        position: relative;

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
  > .svg-wrapper {
    height: 32px;
    width: 100%;
    > svg {
      height: 80%;
      width: 100%;
    }
  }
  > img {
    width: 100%;
    height: 100%;
  }
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
        top: 39%;
        transform: translate(-50%, -50%);
      }
    `}
`
