import * as React from 'react'
import * as t from '../types'
import { useInitializer } from 'modules/listing'
import ProductList from 'theme/molecules/ProductList'
import { LISTING_RECORD_ID } from '../const'

export default function Category(props: t.Props) {
  const filterValues = React.useMemo(
    () => ({
      category: props.context.categoryPath || '',
      flags: props.tag ? [props.tag] : [],
    }),
    [props.context.categoryPath, props.context.filters]
  )

  useInitializer(LISTING_RECORD_ID, filterValues, props.context.filters)

  return (
    <ProductList
      recordId={LISTING_RECORD_ID}
      showCategoryTree={true}
      listname={'Category Listing: ' + filterValues.category}
      injectedTeasers={
        props.showInjectedTeaser ? props.injectedTeasers : undefined
      }
    />
  )
}
