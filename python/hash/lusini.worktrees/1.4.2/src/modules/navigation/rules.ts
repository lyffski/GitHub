import store from 'store'
import * as t from './types'
import * as a from './actions'

declare global {
  interface Window {
    __module_navigation_location_change: (
      location: t.Location,
      prev: t.Location | null
    ) => void
  }
}

if (typeof window !== 'undefined') {
  window.__module_navigation_location_change = function (
    location,
    prevLocation
  ) {
    const action = a.locationChanged(location, prevLocation)
    store.dispatch(action)
  }
}
