import * as React from 'react'
import styled from 'styled-components'
import Price, * as Prices from 'theme/atoms/Price'
import ProductImage from 'theme/atoms/ProductImage'
import Link from 'theme/atoms/Link'
import * as t from 'modules/cart/types'
import theme from 'theme'
import whitepixel from 'utils/whitePixel'
import useTranslations from 'hooks/useTranslations'
import withTranslations from '../withTranslations'

type Props = {
  product?: t.Variant
  amount: number
  position_id?: string
  showRemove?: boolean
  onNavigate: () => void
  className?: string
}

export default withTranslations(function CartItem(props: Props) {
  const t = useTranslations<'partials-FlyoutCart'>()
  const product = props.product
  const className = props.className ? `CartItem ${props.className}` : 'CartItem'

  return (
    <Wrapper
      blur={!product}
      data-cy-collection="CartItem"
      className={className}
      onClick={props.onNavigate}
      to={`/pdp/${product?.containerID}/`}
    >
      <ProductImage
        img={
          product?.images?.imageWeb[0] || {
            url: whitepixel,
            classes: ['ASSET_FS'],
          }
        }
        size="s"
        alt={product?.title || ''}
      />

      <div className="product-info">
        <label className="brand">{product?.brand}</label>
        <div className="title">{product?.title}</div>

        {product && (
          // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
          <div className="price">
            <Price
              prices={product.prices}
              logic="piece"
              amount={props.amount}
            />
            {Prices.PriceHasStrikePrice(product, 1) && (
              <span className="strike" data-cy-state="has-strikeprice">
                <Prices.PriceStrike prices={product.prices} logic="piece" />
              </span>
            )}
            <span className="priceinfo">
              {t('flyoutcart_per_piece')}
              <Prices.PriceB2BGrossInfo prices={product.prices} logic="piece" />
            </span>
          </div>
        )}

        <div className="amount">
          {t('flyoutcart_amount')}{' '}
          <span className="amountNumber">{props.amount}</span>
        </div>
      </div>
    </Wrapper>
  )
})

const Wrapper = styled(Link)<{ blur: boolean }>`
  ${(props) =>
    props.blur &&
    `
      * {
          color: transparent !important;
          text-shadow: 0 0 0.9375rem rgba(0,0,0,0.5) !important;
      }
  `}

  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    width: 4.6875rem;
    padding: 0.3125rem;
    margin-right: ${theme.spacing('m')};
    border: 1px solid ${theme.colors.shade.b6};
  }
  > .product-info {
    width: 20rem;
    line-height: 1.4rem;

    > .brand {
      ${theme.ty('r-xs', '700')}
      color: ${theme.colors.shade.b4};
      text-transform: uppercase;
    }

    > .title {
      ${theme.ty('r-s')}
      color: ${theme.colors.b0};
      margin-bottom: ${theme.spacing('xxs')};
    }

    > .price {
      ${theme.ty('r-s', '700')}
      color: ${theme.colors.b0};
      margin-bottom: ${theme.spacing('xxs')};

      > span {
        margin-right: ${theme.spacing('xxs')};
      }

      > .strike {
        ${theme._ty([10, 0, 18], theme.font, '400')}
        color: ${theme.colors.shade.b3};
        text-decoration: line-through;
      }

      > .priceinfo {
        ${theme.ty('r-xs')}
        color: ${theme.colors.shade.b2};
      }
    }

    > .amount {
      ${theme.ty('r-xs')}
      color: ${theme.colors.shade.b2};

      > .amountNumber {
        font-weight: bold;
      }
    }
  }
`
