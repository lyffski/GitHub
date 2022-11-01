import { createController } from '@kaminrunde/fireside-utils'
import * as t from './types'
import fetchBySearch from 'utils/productListFetcher/bySearch'
import fetchBySku from 'utils/productListFetcher/bySku'

export default createController<t.UserConfig, t.Context>({
  createContext: async (props) => {
    const fetchProducts = props.searchSwitch
      ? fetchBySearch(props.search, props.maxProducts)
      : fetchBySku(props.skuList || [], props.maxProducts)
    const products = await fetchProducts(0)
    return {
      products: products.data,
      nbHits: products.nbHits,
    }
  },
  versionUpdate: (props) => {
    /** 14.10.2020 added max products prop */
    if (!props.__version) {
      props.__version = 1
      props.maxProducts = 20
    }
    /**28.03.22 added skulist  */
    if (props.__version === 1) {
      props.__version = 2
      props.skuList = []
      props.searchSwitch = true
    }
    return props
  },
})
