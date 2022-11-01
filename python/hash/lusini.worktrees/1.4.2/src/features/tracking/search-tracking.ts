import { addRule } from 'redux-ruleset'
import { SET_SEARCH_VALUE } from 'modules/ui/const'
import { FETCH_SUCCESS, FETCH_FAILURE } from 'modules/listing/const'
import * as searchEvents from 'theme/app/Header/events'
import { push as dlPushFn } from 'features/tracking/datalayer'

let searchValue = ''
let send: ((e: Event) => void) | null = null

/**
 * WHEN the user types in the search input field
 * AND he is on the search route
 * AND he stops interacting with the search input field
 *   - by start scrolling
 *   - by clicking somewhere
 *   - by closing the browser
 * THEN we send a datalayer event
 */
addRule({
  id: 'dl/SEARCH',
  target: SET_SEARCH_VALUE,
  output: '#dl-event',
  consequence: (action, { getState }) => {
    searchValue = action.payload

    // we only want to add the listeners for the first keystroke
    if (send) return

    send = (e: Event) => {
      const state = getState()

      // we only want to send the event, when the user actually navigated to the search route
      const shouldSend =
        state.listing.search &&
        state.listing.search.filterValues.query === searchValue

      const dlPush = (numHits: number) => {
        dlPushFn({
          event: 'internalSearch',
          eventname: 'view_search_results',
          search_keyword: searchValue,
          search_results: numHits,
          search_click_through: e.type,
        })
      }

      // if the request to the current searchValue is in state we can instantly push the event
      // otherwise we wait until the request resolves and push the event afterwands
      if (shouldSend) {
        if (state.listing.search?.isFetching === false) {
          dlPush(state.listing.search.nbHits)
        } else {
          addRule({
            id: 'dl/SEARCH/WAIT_FOR_FETCH_SUCCESS',
            target: [FETCH_SUCCESS, FETCH_FAILURE],
            output: '#dl-event',
            addOnce: true,
            consequence: (_, { getState }) => {
              const state = getState()
              dlPush(state.listing.search?.nbHits || 0)
            },
          })
        }
      }

      if (send) {
        document.removeEventListener('scroll', send)
        document.body.removeEventListener('click', send)
        window.removeEventListener('beforeunload', send)
        send = null
        searchValue = ''
      }
    }

    document.addEventListener('scroll', send)
    document.body.addEventListener('click', send)
    window.addEventListener('beforeunload', send)
  },
})
addRule({
  id: 'dl/SEARCH_EVENTS',
  target: [searchEvents.SEARCH_BUTTON_CLICK],
  output: '#dl-event',
  consequence: (action, { getState }) => {
    const state = getState()
    dlPushFn({
      event: 'internalSearch',
      eventname: 'view_search_results',
      search_keyword: action.payload,
      search_results: state.listing.search?.nbHits || 'not initialized',
      search_click_through: 'Submit Button',
    })

    if (send) {
      document.removeEventListener('scroll', send)
      document.body.removeEventListener('click', send)
      window.removeEventListener('beforeunload', send)
      send = null
      searchValue = ''
    }
  },
})
addRule({
  id: 'dl/SEARCH_INPUT_EVENTS',
  target: [searchEvents.INPUT_TYPE_ENTER],
  output: '#dl-event',
  consequence: (action, { getState }) => {
    const state = getState()
    dlPushFn({
      event: 'internalSearch',
      eventname: 'view_search_results',
      search_keyword: action.payload,
      search_results: state.listing.search?.nbHits || 'not initialized',
      search_click_through: 'Input Field Enter',
    })

    if (send) {
      document.removeEventListener('scroll', send)
      document.body.removeEventListener('click', send)
      window.removeEventListener('beforeunload', send)
      send = null
      searchValue = ''
    }
  },
})
