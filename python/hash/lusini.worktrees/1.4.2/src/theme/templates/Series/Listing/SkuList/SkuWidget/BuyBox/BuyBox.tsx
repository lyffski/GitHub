import * as React from 'react'
import styled, { css } from 'styled-components'
import { Product } from 'modules/listing/types'
import PlusIcon from 'assets/plus.svg'
import MinusIcon from 'assets/minus.svg'
import Button from 'theme/atoms/Button'
import calculateDeliveryDate from 'utils/calculateDeliveryDate'
import { useCart } from 'modules/cart'
import DeliveryInfo from 'theme/molecules/DeliveryInfo'
import theme from 'theme'
import TailSpin from 'assets/tail-spin.svg'
import CartSvg from 'assets/cart.svg'
import useTranslations from 'hooks/useTranslations'

type Props = {
  hit: Product
}

export default function BuyBox(props: Props) {
  const [amount, setAmount] = React.useState(1)
  const cart = useCart()
  const [addingProductToCart, setAddingProductToCart] = React.useState(false)
  const t = useTranslations<'templates-Series'>()
  const increment = () => setAmount((amount) => amount + 1)
  const decrement = () => setAmount((amount) => amount - 1)
  const handleInputChange = (amountS: string) => setAmount(parseInt(amountS))

  const addToCart = () => {
    setAddingProductToCart(true)
    cart.addItem({ sku: props.hit.sku, amount })
  }

  const deliveryInformations = React.useMemo(
    () => calculateDeliveryDate(props.hit, amount),
    [props.hit, amount]
  )

  React.useEffect(() => {
    if (!addingProductToCart) return
    setAddingProductToCart(cart.isUpdating)
  }, [cart.isUpdating, addingProductToCart])

  return (
    <Wrapper className="BuyBox">
      <div className="wrapper">
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
        {props.hit.sellable && deliveryInformations.isBuyable && (
          <Button
            variation="cart"
            data-cy-handle="add-to-cart"
            data-cy-state
            className="cart-btn"
            fullWidth
            onClick={addToCart}
          >
            {addingProductToCart ? (
              <TailSpin data-cy-state="adding-to-cart" />
            ) : (
              <CartSvg />
            )}
            {t('cart_btn_label')}
          </Button>
        )}
        {(props.hit.sellable && deliveryInformations.isBuyable) || (
          <Button
            variation="cart_disabled"
            data-cy-handle="add-to-cart"
            data-cy-state
            className="sold-out-button"
            fullWidth
          >
            {t('sold_out_btn_series')}
          </Button>
        )}
      </div>
      <DeliveryInfo {...deliveryInformations} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  > .wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 500px;
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
