import { addRule, skipRule } from 'redux-ruleset'
import * as a from './actions'
import * as s from './selectors'
import * as at from './const'
import * as api from './utils/api'

/**
 * When a action is dispatched that changes the filterValues
 * Then we want to trigger a fetch-request
 */
addRule({
  id: 'listing/TRIGGER_FETCH',
  target: [
    at.INIT,
    at.SET_FILTER_VALUE,
    at.SET_QUERY,
    at.TOGGLE_FACET,
    at.SET_PRICE,
    at.SET_INDEX,
    at.SET_PAGE,
    at.RESET_FILTER_VALUES,
    at.SET_FILTER_ATTRIBUTE,
    at.SET_FACET_RANGE,
    at.SET_CATEGORY,
  ],
  output: at.FETCH_REQUEST,
  consequence: (action, { getState }) => {
    const state = getState()
    const filterValues = s.getFilterValues(state.listing, action.meta.recordId)
    return a.fetchRequest(action.meta.recordId, filterValues)
  },
})

addRule({
  id: 'listing/FETCH',
  target: at.FETCH_REQUEST,
  output: [at.FETCH_FAILURE, at.FETCH_SUCCESS],
  concurrency: 'SWITCH',
  concurrencyFilter: (action) => action.meta.recordId,
  consequence: (action) => {
    const { filterValues } = action.meta
    return api.fetch(filterValues).then(
      (result) => a.fetchSuccess(action.meta.recordId, filterValues, result),
      (error) =>
        a.fetchFailure(action.meta.recordId, filterValues, error.toString())
    )
  },
})

/**
 * When we receive a result list with 0 products
 * Then we refetch the category tree in order to not have a empty category-tree
 */
addRule({
  id: 'listing/CATEGORY_TREE_FOR_NO_HITS',
  target: at.FETCH_SUCCESS,
  position: 'INSTEAD',
  output: [at.FETCH_SUCCESS, at.FETCH_FAILURE],
  condition: (action) => action.payload.hits.length === 0,
  consequence: async (action, { getState }) => {
    const state = getState()
    const resetValues = s.getResetFilterValues(
      state.listing,
      action.meta.recordId
    )

    try {
      const result = await api.fetch(resetValues)
      const newAction = {
        ...action,
        payload: {
          ...action.payload,
          categoryTree: result.categoryTree,
        },
      }
      return skipRule('listing/CATEGORY_TREE_FOR_NO_HITS', newAction)
    } catch (e: any) {
      return a.fetchFailure(
        action.meta.recordId,
        action.meta.filterValues,
        e.toString()
      )
    }
  },
})

/**
 * When we initialize our module
 * And there is no need to initialize our module
 * Then we cancel the init
 */
addRule({
  id: 'feature/PREVENT_INIT',
  target: at.INIT,
  position: 'INSTEAD',
  output: at.INIT,
  weight: 10,
  condition: (action, { getState }) => {
    const state = getState()
    if (!state.listing[action.meta.recordId]) return false
    const filterValues = s.getFilterValues(state.listing, action.meta.recordId)
    const initValues = action.payload
    return JSON.stringify(filterValues) === JSON.stringify(initValues)
  },
  consequence: (action) => skipRule('listing/TRIGGER_FETCH', action),
})
