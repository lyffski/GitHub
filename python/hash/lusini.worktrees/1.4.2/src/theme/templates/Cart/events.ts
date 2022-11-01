import { dispatchEvent } from 'redux-ruleset'

export const REFRESH: 'Cart/REFRESH_CART' = 'Cart/REFRESH_CART'

export const refreshCart = () =>
  dispatchEvent({
    type: REFRESH,
  })

export type RefreshCart = ReturnType<typeof refreshCart>

declare global {
  interface RulesetDispatchEvents {
    'templates/Cart': RefreshCart
  }
}
