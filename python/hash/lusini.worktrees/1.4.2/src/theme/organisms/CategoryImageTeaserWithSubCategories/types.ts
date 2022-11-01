import { OptImg } from 'utils/imageOptimization'
import * as eec from 'utils/eec'

export type UserConfig = {
  gridArea: string
  categoryId: string
  teaserImage: string
  title: string
  style: 'prominent' | 'top'
  numHits: number | null
  categories: {
    label: string
    imgSrc: string
    link: string
    textStyle: 'left' | 'center'
  }[]
  eecTracking: eec.TrackingConfig
}

export type Context = {
  numHits: number | null
  title: string
  link: string
  optImg: OptImg
  isSeries: boolean
  categoryOptImg: OptImg[]
}

export type Props = UserConfig & {
  context: Context
}
