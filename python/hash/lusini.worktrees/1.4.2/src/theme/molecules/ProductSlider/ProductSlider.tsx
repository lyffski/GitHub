import * as React from 'react'
import styled from 'styled-components'
import useInView from 'hooks/useInView'
import ArrowLeftIcon from 'assets/arrow-button-left.svg'
import ArrowRightIcon from 'assets/arrow-button-right.svg'
import { ms } from 'modules/browser/const'
import * as t from './types'
import * as evt from './events'
import ProductWidget from '../ProductWidget'
import PositionIndicator from './PositionIndicator'
import theme from 'theme'
import useProducts from './hooks/useProducts'
import useArrowNavigation from 'hooks/useSliderArrowNavigation'

export default function ProductSlider(props: t.Props) {
  const [ref, refInVp] = useInView<HTMLDivElement>(100, true)
  const arrowNav = useArrowNavigation(0.8)
  const products = useProducts(props, arrowNav.lastItemReached)
  const loadingOffset = products.allItemsLoaded ? 1 : 400
  const layoutSize = props.layoutSize ? props.layoutSize : 'normal'

  React.useEffect(() => {
    if (refInVp) evt.present(props.listname, products.data)
  }, [refInVp])

  // no products found
  if (products.allItemsLoaded && products.data.length === 0) {
    return (
      <div data-cy-ctx="molecules/ProductSlider" data-cy-state="no-products" />
    )
  }

  return (
    <Wrapper
      data-cy-ctx="molecules/ProductSlider"
      className="ProductSlider"
      ref={ref}
      visible={products.data.length > 0 ? true : false}
      layoutSize={layoutSize}
      data-cy-state={props['data-cy-state']}
    >
      {props.title && Boolean(products.data.length) && (
        <h3 data-cy-state="has-title">{props.title}</h3>
      )}
      <div className="innerSlider">
        <div className="products" ref={arrowNav.productListRef}>
          <Indicator ref={arrowNav.firstItemRef} width={1} />
          {products.data.slice(0, props.maxProducts).map((product, i) => (
            <div className="widget-wrapper" key={product.containerID}>
              <ProductWidget
                product={product}
                listname={props.listname}
                listPosition={i + 1}
                layoutSize={props.layoutSize}
              />
            </div>
          ))}
          <Indicator ref={arrowNav.lastItemRef} width={loadingOffset} />
        </div>
        {!arrowNav.firstItemReached && (
          <button
            data-cy-handle="prev-button"
            data-cy-state="has-prev-button"
            className="prevButton"
            onClick={() => arrowNav.handleSlide('left')}
          >
            <ArrowLeftIcon />
          </button>
        )}
        {!products.allItemsLoaded || !arrowNav.lastItemReached ? (
          <button
            data-cy-handle="next-button"
            data-cy-state="has-next-button"
            className="nextButton"
            onClick={() => arrowNav.handleSlide('right')}
          >
            <ArrowRightIcon />
          </button>
        ) : null}
      </div>
      {!props.hideScrollbar && (
        <PositionIndicator
          data-cy-state="show-position-indicator"
          componentRef={arrowNav.productListRef}
          maxSteps={
            products.allItemsLoaded ? products.data.length : props.maxProducts
          }
          offset={loadingOffset}
          displayedSteps={products.data.length}
        />
      )}
    </Wrapper>
  )
}

ProductSlider.Loading = function Loading() {
  return <div style={{ height: 340 }} />
}

const Wrapper = styled.div<{ visible: boolean; layoutSize: string }>`
  width: 100%;
  max-width: var(--container-size);
  position: relative;
  ${(props) => !props.visible && `display:none;`}

  > h3 {
    color: ${theme.colors.b0};
    margin-top: ${theme.spacing('m')};
    ${theme.ty('rc-2xl')}
  }

  .innerSlider {
    position: relative;
    margin-top: ${theme.spacing('ml')};
    > .products {
      display: flex;
      width: 100%;
      max-width: 1260px;
      overflow-x: scroll;
      scrollbar-width: none;

      ::-webkit-scrollbar {
        width: 0;
        background: transparent;
      }

      > .widget-wrapper {
        ${(props) =>
          props.layoutSize === 'normal' &&
          `
            margin-right: ${theme.spacing('m')};
            min-width: 180px;
            max-width: 180px;
            @media (min-width: ${ms.MD}px) {
              min-width: 200px;
              max-width: 200px;
            }
            @media (min-width: ${ms.LG}px) {
              min-width: 220px;
              max-width: 220px;
            }
         `}
        ${(props) =>
          props.layoutSize === 'small' &&
          `
            margin-right: ${theme.spacing('s')};
            min-width: 165px;
            max-width: 165px;
            
         `}
        > * {
          width: 100%;
        }
      }
    }

    > button {
      width: 3.125rem;
      height: 3.125rem;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      box-shadow: 0 0.1875rem 0.375rem 0rem rgba(0, 0, 0, 0.1);
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      display: flex;

      background: ${theme.colors.white};

      &.prevButton {
        left: ${theme.spacing('xs')};
      }

      &.nextButton {
        right: ${theme.spacing('xs')};
      }
    }
  }
`

const Indicator = styled.div<{ width: number }>`
  width: ${(p) => p.width + 'px'};
  min-width: ${(p) => p.width + 'px'};
  height: 0.0625rem;
`
