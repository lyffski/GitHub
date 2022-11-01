import { getSkuFromUrl } from './helper'
import fetchBySku from 'utils/productListFetcher/bySku'
import { Product, Result } from 'utils/productListFetcher/types'

/** @firescoutMockFn OneToOneBundle.getProductFromSku */
export const getProductFromSku = async (sku?: string) => {
  let result: Result
  if (sku) {
    result = await fetchBySku([sku])(0)
  } else {
    const sku = getSkuFromUrl()
    if (sku === null) return null
    result = await fetchBySku([sku[1]], 24)(0)
  }
  if (result.data.length === 0) return null
  if (result.data[0].related.configurableRelations?.length === 0) return null

  return {
    preSelectedProduct: result.data[0],
    type: result.data[0].related.configurableRelations
      ? result.data[0].related.configurableRelations[0].type
      : null,
  }
}

export const getRelatedSkus = (product: Product) =>
  product.related.configurableRelations
    ? product.related.configurableRelations[0]?.skus
    : null
