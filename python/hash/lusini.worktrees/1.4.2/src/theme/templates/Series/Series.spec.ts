import {Series as Component} from './Series'
import { RenderFactory } from 'utils/test-helper'

describe('templates/Cart', () => {
  const factory = new RenderFactory(Component, {
    '*': '123456',
    location: {
      pathname: '/cart/',
      origin: 'https://www.lusini.com',
    },
    pageContext: {
      hrefLang: []
    }
  })

  beforeEach(() => {
    factory.clearMocks()
  })

  describe('SkuWidget', () => {
    it.todo('can change the amount by clicking plus/minus button')

    it.todo('shows eco-tax info for products that have a maintained eco-tax field')

    it.todo('can cange the amount by editing the amount input field')

    it.todo('can add product to cart')

    it.todo('shows PRODUCT_TYPE filter as most prominent filter')
  })
})