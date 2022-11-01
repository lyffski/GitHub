import { dispatchEvent } from 'redux-ruleset'
export const PROMINENT_FILTER_OPEN: 'FilterDrawer/PROMINENT_FILTER_OPEN' =
  'FilterDrawer/PROMINENT_FILTER_OPEN'

export const FILTER_DRAWER_CLOSE: 'FilterDrawer/FILTER_DRAWER_CLOSE' =
  'FilterDrawer/FILTER_DRAWER_CLOSE'

export const FILTER_VALUE_CLICK: 'FilterDrawer/FILTER_VALUE_CLICK' =
  'FilterDrawer/FILTER_VALUE_CLICK'

export const FILTER_VALUE_REMOVE: 'FilterDrawer/FILTER_VALUE_REMOVE' =
  'FilterDrawer/FILTER_VALUE_REMOVE'
export const FILTER_RESET: 'FilterDrawer/FILTER_RESET' =
  'FilterDrawer/FILTER_RESET'

export const FILTER_CLICK: 'FilterDrawer/FILTER_CLICK' =
  'FilterDrawer/FILTER_CLICK'

export const prominentFilterClick = (filterValue: string) => {
  return dispatchEvent({
    type: PROMINENT_FILTER_OPEN,
    meta: {},
    payload: filterValue,
  })
}

export const filterValueClick = (filterName: string, filterValue: string) => {
  return dispatchEvent({
    type: FILTER_VALUE_CLICK,
    meta: {},
    payload: { filterValue, filterName },
  })
}

export const filterValueRemove = (filterName: string, filterValue: string) => {
  return dispatchEvent({
    type: FILTER_VALUE_REMOVE,
    meta: {},
    payload: { filterValue, filterName },
  })
}

export const filterDrawerClose = (eventType: string) => {
  return dispatchEvent({
    type: FILTER_DRAWER_CLOSE,
    meta: {},
    payload: eventType,
  })
}

export const filterReset = () => {
  return dispatchEvent({
    type: FILTER_RESET,
    meta: {},
  })
}

export const filterClick = (filterName: string) => {
  return dispatchEvent({
    type: FILTER_CLICK,
    meta: {},
    payload: filterName,
  })
}

export type ProminentFilterClick = ReturnType<typeof prominentFilterClick>
export type FilterDrawerClose = ReturnType<typeof filterDrawerClose>
export type FilterValueClick = ReturnType<typeof filterValueClick>
export type FilterValueRemove = ReturnType<typeof filterValueRemove>
export type FilterReset = ReturnType<typeof filterReset>
export type FilterClick = ReturnType<typeof filterClick>
export type Event =
  | ProminentFilterClick
  | FilterDrawerClose
  | FilterValueClick
  | FilterValueRemove
  | FilterReset
  | FilterClick

declare global {
  interface RulesetDispatchEvents {
    'listingFilter/filterDrawer': Event
  }
}
