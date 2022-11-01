import { dispatchEvent } from 'redux-ruleset'
import { Product } from './types'

export const PRESENT: 'ProductSlider/PRESENT' = 'ProductSlider/PRESENT'

export const present = (listname: string, products: Product[]) =>
  dispatchEvent({
    type: PRESENT,
    meta: { listname, products },
  })

export type Present = ReturnType<typeof present>
