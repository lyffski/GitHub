import './rules'
import { addRule } from 'redux-ruleset'
import * as t from './types'
import * as a from './actions'
import * as at from './const'
import store from '../../store'
import { injectReducer } from 'store/rootReducer'
import reducer from './reducer'

injectReducer(store, 'listing', reducer)

let id = 0

export default function prefetchListing(
  recordId: string,
  filterValues: Partial<t.FilterValues>,
  attributes: {
    key: string
    label: string
    filtertype: string
    unit?: string
  }[]
) {
  const next = id++
  const nextRecordId = recordId + next
  // @ts-ignore
  store.dispatch(a.init(nextRecordId, filterValues, attributes))

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(
        'prefetchListing takes too long!!! ' + JSON.stringify(filterValues)
      )
    }, 60000)

    addRule({
      id: 'listing/PREFETCH' + next,
      target: [at.FETCH_SUCCESS, at.FETCH_FAILURE],
      output: '#prefetch-resolve',
      condition: (action) => action.meta.recordId === nextRecordId,
      consequence: (action, { getState }) => {
        const state = getState()

        if (action.type === at.FETCH_FAILURE) {
          reject(action.payload)
        }

        resolve({
          type: 'PARTIAL_STATE_UPDATE',
          meta: {
            path: ['listing', recordId],
          },
          payload: state.listing[nextRecordId],
        })
      },
    })
  })
}

// { category: 'Teller '}
// { category: 'Hussen' }

// --> Hussen
