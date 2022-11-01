import { dispatchEvent } from 'redux-ruleset'

export const CHANGE_IMAGE: 'Gallery/CHANGE_IMAGE' = 'Gallery/CHANGE_IMAGE'

export const changeImage = (
  imageID: string,
  productName: string,
  categoryPath: string,
  sku: string
) =>
  dispatchEvent({
    type: CHANGE_IMAGE,
    meta: { productName, categoryPath, sku },
    payload: { imageID },
  })

export type ChangeImage = ReturnType<typeof changeImage>

export type Event = ChangeImage

declare global {
  interface RulesetDispatchEvents {
    'templates/PDP/Gallery': Event
  }
}
