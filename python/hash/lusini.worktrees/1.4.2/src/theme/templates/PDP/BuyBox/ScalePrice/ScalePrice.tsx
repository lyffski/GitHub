import useTranslations from 'hooks/useTranslations'
import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import Price from 'theme/atoms/Price'

type scalePrice = {
  customerGroupKey: string
  from: number
  to: number | string
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
}
type Props = {
  priceRules: scalePrice[]
  amount?: number
  'data-cy-state'?: string
}

export default function ScalePrice(props: Props) {
  const scalePrices = props.priceRules
  const t = useTranslations<'templates-PDP'>()
  const amount = props.amount || 1

  return (
    <Wrapper data-cy-state={props['data-cy-state']}>
      {scalePrices.map((price, i) => {
        if (i == 0) return false
        return (
          <Item
            active={
              amount >= price.from &&
              (amount <= price.to || typeof price.to === 'string')
            }
            key={i}
          >
            {t('price_range_from')} {price.from}:{' '}
            <Price prices={price} logic={'pack'} />
          </Item>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: ${theme.spacing('s')} 0;
  padding: 0px;
`

const Item = styled.li<{ active: boolean }>`
  flex: 1;
  ${theme.ty('r-s')}
  color: ${theme.colors.shade.b3};
  width: 7rem;
  margin-bottom: 0.2rem;

  font-weight: ${(p) => (p.active ? 'bold' : 'normal')};
`
