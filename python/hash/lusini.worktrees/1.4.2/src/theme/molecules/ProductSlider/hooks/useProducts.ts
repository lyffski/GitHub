import * as React from 'react'
import * as t from '../types'

export default function useProducts(props: t.Props, lastItemReached: boolean) {
  const [products, setProducts] = React.useState<t.Product[]>(
    props.initialProducts || []
  )
  const [page, setPage] = React.useState(0)
  const [allItemsLoaded, setAllItemsLoaded] = React.useState(
    props.maxProducts === products.length
  )

  React.useEffect(() => {
    if (!lastItemReached || allItemsLoaded === true) return
    setPage((p) => p + 1)
  }, [lastItemReached, allItemsLoaded])

  React.useEffect(() => {
    // do not call on first page if initial products are set
    if (props.initialProducts && page === 0) return
    props.fetchFn(page).then((result) => {
      setProducts((p) => [...p, ...result.data])
      if (result.finished) setAllItemsLoaded(true)
    })
  }, [page])

  return { data: products, allItemsLoaded }
}
