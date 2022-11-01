import * as React from 'react'
import styled from 'styled-components'
import { useCart } from 'modules/cart'
import Link from 'theme/atoms/Link'
// import { FiShoppingCart } from 'react-icons/fi'
import Shopping from 'assets/shopping.svg'
import { ms } from 'modules/browser/const'
import theme from 'theme'

export default function CartIcon() {
  const cart = useCart()
  return (
    <Wrapper to="/cart/" className="CartIcon" data-cy-handle="cart-icon">
      <div className="icon">
        <Shopping />
      </div>

      {Boolean(cart.data.items.length) && (
        <span className="badge" data-cy-state="show-cart-items-amount">
          {cart.data.items.length}
        </span>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(Link)`
  text-decoration: none;
  display: block;
  position: relative;
  &.desktop {
    display: none;
  }
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .label {
    display: none;
  }
  @media (min-width: ${ms.LG}px) {
    &.mobile {
      display: none;
    }
    &.desktop {
      display: flex;
    }
    > .label {
      display: block;
      ${theme.ty('r-base')}
    }
  }

  > .badge {
    position: absolute;
    right: -8px;
    top: -10px;
    width: 1.25rem;
    height: 1.25rem;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.white};
    border-radius: 50%;
    ${theme._ty([12, 0, 18], theme.font, '700')}
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
