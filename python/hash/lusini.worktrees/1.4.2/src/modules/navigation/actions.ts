import * as t from './types'
import * as at from './const'

export const locationChanged = (
  newLocation: t.Location,
  prevLocation: t.Location | null
) => ({
  type: at.LOCATION_CHANGED,
  meta: { prevLocation },
  payload: newLocation,
})

export type LocationChanged = ReturnType<typeof locationChanged>

export type Action = LocationChanged
