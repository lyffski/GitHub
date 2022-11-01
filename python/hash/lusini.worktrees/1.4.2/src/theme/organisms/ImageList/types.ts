import { OptImg } from 'utils/imageOptimization'
import * as eec from 'utils/eec'

export type Category = {
  label: string
  imgSrc: string
  link: string
  optImg: OptImg
}

export type UserConfig = {
  gridArea: string
  title: string
  categories: Category[]
  eecTracking: eec.TrackingConfig
}

export type Context = {
  categoryOptImg: OptImg[]
}

export type Props = UserConfig & {
  context: Context
}
