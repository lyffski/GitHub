import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'
import Drawer from 'theme/atoms/Drawer'
import Button from 'theme/atoms/Button'
import CartItem from './CartItem'
import { useCart } from 'modules/cart'
import useDelayedFn from 'hooks/useDelayedFn'
import priceStr from 'utils/priceString'
import B2cSwitch from 'theme/atoms/B2cSwitch'
import CloseIcon from 'assets/menu-close.svg'
import CartIcon from 'assets/cart.svg'
import theme from 'theme'
import withTranslations from './withTranslations'
import useTranslations from 'hooks/useTranslations'
import ProductSlider from 'theme/molecules/ProductSlider'
import fetchBySku from 'utils/productListFetcher/bySku'
type Props = {
  remove: () => void
  optionalAdditions?: string[]
}

export function FlyoutCart(props: Props) {
  const t = useTranslations<'partials-FlyoutCart'>()
  const cart = useCart()
  const [showCart, setShowCart] = React.useState(true)
  const cartItems = cart.data.items
  let latestItem
  const [isClosing, delayedClose] = useDelayedFn(300, props.remove)
  const sliderContainerRef = React.useRef<null | HTMLInputElement>(null)
  const sliderTitle = t.asText(sliderContainerRef, 'flyoutcart_slider_title')
  if (cartItems.length > 0) {
    latestItem = cartItems.slice(0, 1).shift()
  }

  const handleClose = () => {
    delayedClose()
  }

  React.useEffect(() => {
    return () => {
      setShowCart(false)
    }
  }, [])

  // on mobile we want to close the drawer when user clicks on a cart item
  // on desktop we want to keep the drawer open
  const handleProductClick = () => {
    if (window.innerWidth < 600) {
      props.remove()
    }
  }

  return (
    <Drawer
      onClose={handleClose}
      maxWidth="27.5rem"
      data-cy-handle-overlay="overlay"
      data-cy-handle-close-icon="close-icon"
      data-cy-ctx="partials/FlyoutCart"
      customHeader={true}
      isClosing={isClosing}
      visible={showCart}
    >
      <Wrapper isClosing={isClosing}>
        <div className="container">
          <div className="flyout-cart-top">
            <div className="label">{t('last_added')}</div>
            <div
              className="close"
              data-cy-handle="close-icon"
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="upperFlyoutCart">
            {latestItem && (
              <div className="lastAddedItem" data-cy-state>
                <LatestItem
                  onNavigate={handleProductClick}
                  key={latestItem.sku}
                  product={latestItem.variant}
                  amount={latestItem.amount}
                  position_id={latestItem.position_id}
                />
              </div>
            )}
            <div className="checkoutWrapper">
              <div className="productCount">
                {t('products_in_cart', { productsCount: cartItems.length })}
              </div>
              <div className="total">
                <span className="totalLabel">{t('total_label')}</span>
                <div className="price">
                  <B2cSwitch.B2B>
                    {priceStr(cart.data.totalNetto)}{' '}
                    <span className="withTax">
                      {t('flyoutcart_price_with_tax', {
                        totalBrutto: priceStr(cart.data.totalBrutto),
                      })}
                    </span>
                  </B2cSwitch.B2B>
                  <B2cSwitch.B2C>
                    {priceStr(cart.data.totalBrutto)}
                  </B2cSwitch.B2C>
                </div>
              </div>
              <div className="goto">
                <Button
                  variation="primary"
                  onClick={handleClose}
                  to="/cart/"
                  data-cy-handle={'to-checkout'}
                >
                  <CartIcon /> {t('to_checkout_btn')}
                </Button>
              </div>
            </div>
          </div>
          <div
            className="sliderContainer"
            data-cy-handle="reco-product-click"
            ref={sliderContainerRef}
            onClick={(e) => {
              const elm = e.target as Element
              if (
                elm &&
                (elm.classList.contains('ProductWidget') ||
                  (elm.parentElement &&
                    elm.parentElement.classList.contains('ProductWidget')) ||
                  (elm.parentElement &&
                    elm.parentElement.parentElement &&
                    elm.parentElement.parentElement.classList.contains(
                      'ProductWidget'
                    )))
              ) {
                props.remove()
              }
            }}
          >
            {props.optionalAdditions && (
              <ProductSlider
                title={sliderTitle}
                fetchFn={fetchBySku(props.optionalAdditions, 10)}
                maxProducts={
                  props.optionalAdditions.length < 2
                    ? props.optionalAdditions.length
                    : 2
                }
                listname={'flyoutCartRecoSlider'}
                layoutSize="small"
                data-cy-state={'optional-additions'}
              />
            )}
          </div>
          <h3>{t('flyoutcart_headline_text')}</h3>
          <div className="productList">
            {cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  onNavigate={handleProductClick}
                  key={item.sku}
                  product={item.variant}
                  amount={item.amount}
                  position_id={item.position_id}
                />
              ))}
          </div>
        </div>
      </Wrapper>
    </Drawer>
  )
}

export default withTranslations(FlyoutCart)

const animationHideFromRight = keyframes`
  from { right: 0; }
  to { right: -33rem; }
`

const Wrapper = styled.div<{ isClosing: boolean }>`
  animation: ${() => css`3s ${animationHideFromRight}`};

  > .container {
    display: flex;
    flex-direction: column;

    > .flyout-cart-top {
      border: 0px;
      margin: 0;
      padding: 0 ${theme.spacing('l')};
      background-color: ${theme.colors.shade.primaryUltraBright};
      display: flex;
      flex-direction: row;
      min-height: 4.5rem;

      > .label {
        display: flex;
        ${theme.ty('rc-2xl')}
        text-transform: none;
        flex: 1;
        color: ${theme.colors.b0};
        margin-top: ${theme.spacing('ml')};
      }

      > .close {
        margin: ${theme.spacing('ml')};
        margin-right: ${theme.spacing('xs')};
        height: 1.25rem;
        cursor: pointer;

        > svg {
          font-size: 2rem;
          #menu-close {
            stroke: ${theme.colors.b0};
          }
          width: 1.25rem;
        }
      }
    }
    > .sliderContainer {
      width: 100%;
      padding: 20px 40px;
    }

    > h3 {
      color: ${theme.colors.b0};
      margin: ${theme.spacing('m')} ${theme.spacing('l')} ${theme.spacing('xs')};
      ${theme.ty('rc-2xl')}
    }

    > .productList {
      display: flex;
      padding: 0 ${theme.spacing('l')};
      flex-direction: column;

      > .CartItem {
        margin-bottom: ${theme.spacing('s')};
      }
    }

    > .upperFlyoutCart {
      padding: 0 ${theme.spacing('l')} ${theme.spacing('ml')};
      background-color: ${theme.colors.shade.primaryUltraBright};

      > .checkoutWrapper {
        width: 100%;
        bottom: 0;

        > div {
          padding: ${theme.spacing('s')} ${theme.spacing('m')}
            ${theme.spacing('xs')} ${theme.spacing('m')};
        }

        > .goto {
          padding: 0;

          > .Button {
            width: 100%;
            text-align: center;
            padding: ${theme.spacing('xs')};
            background-color: ${theme.colors.primary};
            ${theme._ty([16, 0, 22], theme.fontSpecial, '700')}

            svg {
              margin-right: ${theme.spacing('xs')};
              position: relative;
              top: 4px;
              height: 1.375rem;
              width: 1.375rem;
            }
          }
        }

        > .productCount {
          ${theme.ty('r-base', '700')}
          color: ${theme.colors.shade.b3};
        }

        > .total {
          margin-bottom: ${theme.spacing('m')};
          padding-bottom: 0;
          display: flex;
          flex-grow: 1;
          justify-content: space-between;
          color: ${theme.colors.b0};

          .totalLabel {
            ${theme.ty('r-base')};
          }

          > .price {
            ${theme.ty('r-base', '700')}
            color: ${theme.colors.b0};

            .withTax {
              ${theme.ty('r-s')};
              color: ${theme.colors.b0};
            }
          }
        }
      }
    }
  }
`

const LatestItem = styled(CartItem)`
  background-color: ${theme.colors.shade.primaryUltraBright};
  padding-bottom: ${theme.spacing('ml')};
  border-bottom: 1px solid ${theme.colors.shade.b2};

  && {
    img {
      min-width: 6.875rem;
      min-height: 6.875rem;
      background-color: #ffffff;
      border-width: 0;
    }

    .product-info {
      > .brand {
        ${theme.ty('r-s', '700')}
      }

      .title {
        ${theme.ty('r-base')}
      }

      .price {
        ${theme.ty('r-l', '700')}
        > span {
          margin-right: ${theme.spacing('xs')};
        }
      }

      .strike {
        ${theme.ty('r-base')}
        color: ${theme.colors.shade.b4};
      }

      .priceinfo {
        ${theme.ty('r-s')}
        color: ${theme.colors.shade.b3};
        display: block;
      }

      .amount {
        ${theme.ty('r-s')}
        color: ${theme.colors.shade.b3};
      }
    }
  }
`
