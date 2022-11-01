# const.ts

In diesem File werden alle Action-Types für die Redux-Actions des Moduls exportiert. Dabei sollte das File immer folgendermaßen aussehen:

```typescript
// example for module products
export const INIT: 'products/INIT' = 'products/INIT'
export const SET_PAGE: 'products/SET_PAGE' = 'products/SET_PAGE'
export const TOGGLE_FILTER_OPTION: 'products/TOGGLE_FILTER_OPTION' =
  'products/TOGGLE_FILTER_OPTION'
export const SET_QUERY: 'products/SET_QUERY' = 'products/SET_QUERY'
export const TOGGLE_CATEGORY: 'products/TOGGLE_CATEGORY' =
  'products/TOGGLE_CATEGORY'
export const TOGGLE_TAG: 'products/TOGGLE_TAG' = 'products/TOGGLE_TAG'
```

Jeder Action-Type muss als prefix den Modul-Namen enthalten. So umgeht man das zwei Module zufällig den selben Action-Type exportieren. Außerdem muss jeder Type genau typisiert werden damit später Actions im Reducer sauber deconstruiert werden können. Dies geschieht durch das `':ACTIONTYPE'`. Dadurch weiß Typescript, das es sich hierbei nicht um einen string sondern um eine Konstante handelt

## Andere Konstanten

Selten exportieren Const-Files auch andere Konstantent mit denen dann später gearbeitet werden kann. So könnte ein potentielles Browser Modul folgendes Const-File haben:

```typescript
/**
 * ms => Media-Sizes
 * Defines the breakpoints
 */
export const ms = Object.freeze({
  MOBILE_M: 0,
  MOBILE_L: 375,
  TABLET: 525,
  LAPTOP: 768,
  LAPTOP_L: 990,
  LAPTOP_XL: 1200,

  // Container
  CONTAINER_S: 690,
  CONTAINER: 710,
  CONTAINER_L: 910,
})

/**
 * orders media sizes from smalest to biggest
 */
export const orderedMediaSizes = [
  'MOBILE_M',
  'MOBILE_L',
  'TABLET',
  'LAPTOP',
  'LAPTOP_L',
  'LAPTOP_XL',
]

export const SET_MEDIA_SIZE: 'browser/SET_MEDIA_SIZE' = 'browser/SET_MEDIA_SIZE'
export const NAVIGATE: 'browser/NAVIGATE' = 'browser/NAVIGATE'
```
