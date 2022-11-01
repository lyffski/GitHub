import Component from './ProductList'
import { RenderFactory } from 'utils/test-helper'

describe('molecules/ProductList', () => {
  const factory = new RenderFactory(Component, {
    recordId: 'category',
    listname: 'foobar',
  })

  it('shows the no-hits template when we have 0 products', async () => {
    const f = await factory.create()
    f.context('molecules/ProductList').shouldNotHaveState('show-products')
  })
})

/* Pagination wurde hier bisher noch mit getestet TBD */