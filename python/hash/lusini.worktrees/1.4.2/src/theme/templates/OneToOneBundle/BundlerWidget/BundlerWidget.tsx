import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import ProductImage from 'theme/atoms/ProductImage'
import Price, * as Prices from 'theme/atoms/Price'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import { Product } from '../types'
import * as events from '../events'
import useTranslations from 'hooks/useTranslations'
import Link from 'theme/atoms/Link'
import DeliveryInfo from '../DeliveryInfo/index'

type Props = {
  product: Product | null
  setProduct: (sku: string | null) => Promise<void>
  showDelete?: boolean
  trigger: boolean
  setTrigger: Dispatch<SetStateAction<boolean>>
  startedFrom: string
  index: 0 | 1
}

export default function BundlerWidget(props: Props) {
  const t = useTranslations<'templates-OneToOneBundle'>()
  const { product, setProduct, trigger, setTrigger, startedFrom, index } = props

  const remove_hash_from_url = () => {
    const uri = window.location.toString()
    const clean_uri = uri.substring(0, uri.indexOf('?'))
    window.history.replaceState({}, document.title, clean_uri)
  }

  return (
    <Wrapper>
      {product ? (
        <div
          className="product"
          data-cy-state="configurable-preselected-product"
        >
          <div className="image-box">
            <ProductImage
              img={product.images.imageWeb[0]}
              size="s"
              alt={product.title}
            />
            <div
              className="delete-mobile"
              data-cy-handle="delete-product"
              data-cy-state="show-delete-button"
              onClick={() => {
                remove_hash_from_url()
                setProduct(null)
                setTrigger(!trigger)
                events.reset(product, startedFrom, index)
              }}
            >
              {t('configbox_delete')}
            </div>
          </div>
          <div className="text-box">
            <div className="brand">{product.brand}</div>
            <div className="title">
              <span>{product.title}</span>
            </div>
            <div className="subtitle">
              <span>{product.subtitle}</span>
            </div>
            <div className="price">
              {product.prices.productCheapestPiecePriceNet &&
                product.prices.productMostexpensivePiecePriceNet &&
                product.prices.productCheapestPiecePriceNet <
                  product.prices.productMostexpensivePiecePriceNet && (
                  <div data-cy-state="has-cheapest-price">
                    <Prices.Cheapest prices={product.prices} logic="piece" />
                  </div>
                )}

              {product.prices.productCheapestPiecePriceNet &&
                product.prices.productMostexpensivePiecePriceNet &&
                product.prices.productCheapestPiecePriceNet >=
                  product.prices.productMostexpensivePiecePriceNet && (
                  <div data-cy-state="has-strike-price">
                    <Price prices={product.prices} logic="piece" />
                    {Prices.PriceHasStrikePrice(product, 1) && (
                      <span className="strike" data-cy-state="has-strike-price">
                        <Prices.PriceStrike
                          prices={product.prices}
                          logic="piece"
                        />
                      </span>
                    )}
                  </div>
                )}
              <div className="details">
                <span>Stückpreis </span>
                <span className="info">
                  <Prices.PriceB2BGrossInfo
                    prices={product.prices}
                    scalePrice={product.priceRules}
                    amount={1}
                    logic="piece"
                  />
                  <Prices.PriceB2CNetInfo
                    prices={product.prices}
                    scalePrice={product.priceRules}
                    amount={1}
                    logic="piece"
                  />
                </span>
              </div>
            </div>
            <div className="delivery">
              <DeliveryInfo product={product} />
            </div>
            <div
              className="delete-desktop"
              data-cy-handle="delete-product"
              onClick={() => {
                remove_hash_from_url()
                setProduct(null)
                setTrigger(!trigger)
                events.reset(product, startedFrom, index)
              }}
            >
              {t('configbox_delete')}
            </div>
          </div>
        </div>
      ) : (
        <Link to={'#products'}>
          <div className="default-value">{t('configbox_default_text')}</div>
        </Link>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${theme.colors.white};
  height: 222px;
  padding-top: ${theme.spacing('xxs')};

  @media (min-width: ${ms.LG}px) {
    width: 530px;
    height: 260px;
    padding-bottom: ${theme.spacing('m')};
  }

  > .product {
    display: flex;
    margin-top: ${theme.spacing('xs')};

    @media (min-width: ${ms.LG}px) {
      margin-top: ${theme.spacing('ml')};
      margin-left: ${theme.spacing('m')};
    }

    > .image-box {
      margin-left: ${theme.spacing('s')};
      min-width: 120px;
      max-width: 120px;

      @media (min-width: ${ms.LG}px) {
        margin-left: ${theme.spacing('m')};
        width: 225px;
        height: 216px;
      }

      > .delete-mobile {
        ${theme.ty('r-s')};
        margin-top: ${theme.spacing('xs')};
        color: ${theme.colors.shade.b3};
        text-decoration: underline;
        cursor: pointer;

        @media (min-width: ${ms.LG}px) {
          display: none;
        }
      }
    }

    > .text-box {
      width: 100%;
      text-align: left;
      margin-left: ${theme.spacing('m')};
      position: relative;

      @media (min-width: ${ms.LG}px) {
        margin-left: ${theme.spacing('l')};
      }

      > .brand {
        ${theme.ty('r-s', '700')}
        text-transform: uppercase;
        margin-top: ${theme.spacing('xs')};
        color: ${theme.colors.shade.b4};

        > span {
          position: absolute;
          left: 0;
          right: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      > .title {
        ${theme.ty('r-base')}
        height: 1.5rem;

        > span {
          padding-right: ${theme.spacing('m')};
          position: absolute;
          left: 0;
          right: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      > .subtitle {
        ${theme.ty('r-s')}
        height: 1.5rem;

        > span {
          padding-right: ${theme.spacing('m')};
          position: absolute;
          left: 0;
          right: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      > .price {
        ${theme.ty('r-l', '700')};
        margin-top: ${theme.spacing('xxs')};

        & .strike {
          color: ${theme.colors.shade.b4};
          text-decoration: line-through;
          margin-left: ${theme.spacing('xs')};
          ${theme.ty('r-base')};
        }
        & .details {
          color: ${theme.colors.shade.b3};
          ${theme.ty('r-s')};
        }
      }

      > .delivery {
        ${theme.ty('r-s')}
        height: 1.5rem;
        margin-top: ${theme.spacing('xs')};
      }

      > .delete-desktop {
        ${theme.ty('r-s')};
        display: none;

        @media (min-width: ${ms.LG}px) {
          color: ${theme.colors.shade.b3};
          text-decoration: underline;
          cursor: pointer;
          margin-top: ${theme.spacing('s')};
          margin-right: ${theme.spacing('l')};
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }

  > a {
    > .default-value {
      ${theme.ty('rc-2xl')}
      padding: 26px;
      color: ${theme.colors.b0};
      background-color: ${theme.colors.white};
      align-self: center;
      margin-top: ${theme.spacing('xl')};

      @media (min-width: ${ms.LG}px) {
        margin-top: ${theme.spacing('xxl')};
      }
    }
  }
`
