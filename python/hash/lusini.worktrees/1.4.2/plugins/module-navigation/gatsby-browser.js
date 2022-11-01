export function onRouteUpdate({ location, prevLocation }) {
  if (typeof window !== 'undefined') {
    if (window.__module_navigation_location_change) {
      window.__module_navigation_location_change(location, prevLocation)
    }
  }
}
