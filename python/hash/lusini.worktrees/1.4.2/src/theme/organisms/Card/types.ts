import { OptImg } from 'utils/imageOptimization'
import * as eec from 'utils/eec'

export type UserConfig = {
  gridArea: string
  disclaimer: string
  title: string
  teaserImage: string
  link: string
  eecTracking?: eec.TrackingConfig
}

export type Context = {
  optImg: OptImg
}

export type Props = UserConfig & {
  context: Context
}
