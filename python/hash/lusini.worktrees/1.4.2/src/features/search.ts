import { addRule } from 'redux-ruleset'
import { SET_SEARCH_VALUE } from 'modules/ui/const'
import { navigate } from 'gatsby'
import { pageTypeInPath } from 'utils/defaultRegex'
import { FETCH_REQUEST } from 'modules/listing/const'

/**
 * When header search input has more than three characters
 * And we are not on the search route
 * Then we want to navigate to the search route
 */
addRule({
  id: 'feature/NAVIGATE_TO_SEARCH_ROUTE',
  target: SET_SEARCH_VALUE,
  output: '#navigate',
  condition: (action) => {
    if (pageTypeInPath(window.location.pathname, 'search')) return false
    return action.payload.length >= 3
  },
  consequence: () => navigate('/search/'),
})

/**
 * When we are on the search route
 * And we have a non-empty query
 * And we fetch our products
 * Then we add the algolia-analytics-tag "manual-query" to the search-request
 */
addRule({
  id: 'feature/MANUAL_QUERY_ANALYTICS',
  target: FETCH_REQUEST,
  position: 'INSTEAD',
  output: FETCH_REQUEST,
  condition: (action) => {
    if (!pageTypeInPath(window.location.pathname, 'search')) return false
    return action.meta.filterValues.query.length > 0
  },
  consequence: (action) => {
    return {
      ...action,
      meta: {
        ...action.meta,
        filterValues: {
          ...action.meta.filterValues,
          analyticTags: [
            ...action.meta.filterValues.analyticTags,
            'manual-query',
          ],
        },
      },
    }
  },
})
