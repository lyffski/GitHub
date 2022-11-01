import * as React from 'react'
import * as t from './types'
import fetchBySku from 'utils/productListFetcher/bySku'
import { Result } from 'utils/productListFetcher/types'

/** @firescoutMockFn templates-PDP.useRelatedSkus */
export default function useRelatedSkus(props: t.Props) {
  const [products, setProducts] = React.useState<Result | null>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const skus = props.variant.data.related.configurableRelations
        ? props.variant.data.related.configurableRelations[0].skus
        : []
      const result = await fetchBySku(skus)(0)
      setProducts(result)
    }
    fetchData()
  }, [props])

  return products
}
