import { OptImg } from 'utils/imageOptimization'
import * as eec from 'utils/eec'

export type UserConfig = {
  gridArea: string
  categoryId: string
  bg: string
  title: string
  style: 'small' | 'top' | 'prominent'
  eecTracking: eec.TrackingConfig
}

export type Context = {
  numHits: number | null
  title: string
  link: string
  optImg: OptImg
  isSeries: boolean
}

export type Props = UserConfig & {
  context: Context
}
