import * as eec from 'utils/eec'

export type UserConfig = {
  gridArea: string
  categoryId: string
  title: string
  numHits: number | null
  headerOnly: boolean
  eecTracking: eec.TrackingConfig
}

export type Context = {
  numHits: number | null
  title: string
  link: string
}

export type Props = UserConfig & {
  context: Context
}
