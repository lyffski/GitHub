import { Product } from 'utils/productListFetcher/types'
import * as eec from 'utils/eec'

export type UserConfig = {
  __version: number
  gridArea: string
  search: string
  maxProducts: number
  title: string
  skuList: string[]
  searchSwitch: boolean
  eecTracking: eec.TrackingConfig
}

export type Context = {
  products: Product[]
  nbHits: number
}

export type Props = UserConfig & {
  context: Context
}
