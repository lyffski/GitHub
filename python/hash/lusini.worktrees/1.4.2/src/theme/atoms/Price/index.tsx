/* eslint-disable @kaminrunde/firescout/jsx-expression-needs-state */
import * as React from 'react'
import config from 'config'
import B2cSwitch from 'theme/atoms/B2cSwitch'
import styled from 'styled-components'
import priceStr from 'utils/priceString'
import withTranslations from './withTranslations'
import useTranslations from 'hooks/useTranslations'

type Prices = {
  ecoTaxNet: number | null
  ecoTaxGross: number | null
  packPriceNet: number
  packPriceGross: number
  piecePriceNet: number
  piecePriceGross: number
  packPseudoPriceNet: number
  packPseudoPriceGross: number
  piecePseudoPriceNet: number
  piecePseudoPriceGross: number
  referencePriceNet: null | number
  referencePriceGross: null | number
  referencePriceNetString?: string | null
  referencePriceGrossString?: string | null
  productCheapestPiecePriceGross?: number | null
  productCheapestPiecePriceNet?: number | null
}

type ScalePrice = Prices & {
  customerGroupKey: string
  from: number
  to: number | string
}

type Props = {
  logic: 'piece' | 'pack' | 'packPseudo' | 'piecePseudo' | 'base'
  prices: Prices
  amount?: number
  scalePrice?: ScalePrice[] | undefined
  'data-cy-state'?: string
  'data-cy-handle'?: string
  squareM?: number
  additionalPrice?: number
}

const getPrices = (props: Props) => {
  const amount = props.amount || 1
  let prices: Prices | ScalePrice[] | undefined = props.prices

  if (props.scalePrice) {
    if (props.scalePrice.length > 1) {
      prices = props.scalePrice.find(
        (sPrice) =>
          sPrice.from <= amount &&
          (amount <= sPrice.to || sPrice.to === 'beliebig')
      )
    }
  }
  if (!prices) return props.prices
  return prices
}
/**
 * if you want to check if strike price exists call `Price.hasStrikePrice`
 */
export default withTranslations(Price)

function Price(props: Props) {
  let amount = props.amount || 1
  const prices = getPrices(props)
  if (!prices) return null
  const net = prices[props.logic + 'PriceNet']
  const gross = prices[props.logic + 'PriceGross']
  if (props.logic == 'piece' || props.logic == 'piecePseudo') amount = 1

  return (
    <>
      {<B2cSwitch.B2B>{priceStr(net * amount)}</B2cSwitch.B2B>}
      {<B2cSwitch.B2C>{priceStr(gross * amount)}</B2cSwitch.B2C>}
    </>
  )
}

export function CustomTailorPrice(props: Props) {
  let amount = props.amount || 1
  const prices = getPrices(props)
  if (!prices || !props.squareM) return null
  const net = prices[props.logic + 'PriceNet']
  const gross = prices[props.logic + 'PriceGross']
  if (props.logic == 'piece' || props.logic == 'piecePseudo') amount = 1
  // Price wird bei Saumart Cuvert mit 1,2 multipliziert

  let addPrice = props.squareM
  if (props.additionalPrice) {
    addPrice = addPrice * props.additionalPrice
  }
  const endPriceNet = Math.ceil(net * 100 * addPrice) / 100
  const endPriceGross =
    (Math.ceil(net * 100 * addPrice) / 100) * getTax(gross, net)
  return (
    <>
      {<B2cSwitch.B2B>{priceStr(endPriceNet * amount)}</B2cSwitch.B2B>}
      {<B2cSwitch.B2C>{priceStr(endPriceGross * amount)}</B2cSwitch.B2C>}
    </>
  )
}

export function Cheapest(props: Props) {
  const prices = getPrices(props)
  if (!prices) return null
  const net = prices['productCheapestPiecePriceNet'] || '0'
  const gross = prices['productCheapestPiecePriceGross'] || '0'

  return (
    <>
      {<B2cSwitch.B2B>{priceStr(net)}</B2cSwitch.B2B>}
      {<B2cSwitch.B2C>{priceStr(gross)}</B2cSwitch.B2C>}
    </>
  )
}

export function PriceReduction(props: Props) {
  const prices = getPrices(props)
  const net = prices[props.logic + 'PriceNet']
  const gross = prices[props.logic + 'PriceGross']
  const netPseudo = prices[props.logic + 'PseudoPriceNet']
  const grossPseudo = prices[props.logic + 'PseudoPriceGross']
  return (
    <>
      {Boolean(net) && (
        <B2cSwitch.B2B>{reduction(net, netPseudo)}</B2cSwitch.B2B>
      )}
      {Boolean(gross) && (
        <B2cSwitch.B2C>{reduction(gross, grossPseudo)}</B2cSwitch.B2C>
      )}
    </>
  )
}

export function PriceStrike(props: Props) {
  const prices = getPrices(props)
  const net = prices[props.logic + 'PriceNet']
  const gross = prices[props.logic + 'PriceGross']
  const netPseudo = prices[props.logic + 'PseudoPriceNet']
  const grossPseudo = prices[props.logic + 'PseudoPriceGross']
  return (
    <>
      {Boolean(net) && (
        <B2cSwitch.B2B>
          <StrikePrice>{priceStr(netPseudo)}</StrikePrice>
        </B2cSwitch.B2B>
      )}
      {Boolean(gross) && (
        <B2cSwitch.B2C>
          <StrikePrice>{priceStr(grossPseudo)}</StrikePrice>
        </B2cSwitch.B2C>
      )}
    </>
  )
}

export const PriceB2BGrossInfo = withTranslations(function PriceB2BGrossInfo(
  props: Props
) {
  const t = useTranslations<'prices'>()
  let amount = props.amount || 1
  const prices = getPrices(props)
  const gross = prices[props.logic + 'PriceGross']
  if (props.logic === 'piece') amount = 1

  return (
    <>
      {Boolean(gross) && (
        <B2cSwitch.B2B>
          ({t('incl_tax')} {priceStr(gross * amount)})
        </B2cSwitch.B2B>
      )}
    </>
  )
})

const getTax = (gross, net) => {
  return Math.round((gross / net) * 100) / 100
}

export const CustomTailorB2BGrossInfo = withTranslations(
  function PriceB2BGrossInfo(props: Props) {
    const t = useTranslations<'prices'>()
    let amount = props.amount || 1
    const prices = getPrices(props)
    const net = prices[props.logic + 'PriceNet']
    const gross = prices[props.logic + 'PriceGross']
    if (props.logic === 'piece') amount = 1
    if (!props.squareM) return null
    // Price wird bei Saumart Cuvert mit 1,2 multipliziert
    let addPrice = props.squareM
    if (props.additionalPrice) {
      addPrice = addPrice * props.additionalPrice
    }

    const endPriceGross =
      (Math.ceil(net * 100 * addPrice) / 100) * amount * getTax(gross, net)
    return (
      <>
        {Boolean(gross) && (
          <B2cSwitch.B2B>
            ({t('incl_tax')} {priceStr(endPriceGross)})
          </B2cSwitch.B2B>
        )}
      </>
    )
  }
)

export const PriceB2CNetInfo = withTranslations(function PriceB2CNetInfo() {
  const t = useTranslations<'prices'>()
  return (
    <B2cSwitch.B2C>
      ({t('incl_tax')} {t('excl_delivery_costs')})
    </B2cSwitch.B2C>
  )
})

export const EcoTax = withTranslations(function EcoTax(props: Props) {
  const amount = props.amount || 1

  const t = useTranslations<'prices'>()
  return (
    <span data-cy-state={props['data-cy-state']}>
      <B2cSwitch.B2B>
        {t('eco_tax', {
          ecoTax: priceStr((props.prices.ecoTaxNet || 0) * amount),
        })}
      </B2cSwitch.B2B>
      <B2cSwitch.B2C>
        {t('eco_tax', {
          ecoTax: priceStr((props.prices.ecoTaxGross || 0) * amount),
        })}
      </B2cSwitch.B2C>
    </span>
  )
})

export function PriceBaseprice(props: Props) {
  return (
    <span
      data-cy-state={props['data-cy-state']}
      data-cy-handle={props['data-cy-handle']}
    >
      <B2cSwitch.B2B>, {props.prices.referencePriceNetString}</B2cSwitch.B2B>
      <B2cSwitch.B2C>, {props.prices.referencePriceGrossString}</B2cSwitch.B2C>
    </span>
  )
}

/** if at least one pseudo price exists, every pseudo price must be set */
export function PriceHasStrikePrice({ prices, priceRules }, amount) {
  const calcPrices = getPrices({
    prices,
    scalePrice: priceRules,
    amount,
    logic: 'piece',
  })
  if (calcPrices.packPseudoPriceNet !== 0) {
    return true
  }
  return false
}

export const PriceFrom = withTranslations(function PriceFrom() {
  const t = useTranslations<'prices'>()
  return t('from')
})

export const PriceTo = withTranslations(function PriceTo() {
  const t = useTranslations<'prices'>()
  return t('to')
})

export const PriceExclTax = withTranslations(function PriceExclTax() {
  const t = useTranslations<'prices'>()
  return t('excl_tax')
})

export const reduction = (
  price: number | string,
  pseudoPrice: number | string
) => {
  price = typeof price === 'string' ? parseFloat(price) : price
  pseudoPrice =
    typeof pseudoPrice === 'string' ? parseFloat(pseudoPrice) : pseudoPrice
  const reduction = 1 - price / pseudoPrice

  if (parseInt((reduction * 100).toString()) === 0) return ''

  return (
    '-' +
    reduction.toLocaleString(config.i18n.locale, {
      style: 'percent',
    })
  )
}

const StrikePrice = styled.span`
  text-decoration: line-through;
  color: gray;
`
