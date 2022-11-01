import * as React from 'react'
import styled from 'styled-components'
import ProductSlider from 'theme/molecules/ProductSlider'
import theme from 'theme'
import * as t from './types'
import CategoryImageTeaser from 'theme/molecules/CategoryImageTeaser'
import fetchBySku from 'utils/productListFetcher/bySku'
import { ms } from 'modules/browser/const'
import EecTracking from 'theme/atoms/EecTracking'

export default function CategoryImageTeaserWithProducts(props: t.Props) {
  return (
    <EecTracking config={props.eecTracking} gridArea={props.gridArea}>
      <Wrapper data-cy-ctx="organisms/CategoryImageTeaserWithProducts">
        <div className="teaser-wrapper">
          <CategoryImageTeaser
            bg={props.context.optImg}
            title={props.title || props.context.title}
            link={props.context.link}
            type={props.style}
            numHits={props.context.numHits}
            imageBase64={props.context.imageBase64}
            isSeries={props.context.isSeries}
          />
        </div>
        <div className="product-slider">
          <ProductSlider
            maxProducts={10}
            initialProducts={props.context.productList}
            fetchFn={fetchBySku(props.skuList, props.skuList.length)}
            hideScrollbar
            listname={'Story: ' + props.gridArea}
          />
        </div>
      </Wrapper>
    </EecTracking>
  )
}

const Wrapper = styled.div`
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);

  > .teaser-wrapper {
    height: 400px;

    @media (min-width: ${ms.MD}px) {
      height: 600px;
    }
  }

  > .product-slider {
    margin: ${theme.spacing('l')} 1rem;
  }
`
