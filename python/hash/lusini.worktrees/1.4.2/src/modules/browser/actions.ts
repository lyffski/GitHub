import * as at from './const'

export const setWindowSize = (size) => ({
  type: at.SET_WINDOW_SIZE,
  payload: size,
})

export type setWindowSize = ReturnType<typeof setWindowSize>

export type Action = setWindowSize
