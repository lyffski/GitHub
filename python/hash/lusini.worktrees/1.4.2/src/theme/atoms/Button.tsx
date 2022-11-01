import * as React from 'react'
import styled, { css } from 'styled-components'
import theme from 'theme'
import Link from './Link'

type Variation =
  | 'primary'
  | 'secondary'
  | 'primary_s'
  | 'secondary_s'
  | 'cart'
  | 'cart_disabled'
  | 'special'
  | 'special_s'
  | 'special_s'
  | 'language_s'
  | 'language_active'

type Props = {
  children?: React.ReactNode
  className?: string
  variation: Variation
  to?: string
  fullWidth?: boolean
  onClick?: () => void
  ref?: any
}

export default React.forwardRef(function Button(props: Props, ref: any) {
  const { className, variation, to, children, ...rest } = props
  if (to) {
    return (
      // eslint-disable-next-line @kaminrunde/firescout/onclick-needs-handle
      <Wrapper
        as={Link}
        ref={ref}
        className={`Button ${variation} ${className ? className : ''}`}
        to={to}
        {...rest}
      >
        {children}
      </Wrapper>
    )
  }

  return (
    // eslint-disable-next-line @kaminrunde/firescout/onclick-needs-handle
    <Wrapper
      className={`Button ${variation} ${className ? className : ''}`}
      ref={ref}
      {...rest}
    >
      {children}
    </Wrapper>
  )
}) as React.ComponentType<Props>

const Wrapper = styled.button<{ fullWidth?: boolean }>`
  ${theme.ty('rc-base', '700')};
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  display: block;
  box-sizing: border-box;

  ${(p) =>
    p.fullWidth &&
    css`
      width: 100%;
    `}

  &:focus,
  &:active {
    outline: none;
  }

  &.primary,
  &.secondary,
  &.special {
    padding: ${theme.spacing('xs')} ${theme.spacing('xl')};
    ${theme.rounding('m')};
  }

  &.primary {
    background: ${theme.colors.b0};
    color: ${theme.colors.white};
    border-color: ${theme.colors.b0};
  }

  &.secondary {
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.shade.b3};
    color: ${theme.colors.shade.b2};
  }

  &.primary_s,
  &.secondary_s,
  &.special_s {
    padding: ${theme.spacing('xxs')} ${theme.spacing('m')};
    ${theme.rounding('s')};
    border: 1px solid ${theme.colors.shade.b2};
  }

  &.primary_s {
    background: ${theme.colors.shade.b2};
    color: ${theme.colors.white};
  }

  &.secondary_s {
    background: ${theme.colors.white};
    color: ${theme.colors.shade.b2};
  }

  &.cart,
  &.cart_disabled {
    background: ${theme.colors.b0};
    color: ${theme.colors.white};
    border-color: ${theme.colors.b0};
    padding: ${theme.spacing('xs')} ${theme.spacing('xs')};
    ${theme.rounding('m')};
    &.cart_disabled {
      background: ${theme.colors.white};
      color: ${theme.colors.shade.b2};
      border: 1px solid ${theme.colors.shade.b2};
    }
  }

  &.special {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.primary};
  }
  &.special_s {
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }

  &.language_s {
    padding: ${theme.spacing('m')} ${theme.spacing('l')};
    ${theme.ty('rc-l')};
    background: ${theme.colors.shade.primaryUltraBright};
    color: ${theme.colors.b0};
    border-color: ${theme.colors.shade.primaryUltraBright};
    border-radius: ${theme.spacing('xxs')};
    max-width: 12.5rem;
  }
  &.language_active {
    padding: ${theme.spacing('m')} ${theme.spacing('l')};
    ${theme.ty('rc-l', '700')};
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.primary};
    border-radius: ${theme.spacing('xxs')};
    max-width: 12.5rem;
    cursor: default;
  }
`
