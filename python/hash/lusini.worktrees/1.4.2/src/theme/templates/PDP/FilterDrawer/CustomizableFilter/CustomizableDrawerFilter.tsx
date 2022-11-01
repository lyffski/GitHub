import * as React from 'react'
import styled, { css } from 'styled-components'
import Circle from 'assets/shapes/icon_circle.svg'
import Oval from 'assets/shapes/icon_oval.svg'
import Rectangle from 'assets/shapes/icon_rectangle.svg'
import Square from 'assets/shapes/icon_square.svg'
import theme from 'theme'
import PlusIcon from 'assets/plus.svg'
import MinusIcon from 'assets/minus.svg'
import RadioButton from 'theme/atoms/CheckRadio'
import { useCustomTailor } from 'modules/productDetail'
import { useDisplayVariant } from 'modules/productDetail'
import useTranslations from 'hooks/useTranslations'

export default function CustomizableFilter() {
  const [isCuvert, setCuvert] = React.useState(false)
  const customTailor = useCustomTailor()
  const t = useTranslations<'templates-PDP'>()
  const variant = useDisplayVariant()
  const radioRef = React.useRef<HTMLLIElement | null>(null)
  if (!customTailor.fullData) return null
  const increment = (type) => {
    let minValue = customTailor.fullData?.sizes.minWidth.value || 0
    let maxValue = customTailor.fullData?.sizes.maxWidth.value || 999
    if (type === 'length') {
      minValue = customTailor.fullData?.sizes.minHeight.value || 0
      maxValue = customTailor.fullData?.sizes.maxHeight.value || 999
    }
    const returnObj = {
      ...customTailor.data?.size,
      [type]: (customTailor.data?.size[type] || minValue) + 1,
    }

    return (
      customTailor.data?.size[type] < maxValue &&
      customTailor.set('size', returnObj)
    )
  }

  const decrement = (type) => {
    const returnObj = {
      ...customTailor.data?.size,
      [type]:
        (customTailor.data?.size[type] ||
          customTailor.fullData?.sizes.minWidth.value) - 1,
    }
    let limit = customTailor.fullData?.sizes.minWidth.value || 0
    if (type === 'length')
      limit = customTailor.fullData?.sizes.minHeight.value || 0

    return (
      customTailor.data?.size[type] > limit &&
      customTailor.set('size', returnObj)
    )
  }

  const handleInputAmount = (value, type) => {
    // remove any chars except numbers
    let newAmount = value.replace(/[^0-9]/g, '')
    newAmount = parseInt(newAmount, 10)
    let minValue = customTailor.fullData?.sizes.minWidth.value || 0
    let maxValue = customTailor.fullData?.sizes.maxWidth.value || 999
    if (type === 'length') {
      minValue = customTailor.fullData?.sizes.minHeight.value || 0
      maxValue = customTailor.fullData?.sizes.maxHeight.value || 999
    }

    const returnObj = (val) => {
      return { ...customTailor.data?.size, [type]: val }
    }
    if (value === '' || !newAmount)
      return customTailor.set('size', returnObj(minValue))
    else if (newAmount > maxValue)
      return customTailor.set('size', returnObj(maxValue))
    else return customTailor.set('size', returnObj(newAmount))
  }

  const checkAmount = (amount, type) => {
    let minValue = customTailor.fullData?.sizes.minWidth.value || 0
    if (type === 'length') {
      minValue = customTailor.fullData?.sizes.minHeight.value || 0
    }
    const returnObj = (val) => {
      return { ...customTailor.data?.size, [type]: val }
    }

    if (amount < minValue) return customTailor.set('size', returnObj(minValue))
    else return null
  }

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
  const handleBrink = (type, length?) => {
    if (length) {
      customTailor.set('brink', { type: type, width: length })
    } else {
      customTailor.set('brink', { type: type })
    }
  }

  const getFormName = (form) => {
    switch (form) {
      case 'round':
        return t('circle')
      case 'oval':
        return t('oval')
      case 'rectangular':
        return t('rectangle')
      case 'square':
        return t('square')
      default:
        return null
    }
  }

  React.useEffect(() => {
    if (!customTailor.data?.size.width) {
      customTailor.set('size', {
        width: customTailor.fullData?.sizes.minWidth.value,
        length: customTailor.fullData?.sizes.minHeight.value,
      })
    }
    customTailor.set('priceSquareM', customTailor.fullData?.priceSquareM)
  }, [])

  React.useMemo(() => {
    if (customTailor.data?.brink?.type === 'cuvert') {
      const cuvertObject = customTailor.fullData?.brinks.find(
        (item) => item.type === 'cuvert'
      )

      if (
        !customTailor.data.form ||
        !cuvertObject?.activeAt ||
        cuvertObject.activeAt.includes(customTailor.data.form)
      ) {
        setCuvert(true)
      } else {
        setCuvert(false)
        customTailor.set('brink', { type: 'normal' })
      }
    } else {
      customTailor.set('brink', { type: 'normal' })
    }
  }, [customTailor.data?.form])

  if (!variant.data.configurations.custom_tailor.is_custom_tailor) return null

  return (
    <Wrapper data-cy-state="Customizable-Filter">
      <div className="Filter-shape Filter">
        <div className="label">{t('form_label')}</div>
        <ul className="options shapes" data-cy-state="has-form-options">
          {customTailor.fullData?.shapes.map((form) => (
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
              <div className="icon-description">{getFormName(form)}</div>
            </Option>
          ))}
        </ul>
      </div>
      <div className="Filter-size Filter" data-cy-state="size-input">
        <div className="label">{t('desired_size')}</div>
        <ul className="options" data-cy-state="size-options">
          <div className="amount-wrapper">
            <div>
              <div className="amount" data-cy-state="width-controls">
                <AmountButton
                  disabled={false}
                  className="minus"
                  onClick={() => decrement('width')}
                  data-cy-handle="decrease-width"
                >
                  <MinusIcon />
                </AmountButton>
                <input
                  type="text"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  onChange={(e) => handleInputAmount(e.target.value, 'width')}
                  onBlur={(e) => checkAmount(e.target.value, 'width')}
                  value={
                    customTailor.data?.size.width ||
                    customTailor.fullData?.sizes.minWidth.value
                  }
                  className="input"
                  data-cy-handle="width-input"
                />

                <AmountButton
                  disabled={false}
                  className="plus"
                  onClick={() => increment('width')}
                  data-cy-handle="increase-width"
                >
                  <PlusIcon />
                </AmountButton>
                <div className="amount-description">
                  {t('width_in_unit', {
                    width:
                      customTailor.fullData?.sizes.minWidth.value +
                      customTailor.fullData?.sizes.minWidth.unit,
                    unit: customTailor.fullData?.sizes.minWidth.unit,
                  })}
                </div>
              </div>
            </div>
            {(customTailor.data?.form === 'rectangular' ||
              customTailor.data?.form === 'oval') && (
              <div data-cy-state="length-controls">
                <div className="amount">
                  <AmountButton
                    disabled={false}
                    className="minus"
                    onClick={() => decrement('length')}
                    data-cy-handle="decrease-length"
                  >
                    <MinusIcon />
                  </AmountButton>
                  <input
                    type="text"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                    onChange={(e) =>
                      handleInputAmount(e.target.value, 'length')
                    }
                    onBlur={(e) => checkAmount(e.target.value, 'length')}
                    value={
                      customTailor.data?.size.length ||
                      customTailor.fullData?.sizes.minHeight.value
                    }
                    className="input"
                    data-cy-handle="length-input"
                  />

                  <AmountButton
                    disabled={false}
                    className="plus"
                    onClick={() => increment('length')}
                    data-cy-handle="increase-length"
                  >
                    <PlusIcon />
                  </AmountButton>
                  <div className="amount-description">
                    {t('length_in_unit', {
                      length:
                        customTailor.fullData?.sizes.minHeight.value +
                        customTailor.fullData?.sizes.minHeight.unit,
                      unit: customTailor.fullData?.sizes.minHeight.unit,
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ul>
      </div>
      <div className="Filter-kind Filter">
        <div className="label">{t('brink_label')}</div>
        <ul className="options brinks" data-cy-state="brink-option">
          {customTailor.fullData?.brinks.map(
            (brink) =>
              (!customTailor.data?.form ||
                !brink.activeAt ||
                brink?.activeAt.includes(customTailor.data.form)) && (
                <li
                  key={brink.type}
                  ref={radioRef}
                  className="hem-option"
                  data-cy-state={
                    customTailor.data?.brink?.type === brink.type &&
                    'brink-selected'
                  }
                >
                  <RadioButton
                    variation="radio"
                    disabled={false}
                    label={
                      brink.type === 'normal'
                        ? t.asText(radioRef, 'normal_brink_type')
                        : t.asText(radioRef, 'cuvert_brink_type')
                    }
                    radiogroup="Saumart"
                    onClick={() => {
                      setCuvert(brink.type === 'cuvert')

                      handleBrink(brink.type)
                    }}
                    checked={customTailor.data?.brink?.type === brink.type}
                    data-cy-handle="set-brink"
                  />
                </li>
              )
          )}
        </ul>
        {isCuvert && (
          <div className="cuvert" data-cy-state="is-cuvert">
            {customTailor.fullData?.brinks
              .filter((brink) => brink.type === 'cuvert')[0]
              .length.map((length) => (
                <span
                  key={length}
                  data-cy-state={
                    length === customTailor.data?.brink?.width &&
                    'brink-width-selected'
                  }
                >
                  <RadioButton
                    checked={length === customTailor.data?.brink?.width}
                    data-cy-handle="brink-width"
                    radiogroup="cuvert-size"
                    onClick={() => handleBrink('cuvert', length)}
                    variation="radio"
                    label={length + 'cm'}
                  />
                </span>
              ))}
          </div>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .Filter {
    width: 100%;
    display: block;
    align-items: center;
    border-top: 1px solid ${theme.colors.shade.b5};
    padding: ${theme.spacing('s')} 0;
    &:first-child {
      border-top: none;
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

    > .cuvert {
      margin-top: -${theme.spacing('xxs')};
      padding-left: ${theme.spacing('m')};
      flex-wrap: wrap;
      display: flex;

      > span > label {
        margin-right: ${theme.spacing('xs')};
      }
    }

    > .options {
      display: flex;
      position: relative;
      flex-wrap: wrap;
      height: 100%;
      margin-top: ${theme.spacing('s')};
      &.brinks {
        display: block;
        > .hem-option {
          margin-bottom: 15px;
        }
      }
      &.shapes {
      }
      > .amount-wrapper {
        > div {
          > .amount-error {
            color: red;
            margin-bottom: ${theme.spacing('xxs')};
          }
          > .amount {
            display: flex;
            margin-right: ${theme.spacing('m')};
            margin-bottom: ${theme.spacing('xs')};
            > .amount-description {
              margin-left: ${theme.spacing('xs')};
              margin-top: ${theme.spacing('xxs')};
            }

            > .input {
              border: 1px solid ${theme.colors.shade.b5};
              border-right: none;
              border-left: none;
              width: 2.5rem;
              outline: 0;
              text-align: center;
              box-sizing: border-box;
              align-items: center;
              height: 1.875rem;

              ${theme.ty('r-base')}
            }
          }
        }
      }

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

      > .hem-option {
        margin-right: ${theme.spacing('xs')};
      }
    }
  }
`

const Option = styled.li<{ selected: boolean; selectable: boolean }>`
  ${theme.rounding('s')}
  justify-content: center;
  display: block;
  flex-wrap: wrap;
  position: relative;
  align-items: center;
  width: 15%;
  margin-bottom: 2rem;
  overflow: hidden;
  margin-bottom: 0px;
  margin-right: 1.625rem;
  cursor: pointer;
  > .icon-description {
    text-align: center;
    ${theme.ty('r-xs')}
    @media (min-width: 765px) {
      align-self: center;
      ${theme.ty('r-s')}
    }
  }
  > .svg-wrapper {
    width: 100%;
    align-self: flex-start;
    @media (min-width: 410px) {
      align-self: center;
    }
    height: 50px;
    > svg {
      width: 100%;
    }
    > img {
      width: 100%;
      height: 100%;
    }
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
        top: 28%;
        transform: translate(-50%, -50%);
      }
    `}
`

const AmountButton = styled.button<{ disabled: boolean }>`
  width: 1.875rem;
  height: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.shade.b5};
  ${theme.rounding('s')}

  > svg > g > g {
    stroke: ${theme.colors.b0};
  }

  &.minus {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &.plus {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
      > svg > g > g {
        stroke: ${theme.colors.shade.b5};
      }
    `}
`
