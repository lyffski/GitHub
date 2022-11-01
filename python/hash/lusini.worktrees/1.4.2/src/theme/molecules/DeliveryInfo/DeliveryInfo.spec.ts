import Component from './DeliveryInfo'
import { RenderFactory } from 'utils/test-helper'

describe('Deliverydate', () => {
  const factory = new RenderFactory(Component, {
    icon: 'notAvailable',
    snippet: 'no_stock_with_delivery_in_months',
    isBuyable: false,
  })

  it('renders deliverable icon, when product is deliverable', async () => {
    const f = await factory.create(props => {
      props.icon = 'available'
    })
    f.context('DeliveryInfo').shouldHaveState('deliverable')
  })

  it('displays info of stock, when product is on stock', async () => {
    const f = await factory.create(props => {
      props.variables = {
        stock: 2,
        packUnit: 'Packung'
      }
    })
    f.context('DeliveryInfo').shouldHaveState('available-amount')
  })
})
