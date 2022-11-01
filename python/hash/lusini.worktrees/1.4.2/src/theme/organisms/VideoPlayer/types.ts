import * as eec from 'utils/eec'

export type UserConfig = {
  gridArea: string
  link: string
  eecTracking: eec.TrackingConfig
}

export type Props = UserConfig
