import * as React from 'react'
import styled, { css } from 'styled-components'
import * as Prices from 'theme/atoms/Price'
import * as t from './types'
import theme from 'theme'
import useTranslations from 'hooks/useTranslations'

export default function Flags(props: t.Props) {
  /**  @firescoutMockVar molecules-Flags.t */
  const t = useTranslations<'molecules-Flags'>()
  const labels: any[] = []

  if (!props.product.flags.length) return null

  if (props.product.flags.length > 0) {
    props.product.flags.map((flag) => {
      if (flag === 'sale') {
        if (
          Prices.reduction(
            props.product.prices.piecePriceNet,
            props.product.prices.piecePseudoPriceNet
          ) !== ''
        ) {
          labels.push(
            <span className="reduced" data-cy-state="has-reduction-prozent">
              <Prices.PriceReduction
                prices={props.product.prices}
                logic="piece"
              />
            </span>
          )
        }
      } else {
        if (t(flag as t.Flags)) {
          labels.push(
            <span data-cy-state="has-dynamic-flag">{t(flag as t.Flags)}</span>
          )
        }
      }
    })
  }

  return (
    <Wrapper
      data-cy-ctx="molecules/Flags"
      className={'Flags'}
      type={props.type}
    >
      {labels.map((label, i) => (
        <span key={i}>
          {i > 0 && ' / '}
          {label}
        </span>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div<t.WrapperProps>`
  background-color: ${theme.colors.shade.primaryUltraBright};
  border-radius: ${theme.rounding('s')};
  border-bottom-left-radius: 0;
  ${theme._ty([13, 0, 24], theme.fontSpecial, '700')}

  ${(p) =>
    p.type === 'pdp' &&
    css`
      padding: 0.3125rem 1.25rem 0.3125rem 1.25rem;
    `}
    ${(p) =>
    p.type === 'widget' &&
    css`
      padding: 0 ${theme.spacing('s')};
    `}

  > span > .reduced {
    color: ${theme.colors.accent.pink};
  }
`
