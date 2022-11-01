import * as React from 'react'
import styled, { css } from 'styled-components'
import Button from 'theme/atoms/Button'
import DeliveryInfo from 'theme/molecules/DeliveryInfo'
import { useCustomTailor, useDisplayVariant } from 'modules/productDetail'
import Price, * as Prices from 'theme/atoms/Price'
import PlusIcon from 'assets/plus.svg'
import MinusIcon from 'assets/minus.svg'
import Filter from './Filter'
import { useCart } from 'modules/cart'
import ScalePrice from './ScalePrice'
import theme from 'theme'
import ColorFilter from './ColorFilter'
import EnergyLabel from 'theme/atoms/EnergyLabel'
import config from 'config'
import calculateDeliveryDate from 'utils/calculateDeliveryDate'
import B2cSwitch from 'theme/atoms/B2cSwitch'
import TailSpin from 'assets/tail-spin.svg'
import useTranslations from 'hooks/useTranslations'
import Link from 'theme/atoms/Link'
import ArrowLink from 'assets/link-arrow.svg'
import { slugifyWithSlashes } from 'utils/slugify'
import BundlerBtn from './BundlerBtn'
import CustomizableFilter from './CustomizableFilter/CustomizableFilter'
import getSquareM from './CustomizableFilter/getSquareM'

type Props = {
  openFilterDrawer: () => void
  brandPath: string
}

export default function BuyBox(props: Props) {
  const variant = useDisplayVariant()
  const t = useTranslations<'templates-PDP'>()
  const cart = useCart()
  const [amount, setAmount] = React.useState(1)
  const customTailor = useCustomTailor()
  const [priceAvailable, setPriceAvailable] = React.useState(false)

  const isCustomTailor =
    variant.data?.configurations.custom_tailor.is_custom_tailor
  const isSelfBrand = ['VEGA', 'PULSIVA', 'JOBELINE', 'ERWIN M.'].includes(
    variant.data.brand
  )
  const [addingProductToCart, setAddingProductToCart] = React.useState(false)

  const increment = () => amount < 999 && setAmount(amount + 1)
  const decrement = () => amount > 1 && setAmount(amount - 1)

  const deliveryInformations = React.useMemo(
    () => calculateDeliveryDate(variant.data, amount),
    [variant, amount]
  )

  const handleInputAmount = (value) => {
    // remove any chars except numbers
    let newAmount = value.replace(/[^0-9]/g, '')
    newAmount = parseInt(newAmount, 10)

    if (value === '' || !newAmount) setAmount(1)
    else if (newAmount > 999) setAmount(999)
    else setAmount(newAmount)
  }

  const getSinglePrice = (price) => {
    let calc =
      price * getSquareM(customTailor.data?.form, customTailor.data?.size)
    calc =
      Math.ceil(
        calc * getAdditionalPercent(customTailor.data?.brink.type) * 100
      ) / 100
    return calc
  }

  const addToCart = () => {
    if (!addingProductToCart) {
      if (!isCustomTailor) {
        cart.addItem({ sku: variant.data.sku, amount })
      } else {
        if (customTailor.data?.form) {
          const config = {
            ...customTailor.data,
            squareM: `${getSquareM(
              customTailor.data?.form,
              customTailor.data?.size
            )}`,
            size: {
              ...customTailor.data?.size,
              width: `${customTailor.data?.size?.width}`,
              length: `${customTailor.data?.size?.length}`,
            },
            brink: {
              ...customTailor.data?.brink,
              type: customTailor.data?.brink?.type,
              width: `${customTailor.data?.brink?.width}`,
            },
            amount: `${amount}`,
            price: `${getSinglePrice(variant.data.prices.packPriceNet)}`,
            priceTotal: {
              net: `${
                getSinglePrice(variant.data.prices.packPriceNet) * amount
              }`,
              gross: `${
                getSinglePrice(variant.data.prices.packPriceGross) * amount
              }`,
            },
          }

          cart.addItem({ sku: variant.data.sku, amount, config })
        }
      }
    }
  }

  const getAdditionalPercent = (brinktype) => {
    return (
      (customTailor.fullData?.brinks.find((brink) => brink.type === brinktype)
        ?.additionalPricePercent || 0) + 1
    )
  }

  const brandUrl = isSelfBrand
    ? slugifyWithSlashes(`/category/${props.brandPath}/${variant.data.brand}/`)
    : ''

  React.useEffect(() => {
    setAddingProductToCart(cart.isUpdating)
  }, [cart.isUpdating])

  React.useEffect(() => {
    customTailor.set('amount', amount)
  }, [amount])

  React.useEffect(() => {
    if (
      customTailor.data?.form &&
      customTailor.data?.size &&
      customTailor.data?.brink &&
      customTailor.data?.brink.type
    ) {
      if (
        customTailor.data?.brink.type === 'cuvert' &&
        customTailor.data?.brink.width === undefined
      ) {
        setPriceAvailable(false)
      } else {
        setPriceAvailable(true)
      }
    } else {
      setPriceAvailable(false)
    }
  }, [
    customTailor.data?.form,
    customTailor.data?.brink,
    customTailor.data?.size,
  ])
  return (
    <Wrapper
      className="BuyBox"
      isFetching={!!variant.data.isDummy}
    >
      {variant.data.attributes.BRAND &&
        variant.data.attributes.BRAND.values.map((brand, i) => {
          return (
            <Link to={brandUrl} key={i} className="brand">
              {brand?.icon !== undefined && (
                <div className="logo" data-cy-state="has-brand-logo">
                  <img
                    src={config.modules.cloudinary.endpoint + brand?.icon || ''}
                    alt={`${brand?.value}`}
                  />
                </div>
              )}
              <div className="label">{brand?.value}</div>
            </Link>
          )
        })}

      <h3>{variant.data.title}</h3>
      <div className="sub-title" data-cy-handle={'subtitle'}>
        {variant.data.subtitle}
      </div>
      {variant.data.product_line && variant.data.product_line?.length > 0 && (
        <div className="series-link" data-cy-state>
          <Link to={`/series/${variant.data.product_line[0]}/`}>
            <ArrowLink />
            {t('series_link', {
              seriesName:
                variant.data.series && variant.data.series.length
                  ? variant.data.series[0]
                  : '',
            })}
          </Link>
        </div>
      )}
      <div className="price-wrapper">
        <div className="price">
          <div className="price-list">
            <div className="display-price-big" data-cy-handle="piece-price">
              <Price
                prices={variant.data.prices}
                logic="piece"
                amount={amount}
                scalePrice={variant.data.priceRules}
              />
            </div>

            {Prices.PriceHasStrikePrice(variant.data, amount) && (
              <>
                <div
                  className="strike price"
                  data-cy-state="has-strike-price:piece"
                >
                  <Prices.PriceStrike
                    prices={variant.data.prices}
                    logic="piece"
                    amount={amount}
                    scalePrice={variant.data.priceRules}
                  />
                </div>
                <div
                  className="reduction"
                  data-cy-state="has-strike-price:piece-reduction"
                >
                  <Prices.PriceReduction
                    prices={variant.data.prices}
                    logic="piece"
                    amount={amount}
                    scalePrice={variant.data.priceRules}
                  />
                </div>
              </>
            )}
          </div>
          <div className="additional-info-text-s">
            <span>{t('per_piece_text')}</span>
            <span>&#160;{variant.data.unit.unitName}</span>
            {(variant.data.prices.referencePriceNetString ||
              variant.data.prices.referencePriceGrossString) && (
              <Prices.PriceBaseprice
                prices={variant.data.prices}
                logic="base"
                data-cy-state="has-baseprice"
                data-cy-handle="baseprice"
              />
            )}
            <B2cSwitch.B2B>, </B2cSwitch.B2B>
            <Prices.PriceB2BGrossInfo
              prices={variant.data.prices}
              scalePrice={variant.data.priceRules}
              amount={amount}
              logic="piece"
            />
          </div>
        </div>

        <div className="special-icon">
          {variant.data.attributes?.ENERGY_EFFICIENCY_CLASS && (
            <EnergyLabel
              data-cy-state="show-energy-label"
              data-cy-handle="energylabel-modal"
              energyLabelLink={
                variant.data.attributes.ENERGY_LABEL?.values[0].document || null
              }
              label={
                variant.data.attributes.ENERGY_EFFICIENCY_CLASS?.values[0]
                  .value || ''
              }
              size="medium"
            />
          )}
          {variant.data.attributes?.WARRANTY_REPURCHASE &&
            !variant.data.attributes?.ENERGY_EFFICIENCY_CLASS && (
              <Nachkaufgarantie
                data-cy-state={'show-warrantyRepurchase'}
                imgSrc={
                  config.modules.cloudinary.endpoint +
                    variant.data.attributes.WARRANTY_REPURCHASE.values[0]
                      .icon || ''
                }
                title={
                  variant.data.attributes.WARRANTY_REPURCHASE.values[0].value +
                  ' ' +
                  variant.data.attributes.WARRANTY_REPURCHASE.label
                }
              />
            )}
        </div>
      </div>

      <div className="filters" data-cy-state>
        <ColorFilter onMoreClick={props.openFilterDrawer} />
        {isCustomTailor && (
          <CustomizableFilter
            onInteract={props.openFilterDrawer}
            data-cy-state="custom-tailor-filter"
            amount={amount}
          />
        )}
        <Filter
          filterKey="size"
          label="size_label"
          onInteract={props.openFilterDrawer}
        />
        <Filter
          filterKey="variant"
          label="variant_label"
          onInteract={props.openFilterDrawer}
        />
        <Filter
          filterKey="style"
          label="style_label"
          onInteract={props.openFilterDrawer}
        />
      </div>

      <div className="price-wrapper">
        <div className="price">
          {priceAvailable ? (
            <div data-cy-state="customtailor-price" className="price-list">
              <div
                className="display-price-big"
                data-cy-handle="pack-price-sum"
              >
                <Prices.CustomTailorPrice
                  logic={'pack'}
                  prices={variant.data.prices}
                  amount={amount}
                  squareM={getSquareM(
                    customTailor.data?.form || 0,
                    customTailor.data?.size || 0
                  )}
                  additionalPrice={getAdditionalPercent(
                    customTailor.data?.brink.type
                  )}
                />
              </div>
            </div>
          ) : (
            <div data-cy-state="price-big" className="price-list">
              <div
                className="display-price-big"
                data-cy-handle="pack-price-sum"
              >
                <Price
                  prices={variant.data.prices}
                  logic="pack"
                  amount={amount}
                  scalePrice={variant.data.priceRules}
                />
              </div>
              {Prices.PriceHasStrikePrice(variant.data, amount) && (
                <div
                  className="strike price strike"
                  data-cy-state="has-strike-price:pack"
                >
                  <Prices.PriceStrike
                    prices={variant.data.prices}
                    logic="pack"
                    amount={amount}
                    scalePrice={variant.data.priceRules}
                  />
                </div>
              )}
            </div>
          )}

          <div className="additional-info-text-s" data-cy-handle="price-info">
            {variant.data.unit.purchaseUnit > 1 && (
              <span data-cy-state="pack-information">
                {variant.data.unit.purchaseUnit} {variant.data.unit.unitName}{' '}
                /&#160;
                {variant.data.unit.packUnit}&#160;
              </span>
            )}
            {priceAvailable ? (
              <div data-cy-state="customTailorB2BGrossInfo">
                <Prices.CustomTailorB2BGrossInfo
                  prices={variant.data.prices}
                  logic="pack"
                  amount={amount}
                  squareM={getSquareM(
                    customTailor.data?.form || 0,
                    customTailor.data?.size || 0
                  )}
                  additionalPrice={getAdditionalPercent(
                    customTailor.data?.brink.type
                  )}
                />
              </div>
            ) : (
              <Prices.PriceB2BGrossInfo
                prices={variant.data.prices}
                logic="pack"
                amount={amount}
                scalePrice={variant.data.priceRules}
              />
            )}
            <Prices.PriceB2CNetInfo />
            <div className="additional-info-ecoTax">
              {(variant.data.prices.ecoTaxNet ||
                variant.data.prices.ecoTaxGross) && (
                <Prices.EcoTax
                  prices={variant.data.prices}
                  amount={amount}
                  data-cy-state={'hasEcoTax'}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="price-rules">
        {variant.data.priceRules.length > 1 && (
          <ScalePrice
            priceRules={variant.data.priceRules}
            amount={amount}
            data-cy-state="has-scaleprice-table"
          />
        )}
      </div>

      <div className="buy-wrapper">
        {variant.data.sellable && (
          <div className="amount" data-cy-state="has-amount-controls">
            <AmountButton
              disabled={amount === 1}
              className="minus"
              onClick={decrement}
              data-cy-handle="decrease-amount"
            >
              <MinusIcon />
            </AmountButton>
            <input
              type="text"
              onClick={(e) => (e.target as HTMLInputElement).select()}
              onChange={(e) => handleInputAmount(e.target.value)}
              value={amount}
              className="input"
              data-cy-handle="amount"
            />

            <AmountButton
              disabled={amount === 999}
              className="plus"
              onClick={increment}
              data-cy-handle="increase-amount"
            >
              <PlusIcon />
            </AmountButton>
          </div>
        )}

        {variant.data.sellable && deliveryInformations.isBuyable ? (
          isCustomTailor && !priceAvailable ? (
            <div className="buy-wrapper" data-cy-state="not-customized">
              <Button
                variation="cart_disabled"
                data-cy-handle="uncustomized-button"
                className="sold-out-button"
                fullWidth
                onClick={props.openFilterDrawer}
              >
                {t('please_customize')}
              </Button>
            </div>
          ) : (
            <Button
              variation="cart"
              data-cy-state="is-sellable"
              data-cy-handle="add-to-cart"
              onClick={addToCart}
              fullWidth
            >
              {addingProductToCart && (
                <TailSpin data-cy-state="adding-to-cart" />
              )}
              {t('add_to_cart_btn')}
            </Button>
          )
        ) : (
          <div className="buy-wrapper" data-cy-state="not-sellable">
            <Button
              variation="cart_disabled"
              data-cy-handle="add-to-cart"
              className="sold-out-button"
              fullWidth
            >
              {t('sold_out_btn')}
            </Button>
          </div>
        )}
      </div>
      {variant.data.sellable &&
        deliveryInformations.isBuyable &&
        variant.data.related?.configurableRelations?.length !== 0 && (
          <BundlerBtn data-cy-state="is-configurable" variant={variant} />
        )}

      <DeliveryInfo {...deliveryInformations} />
      {variant.data.attributes?.DISPOSAL_OF_LEGACY_DEVICE &&
        config.features.disposalOfLegacyDevice && (
          <div className="disposal-legacy-device" data-cy-state="legacyDevice">
            <Link to={config.features.disposalOfLegacyDevice as string}>
              <DisposalDevice
                imgSrc={
                  config.modules.cloudinary.endpoint +
                    variant.data.attributes.DISPOSAL_OF_LEGACY_DEVICE.values[0]
                      .icon || ''
                }
                title={variant.data.attributes.DISPOSAL_OF_LEGACY_DEVICE.label}
              />
            </Link>
          </div>
        )}
    </Wrapper>
  )
}
type AttributesProps = {
  title: string
  imgSrc: string
}
const DisposalDevice = styled.figure.attrs<AttributesProps>((p) => ({
  title: p.title,
}))`
  display: inline-block;
  margin: 0;
  width: 177px;
  height: 45px;
  background-image: url(${(props: AttributesProps) => props.imgSrc});
  background-repeat: no-repeat;
  background-size: contain;
`

const Nachkaufgarantie = styled.figure.attrs<AttributesProps>((p) => ({
  title: p.title,
}))`
  display: inline-block;
  margin: 0;
  width: 43px;
  height: 43px;
  background-image: url(${(props: AttributesProps) => props.imgSrc});
  background-repeat: no-repeat;
  background-size: contain;
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

const Wrapper = styled.div<{ isFetching: boolean }>`
  ${(props) =>
    props.isFetching &&
    `
      * {
          color: transparent !important;
          text-shadow: 0 0 15px rgba(0,0,0,0.5) !important;
      }
  `}
  > .disposal-legacy-device {
    margin-top: ${theme.spacing('ml')};
    display: flex;
    justify-content: end;
  }
  > .brand {
    ${theme.ty('r-base')}
    margin-bottom: ${theme.spacing('xs')};
    display: flex;

    > .logo {
      margin-right: ${theme.spacing('xs')};
      margin-top: 0.125rem;
      img {
        max-height: 1.1875rem;
      }
    }
  }

  > h3 {
    ${theme.ty('rc-2xl')}

    margin-bottom: ${theme.spacing('xxs')};
  }

  > .sub-title {
    ${theme.ty('r-s')};
    color: ${theme.colors.shade.b3};
    margin-bottom: ${theme.spacing('xs')};
  }

  > .series-link {
    ${theme.ty('r-base')};
    margin-bottom: ${theme.spacing('xs')};
    > a {
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }

      > svg {
        height: 12px;
        margin-right: ${theme.spacing('xs')};
      }
    }
  }

  > .price-wrapper {
    display: flex;
    margin-bottom: ${theme.spacing('s')};

    > .price {
      flex: 1;
      > .price-list {
        display: flex;
        > * {
          margin-left: ${theme.spacing('s')};
          &:first-child {
            margin-left: 0;
          }
        }
        align-items: flex-end;
        > .display-price-big {
          ${theme.ty('r-2xl')};
          color: ${theme.colors.b0};
        }

        > .strike {
          ${theme.ty('r-base')}
        }
        .reduction {
        }

        > .reduction {
          color: ${theme.colors.accent.pink};
          ${theme._ty([16, 0, 22], theme.fontSpecial, '700')}
        }

        /* set every price to same baseline */
        line-height: 26px;
        align-items: baseline;
      }

      .additional-info-text-s {
        color: ${theme.colors.shade.b3};
        > .additional-info-ecoTax {
          ${theme.ty('r-s')}
        }
        > span {
          ${theme.ty('r-s')}
          color: ${theme.colors.shade.b3}
        }
      }
    }

    > .special-icon {
      > .Energylabel {
        left: -12px;
      }
    }
  }

  > .filters {
    margin-bottom: ${theme.spacing('s')};
    > div {
      > .label {
        ${theme._ty([16, 0.4, 22], theme.fontSpecial, '400')}
      }
    }
  }

  > .buy-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: ${theme.spacing('m')};
    flex-wrap: nowrap;

    > .amount {
      display: flex;
      margin-right: ${theme.spacing('m')};

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

    > button {
      text-align: center;
      > svg {
        height: 1rem;
        width: 1rem;
        margin-right: ${theme.spacing('xs')};
      }
      &.sold-out-button {
        cursor: not-allowed;
      }
    }
    > .heart-icon {
      margin-left: 14px;
      width: 30px;
    }
  }

  > .delivery {
    display: flex;
    align-items: center;
    color: ${theme.colors.shade.b2};
    > svg {
      margin-right: ${theme.spacing('xs')};
      width: 1.25rem;
      color: ${theme.colors.accent.green};
    }
  }
`
