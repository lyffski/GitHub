import { ToTopButton as Component } from './ToTopButton'
import { RenderFactory } from 'utils/test-helper'

describe('partials/ToTopButton', () => {
  const factory = new RenderFactory(Component, {
    '*': '123456',
    location: {
      pathname: '/',
      search: '',
      origin: 'https://www.lusini.com',
    },
  })

  beforeEach(async () => {
    factory.clearMocks()
  })

  it('does not show the ToTopButton when above the fold', async () => {
    const f = await factory.create()
    const ctx = () => f.context('partials/ToTopButton')

    ctx().shouldNotHaveState('visible')
  })

  it('scrolls to Top when clicking ToTopButton', async () => {
    // not testable
  })
})
