import Component, { Gq } from './Footer'
import { RenderFactory } from 'utils/test-helper'

describe('app/Footer', () => {
  const factory = new RenderFactory(Component, {})

  beforeEach(() => {
    factory.clearMocks()
    factory.module('app-Footer').var('gq-appfooter').fixture('default')
  })

  describe('Newsletter', () => {
    it('hides if contentful data footer.newsletter.title is empty', async () => {
      const f = await factory.create()
      const ctx = () => f.context('app/Footer')
      ctx().shouldNotHaveState('newsletter-visible')
    })

    it.skip('displays if contentful data footer.newsletter.title is not empty', async () => {
      factory
        .module('app-Footer')
        .var('gq-appfooter')
        .fixture({
          fixture: 'default',
          transform: (data: Gq) => {
            data.footer.newsletter.title = 'Newsletter'
            return data
          },
        })
      const f = await factory.create()
      const ctx = () => f.context('app/Footer')
      ctx().shouldHaveState('newsletter-visible')
    })
  })
})
