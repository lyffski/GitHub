import { dispatchEvent } from 'redux-ruleset'
import * as t from './types'

export const WIDGET_CLICK: 'ProductWidget/WIDGET_CLICK' =
  'ProductWidget/WIDGET_CLICK'

export const COLOR_CLICK: 'ProductWidget/COLOR_CLICK' =
  'ProductWidget/COLOR_CLICK'

export const SCROLL_INTO_VIEW: 'ProductWidget/SCROLL_INTO_VIEW' = `ProductWidget/SCROLL_INTO_VIEW`

export const widgetClick = (
  variant: t.Product,
  listname: string,
  listPosition: number
) =>
  dispatchEvent({
    type: WIDGET_CLICK,
    meta: { listname, listPosition },
    payload: variant,
  })

export const colorClick = (
  variantImage: string,
  displayVariant: t.Product,
  listname: string,
  listPosition: number
) =>
  dispatchEvent({
    type: COLOR_CLICK,
    meta: { listname, listPosition, displayVariant },
    payload: variantImage,
  })

export const scrollIntoView = (
  variant: t.Product,
  listname: string,
  listPosition: number
) =>
  dispatchEvent({
    type: SCROLL_INTO_VIEW,
    meta: { listname, listPosition },
    payload: variant,
  })

export type ScrollIntoView = ReturnType<typeof scrollIntoView>
export type WidgetClick = ReturnType<typeof widgetClick>
export type ColorClick = ReturnType<typeof colorClick>

export type Event = ScrollIntoView | WidgetClick | ColorClick

declare global {
  interface RulesetDispatchEvents {
    'molecules/ProductWidget': Event
  }
}
