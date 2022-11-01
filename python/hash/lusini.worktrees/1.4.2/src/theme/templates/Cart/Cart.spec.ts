import Component from './Cart'
import { RenderFactory } from 'utils/test-helper'

describe('templates/Cart', () => {
  const factory = new RenderFactory(Component, {
    '*': '123456',
    location: {
      pathname: '/cart/',
      search: '',
      origin: 'https://www.lusini.com',
    },
  })
  it('shows shared card if url-search includes "share" id', async () => {
    const f = await factory.create(props => {
      props.location.search = '?share=123'
    })

    const ctx = () => f.context('templates/Cart')

    ctx().shouldHaveState('is-shared-cart')
  })
})