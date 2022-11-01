import Component from './Flags'
import { getProduct, RenderFactory } from 'utils/test-helper'

describe('molecules/Flags', () => {
  const factory = new RenderFactory(Component, {
    type: 'widget',
    product: getProduct(),
  })

  it('shows the price reduction in percent when the product has a sale flag', async () => {
    const f = await factory.create((props) => {
      props.product.flags = ['sale']
    })
    f.context('molecules/Flags').shouldHaveState('has-reduction-prozent')
  })

  it('it shows translated label for the products flags', async () => {
    const t = jest.fn()
    factory.module('molecules-Flags').var('t').set(t)
    t.mockImplementation((key) => {
      switch (key) {
        case 'new':
          return 'testValue1'
        case 'discount':
          return 'testValue2'
        default:
          return ''
      }
    })
    const f = await factory.create((props) => {
      props.product.flags = ['new', 'discount']
    })
    f.context('molecules/Flags').shouldHaveState('has-dynamic-flag')
    expect(f.context('molecules/Flags').unwrap().innerHTML).toContain(
      'testValue1'
    )
    expect(f.context('molecules/Flags').unwrap().innerHTML).toContain(
      'testValue2'
    )
  })
})
