import { OptImg } from 'utils/imageOptimization'
import * as eec from 'utils/eec'

export type Item = {
  link: string
  imgSrc: string
  title: string
  description: string
  linkLabel: string
}

export type UserConfig = {
  gridArea: string
  items: Item[]
  eecTracking: eec.TrackingConfig
}

export type Context = {
  optImages: OptImg[]
}

export type Props = UserConfig & {
  context: Context
}
