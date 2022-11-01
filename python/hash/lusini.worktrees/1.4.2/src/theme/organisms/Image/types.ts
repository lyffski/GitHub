import { OptImg } from 'utils/imageOptimization'
import * as eec from 'utils/eec'

export type UserConfig = {
  gridArea: string
  __version: number
  imageSrc: string
  imageLink: string
  label: string
  imageCaption: string
  alt: string
  fill: boolean
  eecTracking: eec.TrackingConfig
}

export type Context = {
  optImg: OptImg
}

export type Props = UserConfig & {
  context: Context
}
