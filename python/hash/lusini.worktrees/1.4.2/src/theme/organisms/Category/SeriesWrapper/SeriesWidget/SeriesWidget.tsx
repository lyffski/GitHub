import * as React from 'react'
import styled from 'styled-components'
import { Hit } from 'modules/seriesListing/types'
import ProductImage from 'theme/atoms/ProductImage'
import Link from 'theme/atoms/Link'
import theme from 'theme'
import useTranslations from 'hooks/useTranslations'
import B2cSwitch from 'theme/atoms/B2cSwitch'
import { ms } from 'modules/browser/const'
import Price, * as Prices from 'theme/atoms/Price'

type Props = {
  hit: Hit
}

export default function SeriesWidget(props: Props) {
  const t = useTranslations<'organisms-Category'>()

  const to = `/series/${props.hit.objectID}/`
  return (
    <Wrapper className="SeriesWidget" to={to} data-cy-collection="SeriesWidget">
      <div className="img-wrapper">
        <ProductImage
          img={props.hit.images.imageWeb[0]}
          size="s"
          alt={props.hit.title}
        />
      </div>
      <div className="brand">{props.hit.brand}</div>
      <div className="title">
        <span>{props.hit.title}</span>
      </div>
      <div className="reference-title">
        {props.hit.referenceSku && (
          <div data-cy-state="has-reference-title">
            {t('series_reference_title_example', {
              title: props.hit.referenceSku.sku_title,
            })}
          </div>
        )}
      </div>

      {props.hit.referenceSku && (
        <div data-cy-state="has-reference-price" className="details">
          <div className="price">
            <span className="from-price">{t('series_from_price')}</span>
            <Price prices={props.hit.referenceSku} logic="piece" />
            {Prices.PriceHasStrikePrice(
              { prices: props.hit.referenceSku, priceRules: {} },
              1
            ) &&
              props.hit.referenceSku.piecePseudoPriceNet >=
                props.hit.referenceSku.piecePriceNet && (
                <span
                  className="strike"
                  data-cy-state="has-reference-strikeprice"
                >
                  {' '}
                  <Prices.PriceStrike
                    prices={props.hit.referenceSku}
                    logic="piece"
                  />
                </span>
              )}
          </div>

          <div className="unit-price">
            <div>
              {props.hit.referenceSku.unitName && (
                <span data-cy-state="has-reference-unit">
                  {t('series_per_piece_label', {
                    unit: props.hit.referenceSku.unitName,
                  })}
                </span>
              )}
              {props.hit.referenceSku.referencePriceNetString && (
                <span data-cy-state="has-reference-baseprice">
                  {',  '}
                  <B2cSwitch.B2B>
                    {props.hit.referenceSku.referencePriceNetString}
                  </B2cSwitch.B2B>
                  <B2cSwitch.B2C>
                    {props.hit.referenceSku.referencePriceGrossString}
                  </B2cSwitch.B2C>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(Link)`
  > .brand {
    ${theme.ty('r-xs', 'bold')};
    margin-top: ${theme.spacing('xs')};
    color: ${theme.colors.shade.b4};
    text-transform: uppercase;
    @media (min-width: ${ms.MD}px) {
      ${theme.ty('r-s', 'bold')};
    }
  }

  > .title {
    position: relative;
    overflow: hidden;
    /* margin-bottom: ${theme.spacing('xxs')}; */
    height: 1.125rem;
    @media (min-width: ${ms.MD}px) {
      height: 1.5rem;
    }
    > span {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      margin-bottom: ${theme.spacing('xxs')};
      max-width: 100%;
      white-space: nowrap;
      ${theme.ty('r-s')};
      @media (min-width: ${ms.MD}px) {
        ${theme.ty('r-base')};
      }
    }
  }

  > .reference-title {
    ${theme.ty('r-s')}
    color: ${theme.colors.shade.b3};
    position: relative;
    overflow: hidden;
    margin-bottom: ${theme.spacing('xxs')};
    height: 0.8125rem;
    @media (min-width: ${ms.MD}px) {
      height: 1rem;
      margin-bottom: ${theme.spacing('xs')};
    }
    > span {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      max-width: 100%;
      white-space: nowrap;
      ${theme.ty('r-xs')};
      @media (min-width: ${ms.MD}px) {
        ${theme.ty('r-s')};
      }
    }
  }

  > .details {
    > .price {
      ${theme.ty('r-s', '700')};
      @media (min-width: ${ms.MD}px) {
        ${theme.ty('r-l', '700')};
      }
      > .from-price {
        ${theme.ty('r-xs', '700')};
        @media (min-width: ${ms.MD}px) {
          ${theme.ty('r-s', '700')};
        }
        margin-right: 0.125rem;
      }
      > .strike {
        font-weight: 400;
      }
    }
    > .unit-price {
      ${theme.ty('r-s')}
      color: ${theme.colors.shade.b3};
      position: relative;
      overflow: hidden;
      height: 0.8125rem;
      @media (min-width: ${ms.MD}px) {
        height: 1rem;
      }

      > div {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        max-width: 100%;
        white-space: nowrap;
        ${theme.ty('r-xs')};
        @media (min-width: ${ms.MD}px) {
          ${theme.ty('r-s')};
        }
      }
    }
  }
`
