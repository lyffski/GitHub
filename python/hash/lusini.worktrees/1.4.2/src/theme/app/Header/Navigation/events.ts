import { dispatchEvent } from 'redux-ruleset'

export const MAIN_CATEGORY_CLICK: 'app/Header/Navigation/MAIN_CATEGORY_CLICK' =
  'app/Header/Navigation/MAIN_CATEGORY_CLICK'

export const BURGER_MENU_CLICK: 'app/Header/Navigation/BURGER_MENU_CLICK' =
  'app/Header/Navigation/BURGER_MENU_CLICK'

export const SHOW_MORE_CLICK: 'app/Header/Navigation/SHOW_MORE_CLICK' =
  'app/Header/Navigation/SHOW_MORE_CLICK'

export const mainCategoryClick = (category: string | null) =>
  dispatchEvent({
    type: MAIN_CATEGORY_CLICK,
    meta: { category, path: category },
    payload: 'Main Category Click - Horizontal',
  })

export const burgerMenuClick = () =>
  dispatchEvent({
    type: BURGER_MENU_CLICK,
    meta: { category: '', path: '' },
    payload: 'Burger Menu Click',
  })

export const showMoreMenuClick = () =>
  dispatchEvent({
    type: SHOW_MORE_CLICK,
    meta: { category: '', path: '' },
    payload: 'Show More Click',
  })

export type MainCategoryClick = ReturnType<typeof mainCategoryClick>
export type BurgerMenuClick = ReturnType<typeof burgerMenuClick>
export type ShowMoreMenuClick = ReturnType<typeof showMoreMenuClick>
export type Event = MainCategoryClick | BurgerMenuClick | ShowMoreMenuClick

declare global {
  interface RulesetDispatchEvents {
    'app/Header/Navigation': Event
  }
}
