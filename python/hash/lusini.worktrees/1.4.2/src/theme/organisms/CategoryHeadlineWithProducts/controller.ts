import * as t from './types'
import { createController } from '@kaminrunde/fireside-utils'
import { getCategory } from 'utils/categories'
import slugify from 'utils/slugify'
import fetchCategoryNumHits from 'utils/fetchCategoryNumHits'
import fetchBySku from 'utils/productListFetcher/bySku'
import { createOptImg } from 'utils/imageOptimization'

export default createController<t.UserConfig, t.Context>({
  async createContext(props, { getGridContext }) {
    const optImg = await createOptImg(props.image, getGridContext(), {
      XL: 0.3,
    })

    const fetchProducts = fetchBySku(props.skuList, props.skuList.length)
    const products = await fetchProducts(0)
    const hit = await getCategory(props.categoryId)

    if (props.categoryId === '' || !hit) {
      return {
        numHits: null,
        title: '',
        link: '',
        optImg: optImg,
        productList: products.data,
      }
    }
    const numCategoryHits = await fetchCategoryNumHits(hit.path)

    return {
      numHits: numCategoryHits || null,
      title: hit.label !== '' ? hit.label : '',
      link: hit.path !== '' ? '/category/' + slugify(hit.path) : '',
      optImg: optImg,
      productList: products.data,
    }
  },
})
