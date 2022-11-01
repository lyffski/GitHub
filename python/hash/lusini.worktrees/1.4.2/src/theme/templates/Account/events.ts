import { dispatchEvent } from 'redux-ruleset'

export const REFRESH: 'Account/REFRESH_CART' = 'Account/REFRESH_CART'

export const refreshCart = () =>
  dispatchEvent({
    type: REFRESH,
  })

export type RefreshCart = ReturnType<typeof refreshCart>

declare global {
  interface RulesetDispatchEvents {
    'templates/Account': RefreshCart
  }
}
