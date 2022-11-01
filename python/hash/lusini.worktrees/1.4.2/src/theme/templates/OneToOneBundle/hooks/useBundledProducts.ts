import * as React from 'react'
import { init } from 'modules/listing/actions'
import store from 'store'
import { getProductFromSku, getRelatedSkus } from '../utils/api'
import { RECORD_ID } from '../const'
import { getFilters } from 'utils/categories'
import { Product } from '../types'
import * as events from '../events'

/** @firescoutMockFn OneToOneBundle.useBundledProducts */
export default function useBundledProducts() {
  const [type, setType] = React.useState<string | null>(null)
  const [firstProduct, setFirstProduct] = React.useState<null | Product>(null)
  const [secondProduct, setSecondProduct] = React.useState<null | Product>(null)
  const [trigger, setTrigger] = React.useState<boolean>(false)
  const [startedFrom, setStartedFrom] = React.useState<string>('')
  const [showDefaults, setShowDefaults] = React.useState<boolean>(false)

  React.useEffect(() => {
    const fetchData = async () => {
      const result = firstProduct?.sku
        ? await getProductFromSku(firstProduct.sku)
        : secondProduct?.sku
        ? await getProductFromSku(secondProduct.sku)
        : await getProductFromSku()

      if (result && !secondProduct) {
        setFirstProduct(result.preSelectedProduct)
        setType(result.type)
        setStartedFrom(result.preSelectedProduct.sku)
      }

      const relatedSkus = result?.preSelectedProduct
        ? getRelatedSkus(result.preSelectedProduct)
        : null

      const filters = await getFilters()

      if (relatedSkus) {
        store.dispatch(
          init(
            RECORD_ID,
            { skus: relatedSkus, distinct: false, mode: 'SELLABLE' },
            filters
          )
        )
      } else {
        store.dispatch(
          init(
            RECORD_ID,
            { distinct: false, configurableProduct: true, mode: 'SELLABLE' },
            filters
          )
        )
        setShowDefaults(true)
      }
    }
    fetchData()
  }, [trigger, firstProduct?.sku, secondProduct?.sku])

  return {
    type,
    firstProduct,
    setFirstProduct: async (sku: string | null) => {
      if (!sku) return setFirstProduct(null)
      const res = await getProductFromSku(sku)
      if (!res) return setFirstProduct(null)
      setFirstProduct(res.preSelectedProduct)
      secondProduct &&
        events.selectProduct(res.preSelectedProduct, secondProduct, startedFrom)
    },
    secondProduct,
    setSecondProduct: async (sku: string | null) => {
      if (!sku) return setSecondProduct(null)
      const res = await getProductFromSku(sku)
      if (!res) return setSecondProduct(null)
      setSecondProduct(res.preSelectedProduct)
      firstProduct &&
        events.selectProduct(firstProduct, res.preSelectedProduct, startedFrom)
    },
    trigger,
    setTrigger,
    startedFrom,
    showDefaults,
  }
}
