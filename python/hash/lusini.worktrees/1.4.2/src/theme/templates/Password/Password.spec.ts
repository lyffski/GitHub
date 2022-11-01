import Component from './Password'
import { RenderFactory } from 'utils/test-helper'

describe('templates/Cart', () => {
  const factory = new RenderFactory(Component, {
    '*': '123456',
    location: {
      pathname: '/password/',
      search: '',
      origin: 'https://www.lusini.com',
    },
  })
  it('displays password-reset template when search includes "hash"', async () => {
    const f = await factory.create(props => {
      props.location.search = '?hash=123'
    })

    const ctx = () => f.context('templates/Password')

    ctx().shouldHaveState('show-passwordreset')
  })
})