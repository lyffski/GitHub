import { dispatchEvent } from 'redux-ruleset'

export const TO_TOP_BUTTON_CLICK: 'ToTopButtonClick/TO_TOP_BUTTON_CLICK' =
  'ToTopButtonClick/TO_TOP_BUTTON_CLICK'

export const toTopButtonClick = () =>
  dispatchEvent({
    type: TO_TOP_BUTTON_CLICK,
    meta: {},
    payload: {},
  })

export type ToTopButtonClick = ReturnType<typeof toTopButtonClick>

export type Event = ToTopButtonClick

declare global {
  interface RulesetDispatchEvents {
    'partials/ToTopButton': Event
  }
}
