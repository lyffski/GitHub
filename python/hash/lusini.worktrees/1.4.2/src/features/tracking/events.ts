import { dispatchEvent } from 'redux-ruleset'
export const TRACK_404_ERROR: 'Page404/404_PAGE_REACHED' =
  'Page404/404_PAGE_REACHED'

export const page404Reached = (pathname: string) =>
  dispatchEvent({
    type: TRACK_404_ERROR,
    meta: {},
    payload: pathname,
  })

export type Page404Reached = ReturnType<typeof page404Reached>

export type Event = Page404Reached

declare global {
  interface RulesetDispatchEvents {
    'page/404': Event
  }
}
