import { Product } from 'utils/productListFetcher/types'
import { OptImg } from 'utils/imageOptimization'
import * as eec from 'utils/eec'

export type UserConfig = {
  gridArea: string
  categoryId: string
  headline: string
  image: string
  imageText: string
  skuList: string[]
  eecTracking: eec.TrackingConfig
}

export type Context = {
  numHits: number | null
  title: string
  link: string
  optImg: OptImg
  productList: Product[]
}

export type Props = UserConfig & {
  context: Context
}
