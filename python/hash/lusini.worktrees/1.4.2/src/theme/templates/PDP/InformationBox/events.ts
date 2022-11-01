import { dispatchEvent } from 'redux-ruleset'

export const PRODUCT_INFORMATION_ACCORDION_CLICK: 'ProductInformationAccordionClick/PRODUCT_INFORMATION_ACCORDION_CLICK' =
  'ProductInformationAccordionClick/PRODUCT_INFORMATION_ACCORDION_CLICK'
export const PRODUCT_INFORMATION_ACCORDION_VISIBLE: 'ProductInformationAccordionVisible/PRODUCT_INFORMATION_ACCORDION_VISIBLE' =
  'ProductInformationAccordionVisible/PRODUCT_INFORMATION_ACCORDION_VISIBLE'

export const productInformationAccordionVisible = (
  categoryPath: string,
  productName: string,
  productSku: string
) =>
  dispatchEvent({
    type: PRODUCT_INFORMATION_ACCORDION_VISIBLE,
    meta: {},
    payload: `${categoryPath}||${productName}||${productSku}`,
  })
export const productInformationAccordionClick = (
  categoryPath: string,
  productName: string,
  productSku: string
) =>
  dispatchEvent({
    type: PRODUCT_INFORMATION_ACCORDION_CLICK,
    meta: {},
    payload: `${categoryPath}||${productName}||${productSku}`,
  })

export type ProductInformationAccordionClick = ReturnType<
  typeof productInformationAccordionClick
>

export type ProductInformationAccordionVisible = ReturnType<
  typeof productInformationAccordionVisible
>

export type Event =
  | ProductInformationAccordionClick
  | ProductInformationAccordionVisible

declare global {
  interface RulesetDispatchEvents {
    'templates/PDP/InformationBox': Event
  }
}
