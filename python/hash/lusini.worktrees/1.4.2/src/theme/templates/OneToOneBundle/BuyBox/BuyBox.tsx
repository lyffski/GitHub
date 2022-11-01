import * as React from 'react'
import styled, { css } from 'styled-components'
import { Product } from '../types'
import PlusIcon from 'assets/plus.svg'
import MinusIcon from 'assets/minus.svg'
import Button from 'theme/atoms/Button'
import { useCart } from 'modules/cart'
import theme from 'theme'
import TailSpin from 'assets/tail-spin.svg'
import CartSvg from 'assets/cart.svg'
import Price from './Price'
import * as events from '../events'
import useTranslations from 'hooks/useTranslations'

type Props = {
  firstProduct: Product
  secondProduct: Product
  startedFrom: string
}

export default function BuyBox(props: Props) {
  const t = useTranslations<'templates-OneToOneBundle'>()
  const { firstProduct, secondProduct, startedFrom } = props

  const cart = useCart()
  const [amount, setAmount] = React.useState(1)
  const [addingProductToCart, setAddingProductToCart] = React.useState(false)

  const increment = () => setAmount((amount) => amount + 1)
  const decrement = () => setAmount((amount) => amount - 1)

  const handleInputChange = (amountS: string) => setAmount(parseInt(amountS))

  const addToCart = () => {
    setAddingProductToCart(true)
    cart.addItem({ sku: firstProduct.sku, amount })
    cart.addItem({ sku: secondProduct.sku, amount })
    events.addToCart(firstProduct, secondProduct, startedFrom)
  }

  React.useEffect(() => {
    if (!addingProductToCart) return
    setAddingProductToCart(cart.isUpdating)
  }, [cart.isUpdating, addingProductToCart])

  return (
    <Wrapper>
      <Price
        firstProduct={firstProduct}
        secondProduct={secondProduct}
        amount={amount}
      />
      <div className="row">
        <div className="amount">
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
            onChange={(e) => handleInputChange(e.target.value)}
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
        {firstProduct.sellable && secondProduct.sellable ? (
          <Button
            variation="cart"
            data-cy-handle="add-to-cart"
            data-cy-state="show-add-to-cart"
            className="cart-btn"
            fullWidth
            onClick={addToCart}
          >
            {addingProductToCart ? (
              <TailSpin data-cy-state="adding-to-cart" />
            ) : (
              <CartSvg />
            )}
            {t('buy_box_add_to_cart')}
          </Button>
        ) : (
          <Button
            variation="cart_disabled"
            data-cy-handle="add-to-cart"
            data-cy-state
            className="sold-out-button"
            fullWidth
          >
            {t('buy_box_add_to_cart_disabled')}
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: ${theme.spacing('m')};
  padding-left: ${theme.spacing('m')};
  padding-right: ${theme.spacing('m')};

  @media (min-width: ${theme.ms.LG}px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  > .row {
    display: flex;
    flex-direction: row;

    > .amount {
      display: flex;
      align-self: center;
      margin-right: ${theme.spacing('s')};

      > .input {
        border: 1px solid ${theme.colors.shade.b5};
        border-right: none;
        border-left: none;
        width: 3rem;
        outline: 0;
        text-align: center;
        box-sizing: border-box;
        align-items: center;
        height: 2.5rem;

        ${theme.ty('r-base')}
      }
    }

    > button {
      height: 2.5rem;
      flex: 1;
    }

    @media (min-width: ${theme.ms.LG}px) {
      flex-direction: row;

      > .amount {
        margin: 0;
        margin-right: ${theme.spacing('s')};
      }
      > button {
        width: 15rem;
      }
    }

    > .cart-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      > svg {
        margin-right: 8px;
      }
    }
    > .sold-out-button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: default;
      > svg {
        margin-right: 8px;
      }
    }
  }

  > .DeliveryInfo {
    margin-top: ${theme.spacing('s')};
    max-width: 500px;
    width: 100%;
    align-self: flex-end;

    @media (min-width: ${theme.ms.LG}px) {
      max-width: 15rem;
    }

    @media (min-width: ${theme.ms.XL}px) {
      max-width: 500px;
    }
  }
`

const AmountButton = styled.button<{ disabled: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
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
