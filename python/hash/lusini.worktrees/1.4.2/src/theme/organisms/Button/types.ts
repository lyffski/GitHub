import * as eec from 'utils/eec'

export type Props = {
  gridArea: string
  label: string
  link: string
  variation: Variation
  eecTracking?: eec.TrackingConfig
}

type Variation =
  | 'primary'
  | 'secondary'
  | 'primary_s'
  | 'secondary_s'
  | 'cart'
  | 'cart_disabled'
  | 'special'
  | 'special_s'
