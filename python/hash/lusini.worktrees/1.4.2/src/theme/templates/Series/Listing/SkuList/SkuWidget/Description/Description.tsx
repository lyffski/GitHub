import * as React from 'react'
import styled from 'styled-components'
import { Product } from 'modules/listing/types'
import theme from 'theme'
import Link from 'theme/atoms/Link'
import ArrowRight from 'assets/link-arrow.svg'
import Price, * as Prices from 'theme/atoms/Price'
import useTranslations from 'hooks/useTranslations'

type Props = {
  hit: Product
}

export default function Description(props: Props) {
  const t = useTranslations<'templates-Series'>()

  return (
    <Wrapper className="Description">
      <h5>
        <Link to={`/pdp/${props.hit.containerID}/#sku=${props.hit.sku}`}>
          {props.hit.title}
        </Link>
      </h5>
      <h6>{props.hit.subtitle}</h6>
      <div className="prices">
        <div className="piece-price">
          <span className="price-wrapper">
            <Price prices={props.hit.prices} logic="piece" />
            {Prices.PriceHasStrikePrice(props.hit, 1) && (
              <span className="strike" data-cy-state="has-strikeprice">
                <Prices.PriceStrike prices={props.hit.prices} logic="piece" />
              </span>
            )}
          </span>
          <span className="info-wrapper">
            <span className="label">{t('sku_piece_price_label')}</span>
            <span className="info">
              <Prices.PriceB2BGrossInfo
                prices={props.hit.prices}
                scalePrice={props.hit.priceRules}
                amount={1}
                logic="piece"
              />
              <Prices.PriceB2CNetInfo
                prices={props.hit.prices}
                scalePrice={props.hit.priceRules}
                amount={1}
                logic="piece"
              />
            </span>
            <div className="additional-info-ecoTax">
              {props.hit.unit.purchaseUnit === 1 &&
                (props.hit.prices.ecoTaxNet ||
                  props.hit.prices.ecoTaxGross) && (
                  <Prices.EcoTax
                    prices={props.hit.prices}
                    amount={1}
                    data-cy-state={'hasEcoTax'}
                  />
                )}
            </div>
          </span>
        </div>
        {props.hit.unit.purchaseUnit > 1 && (
          <div className="pack-price" data-cy-state="has-pack-price">
            <span className="price-wrapper">
              <Price prices={props.hit.prices} logic="pack" />
              {Prices.PriceHasStrikePrice(props.hit, 1) && (
                <span className="strike" data-cy-state="has-strikeprice">
                  <Prices.PriceStrike prices={props.hit.prices} logic="pack" />
                </span>
              )}
            </span>
            <span className="info-wrapper">
              <span className="label">
                {props.hit.unit.purchaseUnit} {props.hit.unit.unitName} /{' '}
                {props.hit.unit.packUnit}
              </span>
              <span className="info">
                <Prices.PriceB2BGrossInfo
                  prices={props.hit.prices}
                  scalePrice={props.hit.priceRules}
                  amount={1}
                  logic="pack"
                />
                <Prices.PriceB2CNetInfo
                  prices={props.hit.prices}
                  scalePrice={props.hit.priceRules}
                  amount={1}
                  logic="pack"
                />
              </span>
              <div className="additional-info-ecoTax">
                {(props.hit.prices.ecoTaxNet ||
                  props.hit.prices.ecoTaxGross) && (
                  <Prices.EcoTax
                    prices={props.hit.prices}
                    amount={1}
                    data-cy-state={'hasEcoTax'}
                  />
                )}
              </div>
            </span>
          </div>
        )}
      </div>

      <div className="meta">
        <div className="sku">
          {t('sku_article_number_label')}
          <Link to={`/pdp/${props.hit.containerID}/#sku=${props.hit.sku}`}>
            {` `}i{props.hit.sku}
          </Link>
        </div>
        <Link
          className="detail-link"
          to={`/pdp/${props.hit.containerID}/#sku=${props.hit.sku}`}
        >
          <ArrowRight />
          {t('sku_detail_link')}
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > h5 {
    ${theme.ty('rc-base')}
  }
  > h6 {
    ${theme.ty('r-xs')}
    color: ${theme.colors.shade.b2};
  }
  @media (min-width: ${theme.ms.MD}px) {
    > h5 {
      ${theme.ty('rc-2xl')}
    }
    > h6 {
      ${theme.ty('r-s')}
      color: ${theme.colors.shade.b3};
    }
  }

  > .prices {
    margin-top: ${theme.spacing('xs')};

    > .piece-price,
    > .pack-price {
      > .price-wrapper {
        ${theme.ty('r-s', 'bold')}
        > .strike {
          ${theme.ty('r-xs')}
          color: ${theme.colors.shade.b3};
          padding-left: ${theme.spacing('xxs')};
          text-decoration: line-through;
        }
      }

      > .info-wrapper > .info,
      > .info-wrapper > .label {
        ${theme.ty('r-xs')}
        padding-left: ${theme.spacing('xxs')};
        color: ${theme.colors.shade.b3};
      }
      > .info-wrapper > .additional-info-ecoTax {
        ${theme.ty('r-xs')}
        color: ${theme.colors.shade.b3};
      }
    }

    @media (min-width: ${theme.ms.MD}px) {
      > .piece-price,
      > .pack-price {
        > .price-wrapper {
          ${theme.ty('r-base', 'bold')}
          > .strike {
            ${theme.ty('r-s')}
            color: ${theme.colors.shade.b3};
            padding-left: ${theme.spacing('xxs')};
            text-decoration: line-through;
          }
        }

        > .info-wrapper > .info,
        > .info-wrapper > .label {
          ${theme.ty('r-s')}
          padding-left: ${theme.spacing('xxs')};
          color: ${theme.colors.shade.b3};
        }
        > .info-wrapper > .additional-info-ecoTax {
          ${theme.ty('r-s')}
          color: ${theme.colors.shade.b3};
        }
      }
    }

    @media (min-width: ${theme.ms.LG}px) {
      display: flex;
      > .piece-price,
      > .pack-price {
        &.pack-price {
          margin-left: ${theme.spacing('l')};
        }
        > .price-wrapper {
          flex: 1;
          ${theme.ty('r-2xl', 'bold')}
          > .strike {
            ${theme.ty('r-base')}
            color: ${theme.colors.shade.b3};
            padding-left: ${theme.spacing('xxs')};
            text-decoration: line-through;
          }
        }

        > .info-wrapper {
          display: block;
        }
        > .info-wrapper > .info,
        > .info-wrapper > .label {
          ${theme.ty('r-base')}
          padding-left: ${theme.spacing('xxs')};
          color: ${theme.colors.shade.b3};
          &.label {
            padding-left: 0;
          }
        }
        > .info-wrapper > .additional-info-ecoTax {
          ${theme.ty('r-base')}
          color: ${theme.colors.shade.b3};
        }
      }
    }
  }

  > .meta {
    margin-top: ${theme.spacing('m')};

    > .sku {
      ${theme.ty('r-xs')}
      color: ${theme.colors.shade.b2};
    }

    > .sku > a {
      color: ${theme.colors.shade.b2};
    }

    > .detail-link {
      ${theme.ty('r-s')}
      text-decoration: underline;
      margin-top: ${theme.spacing('xs')};
      display: block;

      > svg {
        margin-bottom: -2px;
        margin-right: 5px;
        width: 12px;
      }
    }

    @media (min-width: ${theme.ms.MD}px) {
      margin-top: ${theme.spacing('ml')};

      > .sku {
        ${theme.ty('r-s')}
      }
      > .detail-link {
        ${theme.ty('r-base')}
      }
    }

    @media (min-width: ${theme.ms.LG}px) {
      display: flex;
      > .sku {
        flex: 1;
      }
      > .detail-link {
        flex: 1;
        margin-top: 0;
        text-align: right;
      }
    }
  }
`
