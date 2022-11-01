import { dispatchEvent } from 'redux-ruleset'
export const SWITCH_LANGUAGE_BUTTON_CLICK: 'SwitchLanguage/SWITCH_LANGUAGE_BUTTON_CLICK' =
  'SwitchLanguage/SWITCH_LANGUAGE_BUTTON_CLICK'

export const switchLanguageButtonClick = (lang: string) =>
  dispatchEvent({
    type: SWITCH_LANGUAGE_BUTTON_CLICK,
    meta: {},
    payload: lang,
  })

export type SwitchLanguageButtonClick = ReturnType<
  typeof switchLanguageButtonClick
>

export type Event = SwitchLanguageButtonClick

declare global {
  interface RulesetDispatchEvents {
    'app/Header/Topline': Event
  }
}
