import { Product } from 'utils/productListFetcher/types'
import { OptImg } from 'utils/imageOptimization'
import * as eec from 'utils/eec'

export type UserConfig = {
  gridArea: string
  categoryId: string
  bg: string
  title: string
  skuList: string[]
  style: 'top' | 'prominent'
  eecTracking: eec.TrackingConfig
}

export type Context = {
  numHits: number | null
  title: string
  link: string
  imageBase64: string
  optImg: OptImg
  productList: Product[]
  isSeries: boolean
}

export type Props = UserConfig & {
  context: Context
}
