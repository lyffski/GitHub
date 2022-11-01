import React from 'react'
import * as at from './const'

export const setSearchValue = (value: string) => ({
  type: at.SET_SEARCH_VALUE,
  payload: value,
})

export const toggleNavi = () => ({
  type: at.TOGGLE_NAVI,
})

export const setSidebarCategory = (category: string | null) => ({
  type: at.SET_SIDEBAR_CATEGORY,
  payload: category,
})

export const setCurrentCategory = (category: string | null) => ({
  type: at.SET_CURRENT_CATEGORY,
  payload: category,
})

export const clear = (exception?: string) => ({
  type: at.CLEAR,
  payload: exception,
})

export const setModalContent = (content: React.ReactElement | null) => ({
  type: at.SET_MODAL_CONTENT,
  payload: content,
})

export const showOverlay = () => ({
  type: at.SHOW_OVERLAY,
})

export const hideOverlay = () => ({
  type: at.HIDE_OVERLAY,
})
export type SetSearchValue = ReturnType<typeof setSearchValue>
export type ToggleNavi = ReturnType<typeof toggleNavi>
export type SetSidebarCategory = ReturnType<typeof setSidebarCategory>
export type SetCurrentCategory = ReturnType<typeof setCurrentCategory>
export type Clear = ReturnType<typeof clear>
export type SetModalContent = ReturnType<typeof setModalContent>
export type ShowOverlay = ReturnType<typeof showOverlay>
export type HideOverlay = ReturnType<typeof hideOverlay>

export type Action =
  | SetSearchValue
  | ToggleNavi
  | SetSidebarCategory
  | SetCurrentCategory
  | Clear
  | SetModalContent
  | ShowOverlay
  | HideOverlay
