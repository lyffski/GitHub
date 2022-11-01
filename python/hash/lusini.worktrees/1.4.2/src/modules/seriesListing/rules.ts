import { addRule } from 'redux-ruleset'
import * as at from './const'
import * as a from './actions'
import * as api from './utils/api'
import * as s from './selectors'

addRule({
  id: 'seriesListing/TRIGGER_FETCH',
  target: [at.INIT, at.SET_PAGE],
  output: at.FETCH_REQUEST,
  consequence: (action, { getState }) => {
    const state = getState()
    const recordId = action.meta.recordId
    const filterValues = s.getFilterValues(state.seriesListing, recordId)
    return a.fetchRequest(recordId, filterValues)
  },
})

addRule({
  id: 'seriesListing/FETCH',
  target: at.FETCH_REQUEST,
  output: [at.FETCH_SUCCESS, at.FETCH_FAILURE],
  concurrency: 'SWITCH',
  concurrencyFilter: (action) => action.meta.recordId,
  consequence: (action) =>
    api.fetch(action.meta.filterValues).then(
      (result) =>
        a.fetchSuccess(action.meta.recordId, action.meta.filterValues, result),
      (error) =>
        a.fetchFailure(
          action.meta.recordId,
          action.meta.filterValues,
          error.toString()
        )
    ),
})
