import { addRule } from 'redux-ruleset'
import * as at from './const'
import * as a from './actions'
import * as api from './utils/api'

addRule({
  id: 'cart/INITIAL_FETCH',
  target: '*',
  output: at.SET,
  addOnce: true,
  consequence: () =>
    api.fetch().then(
      (result) => (result.items.length ? a.set(result) : null),
      () => null
    ),
})

addRule({
  id: 'cart/REFRESH',
  target: at.REFRESH,
  output: at.SET,
  consequence: () =>
    api.fetch().then(
      (result) => (result.items ? a.set(result) : null),
      () => null
    ),
})

addRule({
  id: 'cart/ADD_ITEM',
  target: at.ADD_ITEM_REQUEST,
  output: [at.ADD_ITEM_SUCCESS, at.ADD_ITEM_FAILURE],
  concurrency: 'LAST',
  consequence: (action) =>
    api.addItem(action.meta.rawItem).then(
      (result) => a.addItemSuccess(action.meta.rawItem, result),
      (error) => a.addItemFailure(action.meta.rawItem, error.toString())
    ),
})

// Remove only possible in Cart (Flyoutcart is just info)

addRule({
  id: 'cart/REMOVE_ITEM',
  target: at.REMOVE_ITEM_REQUEST,
  output: [at.REMOVE_ITEM_SUCCESS, at.REMOVE_ITEM_FAILURE],
  concurrency: 'SWITCH',
  consequence: (action) =>
    api.removeItem(action.payload).then(
      (result) => a.removeItemSuccess(action.payload, result),
      (error) => a.removeItemFailure(error.toString())
    ),
})
