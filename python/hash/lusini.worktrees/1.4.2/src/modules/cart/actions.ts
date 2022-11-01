import * as t from './types'
import * as at from './const'

export const set = (cart: t.Cart) => ({
  type: at.SET,
  payload: cart,
})

export const refresh = () => ({
  type: at.REFRESH,
})

export const addItemRequest = (
  rawItem: Omit<t.RawItem, 'variant' | 'shopwarePrice'>
) => ({
  type: at.ADD_ITEM_REQUEST,
  meta: { rawItem },
})

export const addItemSuccess = (
  rawItem: Omit<t.RawItem, 'variant' | 'shopwarePrice'>,
  result: t.api.AddItem
) => ({
  type: at.ADD_ITEM_SUCCESS,
  meta: { rawItem },
  payload: result,
})

export const addItemFailure = (
  rawItem: Omit<t.RawItem, 'variant' | 'shopwarePrice'>,
  error: string
) => ({
  type: at.ADD_ITEM_FAILURE,
  meta: { rawItem },
  payload: error,
})

export const removeItemRequest = (position_id: string) => ({
  type: at.REMOVE_ITEM_REQUEST,
  payload: position_id,
})

export const removeItemSuccess = (
  position_id: string,
  result: t.api.RemoveItem
) => ({
  type: at.REMOVE_ITEM_SUCCESS,
  meta: { position_id },
  payload: result,
})

export const removeItemFailure = (error: string) => ({
  type: at.REMOVE_ITEM_FAILURE,
  payload: error,
})

export type Set = ReturnType<typeof set>
export type Refresh = ReturnType<typeof refresh>
export type AddItemRequest = ReturnType<typeof addItemRequest>
export type AddItemSuccess = ReturnType<typeof addItemSuccess>
export type AddItemFailure = ReturnType<typeof addItemFailure>
export type RemoveItemRequest = ReturnType<typeof removeItemRequest>
export type RemoveItemSuccess = ReturnType<typeof removeItemSuccess>
export type RemoveItemFailure = ReturnType<typeof removeItemFailure>

export type Action =
  | Set
  | Refresh
  | AddItemRequest
  | AddItemSuccess
  | AddItemFailure
  | RemoveItemRequest
  | RemoveItemSuccess
  | RemoveItemFailure
