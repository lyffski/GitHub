import { api } from '../../src/modules/cart/types'

/**
 * @since 12.11.2020
 * Cart "items"
 */
const data: api.AddItem = {
  items: [
    {
      sku: '30025992',
      amount: 1,
      position_id: '14',
    },
  ],
  totalNetto: 0,
  totalBrutto: 0,
}

export default data
