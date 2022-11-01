import { dispatchEvent } from 'redux-ruleset'
export const LISTING_CONTEXT_BRAND_NAME: 'PageLoad/LISTING_CONTEXT_BRAND_NAME' =
  'PageLoad/LISTING_CONTEXT_BRAND_NAME'

export const listingContextBrandName = (brandName: string) =>
  dispatchEvent({
    type: LISTING_CONTEXT_BRAND_NAME,
    meta: {},
    payload: brandName,
  })

export type ListingContextBrandName = ReturnType<typeof listingContextBrandName>

export type Event = ListingContextBrandName

declare global {
  interface RulesetDispatchEvents {
    'pageLoad/ListingContextBrandName': Event
  }
}
