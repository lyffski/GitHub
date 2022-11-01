import Component from './ProductSlider'
import { getProduct, RenderFactory } from 'utils/test-helper'

describe('molecules/ProductSlider', () => {
  const factory = new RenderFactory(Component, {
    listname: '',
    maxProducts: 24,
    fetchFn: async () => {
      return {
        data: [getProduct()],
        finished: true,
      }
    },
  })

  it('renders show next btn', async () => {
    const f = await factory.create()
    f.context('molecules/ProductSlider').shouldHaveState('has-next-button')
  })
})
