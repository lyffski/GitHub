import { addRule } from 'redux-ruleset'
import * as at from './const'
import * as a from './actions'
import * as api from './utils/api'

addRule({
  id: 'seriesDetail/FETCH',
  target: at.FETCH_REQUEST,
  output: [at.FETCH_SUCCESS, at.FETCH_FAILURE],
  concurrency: 'FIRST',
  concurrencyFilter: (action) => action.meta.objectID,
  consequence: (action) =>
    api.fetch(action.meta.objectID).then(
      (result) => a.fetchSuccess(action.meta.objectID, result),
      (error) => a.fetchFailure(action.meta.objectID, error.toString())
    ),
})

addRule({
  id: 'seriesDetail/TRIGGER_FETCH',
  target: at.INIT,
  output: at.FETCH_REQUEST,
  consequence: (action, { getState }) => {
    const state = getState()
    const prevId = state.seriesDetail.data?.objectID
    if (prevId !== action.payload) {
      return a.fetchRequest(action.payload)
    } else {
      return null
    }
  },
})
