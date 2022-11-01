import Component from './CategoryHeadline'
import { RenderFactory } from 'utils/test-helper'

describe('molecules/CategoryHeadline', () => {
  const factory = new RenderFactory(Component, {
    link: '',
    title: '',
    numHits: 0,
    headerStyle: 'big',
  })

  beforeEach(factory.clearMocks)

  it('hides total number of products is not greater than 0', async () => {
    const f = await factory.create()
    f.context('molecules/CategoryHeadline').shouldNotHaveState('hits-visible')
  })

  it('shows total number of products when numHits props was given and is bigger than 0', async () => {
    const f = await factory.create((props) => {
      props.numHits = 500
    })
    f.context('molecules/CategoryHeadline').shouldHaveState('hits-visible')
  })

  it('hides the categorylinks links when hideLink props are true', async () => {
    const f = await factory.create((props) => {
      props.hideLink = true
    })
    f.context('molecules/CategoryHeadline').shouldNotHaveState('link-visible')
  })

  it('should render categorylinks links by default, because link prop is not optional - it can only be disabled by another prop', async () => {
    const f = await factory.create()
    f.context('molecules/CategoryHeadline').shouldHaveState('link-visible')
  })
})
