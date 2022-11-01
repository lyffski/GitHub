import { addRule } from 'redux-ruleset'
import * as a from './actions'
import * as t from './types'
import * as at from './const'
import * as api from './utils/api'

addRule({
  id: 'productDetail/TRIGGER_FETCH',
  target: at.INIT,
  output: at.FETCH_REQUEST,
  consequence: (action) => a.fetchRequest(action.payload),
})

addRule({
  id: 'productDetail/FETCH',
  target: at.FETCH_REQUEST,
  output: [at.FETCH_SUCCESS, at.FETCH_FAILURE],
  concurrency: 'FIRST',
  consequence: (action) =>
    api.fetch(action.meta.filterValues).then(
      (result) => a.fetchSuccess(action.meta.filterValues, result),
      (error) => a.fetchFailure(action.meta.filterValues, error.toString())
    ),
})

addRule({
  id: 'productDetail/SET_DEFAULT_VARIANT',
  target: at.FETCH_SUCCESS,
  output: at.SET_FILTER_VALUES,
  position: 'BEFORE',
  condition: (action) => action.payload.length > 0,
  consequence: (action) => {
    const firstVariant = action.payload[0]
    const filterValues: Omit<t.FilterValues, 'containerID'> = {
      color: firstVariant.variantData.color.label || null,
      size: firstVariant.variantData.size.label || null,
      variant: firstVariant.variantData.variant.label || null,
      style: firstVariant.variantData.style.label || null,
    }
    return a.setFilterValues(filterValues)
  },
})
