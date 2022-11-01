import { dispatchEvent } from 'redux-ruleset'
export const SEARCH_BUTTON_CLICK: 'ProductWidget/SEARCH_BUTTON_CLICK' =
  'ProductWidget/SEARCH_BUTTON_CLICK'

export const INPUT_TYPE_ENTER: 'ProductWidget/INPUT_TYPE_ENTER' =
  'ProductWidget/INPUT_TYPE_ENTER'

export const searchInputClick = (query: string) =>
  dispatchEvent({
    type: SEARCH_BUTTON_CLICK,
    meta: {},
    payload: query,
  })

export const inputTypeEnter = (query: string) =>
  dispatchEvent({
    type: INPUT_TYPE_ENTER,
    meta: {},
    payload: query,
  })

export type SearchInputClick = ReturnType<typeof searchInputClick>
export type InputTypeEnter = ReturnType<typeof inputTypeEnter>

export type Event = SearchInputClick | InputTypeEnter

declare global {
  interface RulesetDispatchEvents {
    'search/OnSubmit': Event
  }
}
