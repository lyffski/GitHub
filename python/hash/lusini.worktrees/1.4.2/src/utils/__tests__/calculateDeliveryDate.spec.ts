import program from '../calculateDeliveryDate'
import { setup } from 'utils/test-helper'
import config from 'config'

describe('utils/calculateDeliveryDate', () => {
  beforeEach(setup)

  it('yields buyable when requested amount is less than article stock', () => {
    const amount = 3
    const result = program(
      {
        deliveryDays: null,
        sellOut: false,
        specialDelivery: false,
        stock: 4,
        unit: {
          packUnit: 'Packung',
        },
      },
      amount
    )

    expect(result.isBuyable).toBeTruthy()
  })

  describe('no stock but delivery-time', () => {
    it('yields not-buyable when delivery-days of article is bigger than "config.shippingTooLong"', () => {
      config.deliveryDate.shippingTooLong = 4
      const amount = 3
      const result = program(
        {
          deliveryDays: 5,
          sellOut: false,
          specialDelivery: false,
          stock: 0,
          unit: {
            packUnit: 'Packung',
          },
        },
        amount
      )

      expect(result.isBuyable).toBeFalsy()
    })

    it('yields buyable when delivery-days of article is smaller than "config.shippingTooLong"', () => {
      config.deliveryDate.shippingTooLong = 6
      const amount = 3
      const result = program(
        {
          deliveryDays: 5,
          sellOut: false,
          specialDelivery: false,
          stock: 0,
          unit: {
            packUnit: 'Packung',
          },
        },
        amount
      )

      expect(result.isBuyable).toBeTruthy()
    })
  })

  describe('amount greater than stock', () => {
    it('yields not-buyable when article is a sell-out article', () => {
      const amount = 4
      const result = program(
        {
          deliveryDays: null,
          sellOut: true,
          specialDelivery: false,
          stock: 3,
          unit: {
            packUnit: 'Packung',
          },
        },
        amount
      )

      expect(result.isBuyable).toBeFalsy()
    })

    it('yields not-buyable when delivery-days of article is bigger than "config.shippingTooLong"', () => {
      config.deliveryDate.shippingTooLong = 4
      const amount = 4
      const result = program(
        {
          deliveryDays: 5,
          sellOut: false,
          specialDelivery: false,
          stock: 3,
          unit: {
            packUnit: 'Packung',
          },
        },
        amount
      )

      expect(result.isBuyable).toBeFalsy()
    })

    it('yields buyable when delivery-days of article is smaller than "config.shippingTooLong"', () => {
      config.deliveryDate.shippingTooLong = 6
      const amount = 4
      const result = program(
        {
          deliveryDays: 5,
          sellOut: false,
          specialDelivery: false,
          stock: 3,
          unit: {
            packUnit: 'Packung',
          },
        },
        amount
      )

      expect(result.isBuyable).toBeTruthy()
    })

    it('yields buyable of article stock > 0 and article has no delivery-days', () => {
      const amount = 4
      const result = program(
        {
          deliveryDays: 0,
          sellOut: false,
          specialDelivery: false,
          stock: 3,
          unit: {
            packUnit: 'Packung',
          },
        },
        amount
      )

      expect(result.isBuyable).toBeTruthy()
    })

    it('yields not-buyable of stock is 0 and article has no delivery-days', () => {
      const amount = 4
      const result = program(
        {
          deliveryDays: 0,
          sellOut: false,
          specialDelivery: false,
          stock: 0,
          unit: {
            packUnit: 'Packung',
          },
        },
        amount
      )

      expect(result.isBuyable).toBeFalsy()
    })
  })
})
