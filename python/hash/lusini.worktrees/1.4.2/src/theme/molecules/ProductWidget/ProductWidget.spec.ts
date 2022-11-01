import Component from './ProductWidget'
import { RenderFactory, getProduct } from 'utils/test-helper'

describe('molecules/ProductWidget', () => {
  const factory = new RenderFactory(Component, {
    listPosition: 0,
    listname: 'test',
    product: getProduct(),
  })

  beforeEach(factory.clearMocks)

  it('shows energy-label when product-attributes include ENERGY_EFFICIENCY_CLASS', async () => {
    const f = await factory.create((props) => {
      props.product.attributes = {
        ENERGY_EFFICIENCY_CLASS: { values: ['foo'] },
      }
    })
    f.context('molecules/ProductWidget').shouldHaveState('show-energylabel')
  })

  it('displays a "from price" if the product\'s skus have different prices', async () => {
    const f = await factory.create((props) => {
      props.product.prices.productCheapestPiecePriceNet = 10
      props.product.prices.productMostexpensivePiecePriceNet = 20
    })
    f.context('molecules/ProductWidget').shouldHaveState('has-cheapestprice')
  })

  it('shows the strikePrice if product has been reduced', async () => {
    const f = await factory.create()
    f.context('molecules/ProductWidget').shouldHaveState('has-strikeprice')
  })

  it('shows the unit of product', async () => {
    const f = await factory.create()
    f.context('molecules/ProductWidget').shouldHaveState('has-unit')
  })

  it('does not display variant-images if configured so by the useProductWdigetContext-hook', async () => {
    await factory
      .module('hooks')
      .fn('useProductWidgetContext')
      .mock({
        value: { showVariants: false, onProductWidgetClick: () => null },
        sync: true,
      })
    const f = await factory.create()
    f.context('molecules/ProductWidget').shouldNotHaveState(
      'colorpreview-is-visible'
    )
  })
})
