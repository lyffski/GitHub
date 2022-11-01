import { OptImg } from 'utils/imageOptimization'
import * as eec from 'utils/eec'

export type UserConfig = {
  gridArea: string
  imgSrc: string
  link: string
  description: string
  title: string
  linkLabel: string
  eecTracking: eec.TrackingConfig
}

export type Context = {
  optImg: OptImg
}

export type Props = UserConfig & {
  context: Context
}
