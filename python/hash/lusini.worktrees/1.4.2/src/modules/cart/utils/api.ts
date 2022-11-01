import * as t from '../types'
import config from 'config'
import createAlgoliaHelper from 'utils/createAlgoliaHelper'

import applyShopwarePrice from './applyShopwarePrice'

/** @firescoutMockFn cart.fetch */
export async function fetch(): Promise<t.api.Fetch> {
  const result = await window
    .fetch(config.modules.cart.fetchCartUrl, {
      credentials: 'include',
    })
    .then((res) => res.json())

  const rawItems = result.map((item) => ({
    sku: item.item,
    amount: item.quantity,
    shopwarePrice: item.price,
    position_id: item.id,
  }))

  const algoliaItems = await fetchAlgolia(rawItems)

  const cart = {
    items: algoliaItems,
    // will be set after algolia fetch in FlyoutCart
    totalNetto: algoliaItems.reduce((prev, next) => {
      return prev + next.variant.prices.packPriceNet * next.amount
    }, 0),
    totalBrutto: algoliaItems.reduce((prev, next) => {
      return prev + next.variant.prices.packPriceGross * next.amount
    }, 0),
  }

  return cart
}

/** @firescoutMockFn cart.addItem */
export function addItem(
  item: Omit<t.RawItem, 'variant' | 'shopwarePrice'>
): Promise<t.api.AddItem> {
  const formData = new FormData()
  const data = JSON.stringify(item.config)
  formData.append('sAdd', `${item.sku}`)
  formData.append('sQuantity', `${item.amount}`)
  formData.append('emCustomProducts', data)
  return window
    .fetch(config.modules.cart.addCartItemUrl, {
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
      body: formData,
    })
    .then(fetch)
}

/** @firescoutMockFn cart.removeItem */
export async function removeItem(
  position_id: string
): Promise<t.api.RemoveItem> {
  const formData = new FormData()
  return window
    .fetch(
      config.modules.cart.removeCartItemUrl.replace('[position]', position_id),
      {
        method: 'POST',
        credentials: 'include',
        mode: 'no-cors',
        body: formData,
      }
    )
    .then(fetch)
}

/** @firescoutMockFn cart.fetchAlgolia */
async function fetchAlgolia(cartItems: t.RawItem[]) {
  const hits: t.Variant[] = await createAlgoliaHelper(config.index.products, {
    disjunctiveFacets: ['sku'],
    distinct: 0,
  })
    .then((helper) => {
      for (const item of cartItems)
        helper.addDisjunctiveFacetRefinement('sku', item.sku)
      return helper.searchOnce({ hitsPerPage: 1000 })
    })
    .then((result) => result.content.hits)

  const algoliaItemDict: Record<string, t.Variant> = {}

  for (const item of hits) {
    algoliaItemDict[item.sku] = item
  }

  return cartItems
    .filter((item) => algoliaItemDict[item.sku])
    .map((item) => ({
      ...item,
      variant: applyShopwarePrice(
        algoliaItemDict[item.sku],
        item.shopwarePrice
      ),
    }))
}
