import * as React from 'react'
import Personalization from 'theme/atoms/Personalization'
import fetchBySku from 'utils/productListFetcher/bySku'
import * as t from './types'
import ProductSlider from 'theme/molecules/ProductSlider'

type DYResponse = {
  title: string
  skus: string[]
}

export default function DyProductSlider(props: t.Props) {
  if (!props.dySelector) return null
  return (
    <Personalization<DYResponse, { title: string }>
      strategy="NO_CACHE"
      // wdv-1162-home-recommendation-slot1
      selector={props.dySelector}
      // HOMEPAGE
      pageType={props.pageType}
      loading={<ProductSlider.Loading />}
      shape={[
        'object',
        {
          title: 'string',
        },
      ]}
      processResponse={(dyResponse) => ({
        skus: dyResponse.skus,
        title: dyResponse.custom.title,
      })}
      render={(data) => (
        <ProductSlider
          maxProducts={data.skus.length}
          fetchFn={fetchBySku(data.skus, 10)}
          title={data.title || props.title}
          listname={'Story: ' + props.gridArea}
        />
      )}
    />
  )
}
