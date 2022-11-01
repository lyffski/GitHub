import { dispatchEvent } from 'redux-ruleset'

export const MAIN_CATEGORY_CLICK: 'app/FlyoutNavi/MAIN_CATEGORY_CLICK' =
  'app/FlyoutNavi/MAIN_CATEGORY_CLICK'

export const SUB_CATEGORY_CLICK: 'app/FlyoutNavi/SUB_CATEGORY_CLICK' =
  'app/FlyoutNavi/SUB_CATEGORY_CLICK'

export const HEADLINE_CLICK: 'app/FlyoutNavi/HEADLINE_CLICK' =
  'app/FlyoutNavi/HEADLINE_CLICK'

export const SHOW_ALL_BUTTON_CLICK: 'app/FlyoutNavi/SHOW_ALL_BUTTON_CLICK' =
  'app/FlyoutNavi/SHOW_ALL_BUTTON_CLICK'

export const CUSTOMIZED_NAVIGATION_CLICK: 'app/FlyoutNavi/CUSTOMIZED_NAVIGATION_CLICK' =
  'app/FlyoutNavi/CUSTOMIZED_NAVIGATION_CLICK'

export const CLOSE_NAVIGATION_CLICK: 'app/FlyoutNavi/CLOSE_NAVIGATION_CLICK' =
  'app/FlyoutNavi/CLOSE_NAVIGATION_CLICK'

export const mainCategoryClick = (category: string | null) =>
  dispatchEvent({
    type: MAIN_CATEGORY_CLICK,
    meta: { category, path: '' },
    payload: 'Main Category Click - Drawer',
  })

export const subCategoryClick = (
  category: string | null,
  path: string | null
) =>
  dispatchEvent({
    type: SUB_CATEGORY_CLICK,
    meta: { category, path },
    payload: 'Sub Category Click',
  })

export const headlineClick = (category: string | null, path: string | null) =>
  dispatchEvent({
    type: HEADLINE_CLICK,
    meta: { category, path },
    payload: 'Headline Click',
  })

export const showAllButtonClick = (
  category: string | null,
  path: string | null
) =>
  dispatchEvent({
    type: SHOW_ALL_BUTTON_CLICK,
    meta: { category, path },
    payload: 'Show All Button Click',
  })

export const customizedNavigationClick = (label: string | null) =>
  dispatchEvent({
    type: CUSTOMIZED_NAVIGATION_CLICK,
    meta: {},
    payload: label,
  })

export const closeNavigationClick = (categoryPath: string | null) =>
  dispatchEvent({
    type: CLOSE_NAVIGATION_CLICK,
    meta: {},
    payload: categoryPath,
  })

export type MainCategoryClick = ReturnType<typeof mainCategoryClick>
export type SubCategoryClick = ReturnType<typeof subCategoryClick>
export type HeadlineClick = ReturnType<typeof headlineClick>
export type ShowAllButtonClick = ReturnType<typeof showAllButtonClick>
export type CustomizedNavigationClick = ReturnType<
  typeof customizedNavigationClick
>
export type CloseNavigationClick = ReturnType<typeof closeNavigationClick>
export type Event =
  | MainCategoryClick
  | SubCategoryClick
  | HeadlineClick
  | ShowAllButtonClick
  | CustomizedNavigationClick
  | CloseNavigationClick

declare global {
  interface RulesetDispatchEvents {
    'app/FlyoutNavi': Event
  }
}
