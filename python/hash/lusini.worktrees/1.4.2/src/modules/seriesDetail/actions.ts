import * as at from './const'
import * as t from './types'

export const init = (objectID: string) => ({
  type: at.INIT,
  payload: objectID,
})

export const clear = () => ({
  type: at.CLEAR,
})

export const fetchRequest = (objectID: string) => ({
  type: at.FETCH_REQUEST,
  meta: { objectID },
})

export const fetchSuccess = (objectID: string, result: t.api.Fetch) => ({
  type: at.FETCH_SUCCESS,
  meta: { objectID },
  payload: result,
})

export const fetchFailure = (objectID: string, error: string) => ({
  type: at.FETCH_FAILURE,
  meta: { objectID },
  payload: error,
})

export type Init = ReturnType<typeof init>
export type Clear = ReturnType<typeof clear>
export type FetchRequest = ReturnType<typeof fetchRequest>
export type FetchSuccess = ReturnType<typeof fetchSuccess>
export type FetchFailure = ReturnType<typeof fetchFailure>

export type Action = Clear | Init | FetchRequest | FetchSuccess | FetchFailure
