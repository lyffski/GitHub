import * as React from 'react'
import styled from 'styled-components'
import * as t from './types'
import Link from 'theme/atoms/Link'
import useLazyImgSrc from 'hooks/useLazyImgSrc'
import CategoryHeadline from 'theme/molecules/CategoryHeadline'
import { ms } from 'modules/browser/const'
import ProductSlider from '../../molecules/ProductSlider'
import theme from 'theme'
import fetchBySku from 'utils/productListFetcher/bySku'
import EecTracking from 'theme/atoms/EecTracking'

export default function CategoryHeadlineWithProducts(props: t.Props) {
  const [ref, imgUrl] = useLazyImgSrc<HTMLDivElement>(
    props.context.optImg,
    100,
    props.context?.optImg.base64
  )
  return (
    <EecTracking config={props.eecTracking} gridArea={props.gridArea}>
      <Wrapper
        hasImage={!!props.image}
        data-cy-ctx="organisms/CategoryHeadlineWithProducts"
      >
        <div className="headline-container">
          <CategoryHeadline
            link={props.context.link}
            title={props.headline !== '' ? props.headline : props.context.title}
            numHits={props.context.numHits}
            headerStyle="big"
          />
        </div>
        <div className="image-products-row">
          {props.image && (
            <ImageTeaser
              data-cy-state={'image-visible'}
              to={props.context.link}
              ref={ref}
              bg={imgUrl}
            >
              {props.imageText && (
                <div
                  data-cy-state="image-text-visible"
                  className="image-content"
                >
                  <h3 className="title">{props.imageText}</h3>
                </div>
              )}
            </ImageTeaser>
          )}
          <div className="product-slider">
            <ProductSlider
              maxProducts={10}
              initialProducts={props.context.productList}
              fetchFn={fetchBySku(props.skuList, props.skuList.length)}
              hideScrollbar
              listname={'Story: ' + props.gridArea}
            />
          </div>
        </div>
      </Wrapper>
    </EecTracking>
  )
}

const Wrapper = styled.div<{ hasImage: boolean }>`
  overflow: hidden;
  > .headline-container {
    margin-bottom: ${theme.spacing('m')};
  }

  > .image-products-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    > .product-slider {
      width: 100%;
      flex: 1;
      @media (min-width: ${ms.XL}px) {
        margin-left: ${theme.spacing('m')};
        max-width: calc(100% - 385px - ${theme.spacing('m')});
      }
    }
  }
`

const ImageTeaser = styled(Link)<{ bg: string }>`
  height: 25rem;
  display: none;
  background: url('${(p) => p.bg}');
  background-size: cover;
  background-position: center center;
  position: relative;
  min-width: 385px;

  @media (min-width: ${ms.XL}px) {
    display: flex;
  }

  > .image-content {
    position: absolute;
    background: rgba(255, 255, 255, 0.9);
    bottom: 0;
    left: 0;
    right: 0;
    padding: ${theme.spacing('m')};
    width: 90%;

    @media (min-width: ${ms.SM}px) {
      top: unset;
      left: 0;
      right: ${theme.spacing('s')};
      bottom: ${theme.spacing('s')};
    }

    > .title {
      ${theme.ty('rc-2xl')}
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 5.9rem;
    }
  }
`
