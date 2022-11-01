import Component from './Header'
import { RenderFactory } from 'utils/test-helper'
import store from 'store'
import config from 'config'

describe('app/Header', () => {
  const factory = new RenderFactory(Component, {})

  beforeEach(() => {
    factory.clearMocks()
    factory.module('app-Header').var('gq-categories').fixture('empty')
  })

  describe('customerTypeSwitch-popup', () => {
    it('is displayed for 8 seconds when user has no customer-type', async () => {
      factory.updateState(state => state.ui.showB2COverlay = true)
      config.features.b2c = true
  
      const f = await factory.create()
  
      const ctx = () => f.context('app/Header')
  
      ctx().shouldHaveState('customer-switch-popup')
    })

    it('can be closed by seleting b2b option', async () => {
      factory.updateState(state => state.ui.showB2COverlay = true)
      config.features.b2c = true

      const f = await factory.create()
  
      const ctx = () => f.context('app/Header')

      ctx().shouldHaveState('customer-switch-popup')

      await ctx().handle('switch-to-b2b-overlay').click(1)

      ctx().shouldNotHaveState('customer-switch-popup')

      expect(store.getState().b2cSwitch.customerType.customerType).toBe('b2b')
    })

    it('can be closed by seleting b2c option', async () => {
      factory.updateState(state => state.ui.showB2COverlay = true)
      config.features.b2c = true

      const f = await factory.create()
  
      const ctx = () => f.context('app/Header')

      ctx().shouldHaveState('customer-switch-popup')

      await ctx().handle('switch-to-b2c-overlay').click(1)

      ctx().shouldNotHaveState('customer-switch-popup')

      expect(store.getState().b2cSwitch.customerType.customerType).toBe('b2c')
    })

  })

  describe('customerTypeSwitch', () => {
    it('hides if user is logged in', async () => {
      factory.updateState(state => state.b2cSwitch.userStatus = 'loggedIn')
      config.features.b2c = true

      const f = await factory.create()
  
      const ctx = () => f.context('app/Header')

      ctx().shouldNotHaveState('has-customerswitch')
    })

    it('displays if user is logged out and b2c feature is active', async () => {
      factory.updateState(state => state.b2cSwitch.userStatus = 'loggedOut')
      config.features.b2c = true

      const f = await factory.create()
  
      const ctx = () => f.context('app/Header')

      ctx().shouldHaveState('has-customerswitch')
    })

    it('can switch from b2b to b2c and vice-versa', async () => {
      factory.updateState(state => state.b2cSwitch.userStatus = 'loggedOut')
      config.features.b2c = true

      const f = await factory.create()
  
      const ctx = () => f.context('app/Header')

      expect(store.getState().b2cSwitch.customerType.customerType).toBe('b2b')

      await ctx().handle('switch-to-b2c').click(1)

      expect(store.getState().b2cSwitch.customerType.customerType).toBe('b2c')

      await ctx().handle('switch-to-b2b').click(1)

      expect(store.getState().b2cSwitch.customerType.customerType).toBe('b2b')
    })
  })

  describe('language-switcher', () => {
    it('displays only when config.langShop is set', async () => {
      config.langShop = {
        current: {
          language: 'Sprache',
          locale: 'DE',
        },
        alternate: [
          { label: 'deutsch', url: 'https://www.lusini.com/de-ch/', active: true },
          {
            label: 'français',
            url: 'https://www.lusini.com/fr-ch/',
            active: false,
          },
        ],
      }
      const f = await factory.create()

      const ctx = () => f.context('app/Header')

      ctx().shouldHaveState('language-switch')
    })

    it('can change to alternate language', async () => {
      const switchLang = await factory.module('app-Header').fn('switchLanguage').mock({
        sync: true,
        value: () => null
      }, jest.fn)
      config.langShop = {
        current: {
          language: 'Sprache',
          locale: 'DE',
        },
        alternate: [
          { label: 'deutsch', url: 'https://www.lusini.com/de-ch/', active: true },
          {
            label: 'français',
            url: 'https://www.lusini.com/fr-ch/',
            active: false,
          },
        ],
      }
      const f = await factory.create()

      const ctx = () => f.context('app/Header')

      await ctx().handle('language-switch-modal').click(1)
      await ctx().handle('language-switcher').nth(1).click(1)

      expect(switchLang).toBeCalledWith('https://www.lusini.com/fr-ch/', 'français')
    })
  })

})