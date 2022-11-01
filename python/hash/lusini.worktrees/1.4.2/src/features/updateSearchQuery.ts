import { addRule } from 'redux-ruleset'
import { SET_SEARCH_VALUE } from 'modules/ui/const'
import { SET_QUERY } from 'modules/listing/const'
import { setQuery } from 'modules/listing/actions'
import { INIT } from 'modules/listing/const'
import { LOCATION_CHANGED } from 'modules/navigation/const'
import { setSearchValue } from 'modules/ui/actions'
import { pageTypeInPath } from 'utils/defaultRegex'

/**
 * When I am on the search route
 * And I update the search value
 * And the search value has more than three chars
 * Then I want to update the query in my listing module
 */
addRule({
  id: 'feature/UPDATE_SEARCH_QUERY',
  target: SET_SEARCH_VALUE,
  output: SET_QUERY,
  condition: () => pageTypeInPath(window.location.pathname, 'search'),
  consequence: (action, { getState }) => {
    const state = getState()
    // don't trigger set query if search state query is the same as the action payload
    if (state.listing.search?.filterValues.query === action.payload) {
      return null
    }
    return setQuery('search', action.payload)
  },
})

/**
 * Given we visit the search route
 * When we init the product list
 * Then we hydrate the search value
 */
addRule({
  id: 'feature/HYDRATE_SEARCH_VALUE',
  target: INIT,
  output: SET_SEARCH_VALUE,
  addWhen: function* (next) {
    yield next(LOCATION_CHANGED, (action) =>
      action.payload.pathname.includes('/search/')
    )
    return 'ADD_RULE'
  },
  addUntil: function* (next) {
    yield next(
      LOCATION_CHANGED,
      (action) => !action.payload.pathname.includes('/search/')
    )
    return 'RECREATE_RULE'
  },
  consequence: (action) => setSearchValue(action.payload.query),
})
