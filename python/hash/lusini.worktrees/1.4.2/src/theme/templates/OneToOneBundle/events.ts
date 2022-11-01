import { Product } from './types'
import { dispatchEvent } from 'redux-ruleset'
import { ConfigurableRelationData } from './types'

export const STARTED_FROM: 'OneToOneBundle/STARTED_FROM' =
  'OneToOneBundle/STARTED_FROM'
export const SELECT_PRODUCT: 'OneToOneBundle/SELECT_PRODUCT' =
  'OneToOneBundle/SELECT_PRODUCT'
export const ADD_TO_CART: 'OneToOneBundle/ADD_TO_CART' =
  'OneToOneBundle/ADD_TO_CART'
export const RESET: 'OneToOneBundle/RESET' = 'OneToOneBundle/RESET'

export const startedFrom = (
  sku: string,
  relatedType: ConfigurableRelationData[] | undefined
) => {
  return dispatchEvent({
    type: STARTED_FROM,
    meta: {},
    payload: {
      first_sku: sku,
      first_product_related_type: relatedType?.[0].type,
    },
  })
}

export const selectProduct = (
  firstProduct: Product,
  secondProduct: Product,
  startedFrom: string
) => {
  return dispatchEvent({
    type: SELECT_PRODUCT,
    meta: {},
    payload: {
      first_sku: firstProduct.sku,
      first_product_related_type:
        firstProduct.related.configurableRelations?.[0].type,
      second_sku: secondProduct.sku,
      second_product_related_type:
        secondProduct.related.configurableRelations?.[0].type,
      started_from: startedFrom,
    },
  })
}

export const addToCart = (
  firstProduct: Product,
  secondProduct: Product,
  startedFrom: string
) => {
  return dispatchEvent({
    type: ADD_TO_CART,
    meta: {},
    payload: {
      first_sku: firstProduct.sku,
      first_product_related_type:
        firstProduct.related.configurableRelations?.[0].type,
      second_sku: secondProduct.sku,
      second_product_related_type:
        secondProduct.related.configurableRelations?.[0].type,
      started_from: startedFrom,
    },
  })
}

export const reset = (product: Product, startedFrom: string, index: 0 | 1) => {
  return dispatchEvent({
    type: RESET,
    meta: {},
    payload: {
      first_sku: index === 1 ? product.sku : 'resetted_product',
      first_product_related_type:
        index === 1
          ? product.related.configurableRelations?.[0].type
          : 'resetted_product',
      second_sku: index === 0 ? product.sku : 'resetted_product',
      second_product_related_type:
        index === 0
          ? product.related.configurableRelations?.[0].type
          : 'resetted_product',
      started_from: startedFrom,
    },
  })
}

export type StartedFrom = ReturnType<typeof startedFrom>
export type SelectProduct = ReturnType<typeof selectProduct>
export type AddToCart = ReturnType<typeof addToCart>
export type Reset = ReturnType<typeof reset>
export type Event = StartedFrom | SelectProduct | AddToCart | Reset

declare global {
  interface RulesetDispatchEvents {
    'templates/OneToOneBundle': Event
  }
}
