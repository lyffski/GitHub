import * as t from './types'
import { createController } from '@kaminrunde/fireside-utils'
import { getCategory } from 'utils/categories'
import slugify from 'utils/slugify'
import fetchCategoryNumHits, {
  fetchSeriesNumHits,
} from 'utils/fetchCategoryNumHits'
import fetchBySku from 'utils/productListFetcher/bySku'
import { createOptImg } from 'utils/imageOptimization'

export default createController<t.UserConfig, t.Context>({
  async createContext(props, { getGridContext }) {
    const optImg = await createOptImg(props.bg, getGridContext())
    const fetchProducts = fetchBySku(props.skuList, props.skuList.length)
    const products = await fetchProducts(0)
    const hit = await getCategory(props.categoryId)

    if (props.categoryId === '' || !hit) {
      return {
        numHits: null,
        title: '',
        link: '',
        imageBase64: optImg.base64,
        optImg: optImg,
        productList: products.data,
        isSeries: false,
      }
    }

    const numCategoryHits = hit.hasSeries
      ? await fetchSeriesNumHits(props.categoryId)
      : await fetchCategoryNumHits(hit.path)

    return {
      numHits: numCategoryHits || null,
      title: hit.label !== '' ? hit.label : '',
      link: hit.path !== '' ? '/category/' + slugify(hit.path) : '',
      imageBase64: optImg.base64,
      optImg: optImg,
      productList: products.data,
      isSeries: hit.hasSeries,
    }
  },
})
