import * as React from 'react'
import { addRule } from 'redux-ruleset'
import { pageTypeInPath } from 'utils/defaultRegex'
import * as Partials from 'containers/Partials'

import ToTopButton from 'theme/partials/ToTopButton/ToTopButton'

addRule({
  id: 'feature/SHOW_TO_TOP_BUTTON',
  target: 'navigation/LOCATION_CHANGED',
  output: '#partial-mount',
  condition: () => {
    if (
      pageTypeInPath(window.location.pathname, 'account') ||
      pageTypeInPath(window.location.pathname, 'cart')
    )
      return false
    return true
  },
  consequence: () => {
    Partials.remove('toTopButton/LOAD_BUTTON')
    Partials.add('toTopButton/LOAD_BUTTON', () => {
      return <ToTopButton />
    })
  },
})

addRule({
  id: 'feature/REMOVE_TO_TOP_BUTTON',
  target: 'navigation/LOCATION_CHANGED',
  output: '#partial-mount',
  condition: () => {
    if (
      !pageTypeInPath(window.location.pathname, 'account') &&
      !pageTypeInPath(window.location.pathname, 'cart')
    )
      return false
    return true
  },
  consequence: () => {
    Partials.remove('toTopButton/LOAD_BUTTON')
  },
})
