import * as React from 'react'
import * as t from './types'
import RawProductSlider from 'theme/molecules/ProductSlider'
import fetchBySearch from 'utils/productListFetcher/bySearch'
import EecTracking from 'theme/atoms/EecTracking'
import fetchBySku from 'utils/productListFetcher/bySku'

export default function ProductSlider(props: t.Props) {
  return (
    <EecTracking
      config={props.eecTracking}
      gridArea={props.gridArea}
      threshold={1}
    >
      <RawProductSlider
        data-cy-ctx="organisms/ProductSlider"
        title={props.title}
        initialProducts={props.context.products}
        maxProducts={props.searchSwitch ? props.context.nbHits : 10}
        fetchFn={
          props.searchSwitch
            ? fetchBySearch(props.search, props.maxProducts)
            : fetchBySku(props.skuList, 10)
        }
        listname={'Story: ' + props.gridArea}
      />
    </EecTracking>
  )
}
