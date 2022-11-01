import * as React from 'react'
import styled from 'styled-components'
import ProductImage from 'theme/atoms/ProductImage'
import ColorPreview from './ColorPreview'
import Price, * as Prices from 'theme/atoms/Price'
import Link from 'theme/atoms/Link'
import Flags from 'theme/molecules/Flags'
import * as evt from './events'
import * as t from './types'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import B2cSwitch from 'theme/atoms/B2cSwitch'
import EnergyLabel from 'theme/atoms/EnergyLabel'
import useInView from 'hooks/useInView'
import useTranslations from 'hooks/useTranslations'
import useProductWidgetContext from 'hooks/useProductWidgetContext'

export type Props = {
  product: t.Product
  listname: string
  listPosition: number
  layoutSize?: string
}

export default function ProductWidget(props: Props) {
  const {
    title,
    brand,
    images,
    containerID,
    prices,
    variantImages,
    attributes,
  } = props.product

  const t = useTranslations<'molecules-ProductWidget'>()
  const { showVariants, onProductWidgetClick, linkTo } =
    useProductWidgetContext()

  const [ref, isInView] = useInView(-200, true)

  const [mainImage, setMainImage] = React.useState('')
  const layoutSize = props.layoutSize ? props.layoutSize : 'normal'

  React.useEffect(() => {
    if (!isInView) return
    evt.scrollIntoView(props.product, props.listname, props.listPosition)
  }, [isInView, props.product, props.listname, props.listPosition])

  return (
    <Wrapper
      ref={ref}
      className="ProductWidget"
      to={linkTo ? linkTo : `/pdp/${containerID}/`}
      onClick={() => {
        evt.widgetClick(props.product, props.listname, props.listPosition)
        if (onProductWidgetClick) {
          onProductWidgetClick(props.product)
        }
      }}
      data-cy-ctx="molecules/ProductWidget"
      $layoutSize={layoutSize}
    >
      <div className="flag-wrapper">
        <Flags product={props.product} type={'widget'} />
      </div>
      <ImgBox className="ImgBox" data-cy-handle="click-out">
        {attributes?.ENERGY_EFFICIENCY_CLASS && (
          <EnergyLabel
            data-cy-state="show-energylabel"
            energyLabelLink={attributes.ENERGY_LABEL?.values[0].document}
            label={attributes.ENERGY_EFFICIENCY_CLASS?.values[0].value}
            size={'small'}
          />
        )}

        <ProductImage
          img={
            mainImage
              ? { url: mainImage, classes: ['ASSET_FS'] }
              : images.imageWeb[0]
          }
          size="s"
          alt={title}
        />
        {/* TODO: Colors inkl. Hover und Klick zu SKU, wenn Daten aus Algolia da */}
        {showVariants && (
          <ColorPreview
            data-cy-state="colorpreview-is-visible"
            variantImages={variantImages}
            onImageHover={setMainImage}
            containerId={containerID}
            onColorClick={(variantImage) =>
              evt.colorClick(
                variantImage,
                props.product,
                props.listname,
                props.listPosition
              )
            }
          />
        )}
      </ImgBox>
      <div className="brand">{brand}</div>
      <div className="title">
        <span>{title}</span>
      </div>
      <div className="price">
        {prices.productCheapestPiecePriceNet &&
          prices.productMostexpensivePiecePriceNet &&
          prices.productCheapestPiecePriceNet <
            prices.productMostexpensivePiecePriceNet && (
            <div data-cy-state="has-cheapestprice">
              {t('from_price')}{' '}
              <Prices.Cheapest prices={prices} logic="piece" />
            </div>
          )}

        {prices.productCheapestPiecePriceNet &&
          prices.productMostexpensivePiecePriceNet &&
          prices.productCheapestPiecePriceNet >=
            prices.productMostexpensivePiecePriceNet && (
            <div data-cy-state="has-strikeprice">
              <Price prices={prices} logic="piece" />
              {Prices.PriceHasStrikePrice(props.product, 1) && (
                <span className="strike" data-cy-state="has-strikeprice">
                  <Prices.PriceStrike prices={prices} logic="piece" />
                </span>
              )}
            </div>
          )}
        <div className="details">
          {t('per_piece_label')}
          <span data-cy-state="has-unit">
            &#160;{props.product.unit.unitName}
          </span>
          {props.product.prices.referencePriceNetString && (
            <span data-cy-state="has-baseprice">
              {',  '}
              <B2cSwitch.B2B>
                {props.product.prices.referencePriceNetString}
              </B2cSwitch.B2B>
              <B2cSwitch.B2C>
                {props.product.prices.referencePriceGrossString}
              </B2cSwitch.B2C>
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

const ImgBox = styled.div`
  position: relative;

  > img {
    margin: 0 auto;
  }

  > .Energylabel {
    position: absolute;
    right: 0.75rem;
    top: 0;
  }

  > .ColorPreview {
    margin-top: ${theme.spacing('xs')};
  }
`

const Wrapper = styled(Link)<{ $layoutSize: string }>`
  display: block;

  > .flag-wrapper {
    position: relative;
    > .Flags {
      z-index: 1;
      position: absolute;
      left: 0;
    }
  }

  > .brand {
    ${theme.ty('r-xs', '700')}
    text-transform: uppercase;
    margin-top: ${theme.spacing('xxs')};
    ${(props) =>
      props.$layoutSize === 'normal' &&
      `
        ${theme.ty('r-s', '700')}
        margin-top: ${theme.spacing('xs')};
      
    `}
    ${(props) =>
      props.$layoutSize === 'small' &&
      `
        ${theme.ty('r-xs', '700')}
      }
    `}
   
    color: ${theme.colors.shade.b4};
  }

  > .title {
    position: relative;
    height: 1.5rem;
    overflow: hidden;
    margin-bottom: ${theme.spacing('xxs')};
    ${(props) =>
      props.$layoutSize === 'small' &&
      `
           height: 1.125rem; 
      `}
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
      ${(props) =>
        props.$layoutSize === 'normal' &&
        `
          @media (min-width: ${ms.MD}px) {
            ${theme.ty('r-base')};
          }      
      `}
    }
  }

  > .price {
    ${theme.ty('r-s', '700')};
    ${(props) =>
      props.$layoutSize === 'normal' &&
      `
        @media (min-width: ${ms.MD}px) {
        ${theme.ty('r-l', 'bold')}
      }    
    `}

    & .strike {
      color: ${theme.colors.shade.b3};
      text-decoration: line-through;
      margin-left: ${theme.spacing('xs')};
      ${theme.ty('r-xs')};
      ${(props) =>
        props.$layoutSize === 'normal' &&
        `
        @media (min-width: ${ms.MD}px) {
        ${theme.ty('r-base')};
      }
    `}
    }
    & .details {
      color: ${theme.colors.shade.b3};

      ${theme.ty('r-xs')};
      ${(props) =>
        props.$layoutSize === 'normal' &&
        `
        @media (min-width: ${ms.MD}px) {
        ${theme.ty('r-s')};
      }
    `}
    }
  }
`
