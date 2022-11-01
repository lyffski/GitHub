import { dispatchEvent } from 'redux-ruleset'
export const SWITCH_COUNTRY_BUTTON_CLICK: 'SwitchLanguage/SWITCH_COUNTRY_BUTTON_CLICK' =
  'SwitchLanguage/SWITCH_COUNTRY_BUTTON_CLICK'

export const switchCountryButtonClick = (locale: string) =>
  dispatchEvent({
    type: SWITCH_COUNTRY_BUTTON_CLICK,
    meta: {},
    payload: locale,
  })

export type SwitchCountryButtonClick = ReturnType<
  typeof switchCountryButtonClick
>

export type Event = SwitchCountryButtonClick

declare global {
  interface RulesetDispatchEvents {
    'app/Footer/CountrySwitch': Event
  }
}
