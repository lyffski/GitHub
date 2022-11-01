import { dispatchEvent } from 'redux-ruleset'
export const SORTING_CHANGE: 'SortingDropdown/SORTING_CLICK' =
  'SortingDropdown/SORTING_CLICK'

export const SORTING_PRESELECT: 'SortingDropdown/SORTING_PRESELECT' =
  'SortingDropdown/SORTING_PRESELECT'

export const sortingChanged = (
  query: string,
  path: string,
  actionName: string
) => {
  return dispatchEvent({
    type: SORTING_CHANGE,
    meta: { path, actionName },
    payload: query,
  })
}

export const sortingPreselect = (
  query: string,
  path: string,
  actionName: string
) => {
  return dispatchEvent({
    type: SORTING_PRESELECT,
    meta: { path, actionName },
    payload: query,
  })
}

export type SortingChanged = ReturnType<typeof sortingChanged>
export type SortingPreselect = ReturnType<typeof sortingPreselect>

export type Event = SortingChanged | SortingPreselect

declare global {
  interface RulesetDispatchEvents {
    'listingFilter/sortingDropdown': Event
  }
}
