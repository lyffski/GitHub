import { addRule } from 'redux-ruleset'
import { LOCATION_CHANGED } from 'modules/navigation/const'
import {
  SET_CURRENT_CATEGORY,
  CLEAR,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
} from 'modules/ui/const'
import {
  setCurrentCategory,
  clear,
  hideOverlay,
  showOverlay,
} from 'modules/ui/actions'
import { FETCH_SUCCESS as PRODUCT_DETAIL_SUCCESS } from 'modules/productDetail/const'
import { FETCH_SUCCESS as LISTING_SUCCESS } from 'modules/listing/const'
import { FETCH_SUCCESS as SERIES_LISTING_SUCCESS } from 'modules/seriesListing/const'
import { FETCH_SUCCESS as SERIES_DETAIL_SUCCESS } from 'modules/seriesDetail/const'

import { pageTypeInPath } from 'utils/defaultRegex'
import getCookieByName from 'utils/getCookieByName'

/**
 * Der ui state soll sich bei jedem Seiten Wechsel komplett leeren
 * Die clear action verfügt über eine Ausnahme Regelung, damit der angegebene state nicht zurückgesetzt wird
 * Wenn die neue Seite die Suche ist, soll diese nicht geleert werden (suche im Header leitet nach 3 Zeichen auf die search-page weiter)
 * Ansonsten wird der currentCategory Wert nicht zurückgesetzt
 */
addRule({
  id: 'feature/LOCATION_CHANGE_CLEAR_UI',
  target: LOCATION_CHANGED,
  output: CLEAR,

  consequence: (action) => {
    if (pageTypeInPath(action.payload.pathname, 'search'))
      return clear('searchValue')
    return clear('currentCategory')
  },
})

/**
 * DEPRACATED: https://jira.em-group.de/browse/WDV-620
 * used to pre-select category in flyout navi by click on burger menu
 * Beim öffnen der Sidebar soll der currentCategory Wert in den sidebarCategory state geschrieben werden damit die Kategorie vorausgewählt ist
 
addRule({
  id: 'feature/TOGGLE_NAVI_SET_SIDEBAR_CATEGORY',
  target: TOGGLE_NAVI,
  output: SET_SIDEBAR_CATEGORY,
  position: 'INSTEAD',
  condition: (_, { getState }) => {
    const state = getState()
    return !state.ui.showFlyoutNavi && !!state.ui.currentCategory
  },
  consequence: (_, { getState }) => {
    const state = getState()
    const categoryPath = state.ui.currentCategory
    // return setSidebarCategory(categoryPath?.split(' > ').reverse()[1] || null)
    return setSidebarCategory(categoryPath || null)
  },
})
*/

/**
 * Der currentCategory state soll immer auf default gesetzt werden wenn die Ziel Seite keine Kategorie oder PDP ist.
 */
addRule({
  id: 'feature/LOCATION_CHANGE_CLEAR_CURRENT_CATEGORY',
  target: LOCATION_CHANGED,
  output: SET_CURRENT_CATEGORY,
  condition: (action, { getState }) => {
    const state = getState()
    return (
      !!state.ui.currentCategory &&
      !pageTypeInPath(action.payload.pathname, 'category') &&
      !pageTypeInPath(action.payload.pathname, 'pdp') &&
      !pageTypeInPath(action.payload.pathname, 'series')
    )
  },
  consequence: () => {
    return setCurrentCategory(null)
  },
})

/**
 * Der currentCategory state soll nach dem erfolgreichem fetchen des Listings (development mode)
 * oder nach dem PARTIAL_STATE_UPDATE gesetzt werden. (production mode)
 * --> dont trigger if recordId is series-pdp
 */
addRule({
  id: 'feature/LISTING_SET_CURRENT_CATGEORY',
  target: [LISTING_SUCCESS, 'PARTIAL_STATE_UPDATE'],
  output: SET_CURRENT_CATEGORY,
  condition: (action) => {
    return !(
      action.type === 'listing/FETCH_SUCCESS' &&
      action.meta.recordId === 'series-pdp'
    )
  },
  consequence: (_, { getState }) => {
    const state = getState()
    if (state.listing.category?.filterValues.category)
      return setCurrentCategory(state.listing.category?.filterValues.category)
    return setCurrentCategory(null)
  },
})

/**
 * Der currentCategory state soll nach dem erfolgreichem fetchen des SeriesListings gesetzt werden
 */
addRule({
  id: 'feature/SERIES_LISTING_SET_CURRENT_CATGEORY',
  target: SERIES_LISTING_SUCCESS,
  output: SET_CURRENT_CATEGORY,
  consequence: (_, { getState }) => {
    const state = getState()
    if (state.seriesListing.category?.filterValues.categoryPath)
      return setCurrentCategory(
        state.seriesListing.category?.filterValues.categoryPath
      )
    return setCurrentCategory(null)
  },
})

/**
 * Der currentCategory state nach dem fetchen der PDP gesetzt werden.
 */
addRule({
  id: 'feature/PRODUCT_DETAIL_SET_CURRENT_CATGEORY',
  target: PRODUCT_DETAIL_SUCCESS,
  output: SET_CURRENT_CATEGORY,
  position: 'AFTER',
  consequence: (action) => {
    const productDetailCategories = action.payload[0]?.mainCategory
    if (productDetailCategories) {
      if (productDetailCategories.lvl7)
        return setCurrentCategory(productDetailCategories.lvl7[0])
      if (productDetailCategories.lvl6)
        return setCurrentCategory(productDetailCategories.lvl6[0])
      if (productDetailCategories.lvl5)
        return setCurrentCategory(productDetailCategories.lvl5[0])
      if (productDetailCategories.lvl4)
        return setCurrentCategory(productDetailCategories.lvl4[0])
      if (productDetailCategories.lvl3)
        return setCurrentCategory(productDetailCategories.lvl3[0])
      if (productDetailCategories.lvl2)
        return setCurrentCategory(productDetailCategories.lvl2[0])
      if (productDetailCategories.lvl1)
        return setCurrentCategory(productDetailCategories.lvl1[0])
      if (productDetailCategories.lvl0)
        return setCurrentCategory(productDetailCategories.lvl0[0])
    }
    return setCurrentCategory(null)
  },
})

/**
 * Der currentCategory state nach dem fetchen der Series Detail gesetzt werden.
 */
addRule({
  id: 'feature/SERIES_DETAIL_SET_CURRENT_CATGEORY',
  target: SERIES_DETAIL_SUCCESS,
  output: SET_CURRENT_CATEGORY,
  position: 'AFTER',
  consequence: (action) => {
    const seriesDetailCategories = action.payload.container?.categories
    if (seriesDetailCategories) {
      if (seriesDetailCategories.lvl7)
        return setCurrentCategory(seriesDetailCategories.lvl7[0])
      if (seriesDetailCategories.lvl6)
        return setCurrentCategory(seriesDetailCategories.lvl6[0])
      if (seriesDetailCategories.lvl5)
        return setCurrentCategory(seriesDetailCategories.lvl5[0])
      if (seriesDetailCategories.lvl4)
        return setCurrentCategory(seriesDetailCategories.lvl4[0])
      if (seriesDetailCategories.lvl3)
        return setCurrentCategory(seriesDetailCategories.lvl3[0])
      if (seriesDetailCategories.lvl2)
        return setCurrentCategory(seriesDetailCategories.lvl2[0])
      if (seriesDetailCategories.lvl1)
        return setCurrentCategory(seriesDetailCategories.lvl1[0])
      if (seriesDetailCategories.lvl0)
        return setCurrentCategory(seriesDetailCategories.lvl0[0])
    }
    return setCurrentCategory(null)
  },
})

/**
 * if user has not by b2c-decision decided yet,show the overlay
 * Special: tag categories dont trigger location_change.
 * Therefore rule expects listingsuccess action by Tag-Category and then triggers show overlay
 */

addRule({
  id: 'b2cSwitch/SHOW_OVERLAY',
  target: [LOCATION_CHANGED, LISTING_SUCCESS],
  output: SHOW_OVERLAY,
  concurrency: 'LAST',
  condition: (action) => {
    if (action.type === LISTING_SUCCESS) {
      if (action.meta.filterValues.flags.length === 0) {
        return false
      }
    }
    return getCookieByName('b2cDecision') === '0'
  },
  consequence: () => {
    return showOverlay()
  },
})

/**
 * After 8 seconds hide the overlay
 */

addRule({
  id: 'b2cSwitch/HIDE_OVERLAY_AFTER_DELAY',
  target: SHOW_OVERLAY,
  output: HIDE_OVERLAY,
  delay: 8000,
  concurrency: 'LAST',
  consequence: () => {
    return hideOverlay()
  },
})
