import { PDP as Component } from '../PDP'
import { RenderFactory } from 'utils/test-helper'
import { Variant } from 'modules/productDetail/types'

describe('templates/PDP/FilterDrawer', () => {
  const factory = new RenderFactory(Component, {
    '*': '123456',
    location: {
      pathname: '/pdp/123456/',
      origin: 'https://www.lusini.com',
    },
    pageContext: {
      hrefLang: [],
      brandPath: '',
    },
  })

  beforeEach(async () => {
    factory.clearMocks()
    await factory.module('templates-PDP').fn('useRelatedSkus').mock('empty')
    await factory.module('productDetail').fn('fetch').mock({
      fixture:'simple-3times',
      transform: (data: Variant[]) => {
        data[0].variantData.size.label = '1'
        data[1].variantData.size.label = '2'
        data[2].variantData.size.label = '3'
        data[0].variantData.color.label = 'rot'
        data[1].variantData.color.label = 'grün'
        data[2].variantData.color.label = 'blau'
        return data
      }
    })
  })

  it('opens drawer when a filter was clicked', async () => {
    const f = await factory.create()
    const ctx = () => f.context('templates/PDP')
    const Filter = () => ctx().collection('Filter').nth(0)
    const Drawer = () => ctx().collection('FilterDrawer')

    expect(Drawer).toThrow() // Drawer is hidden

    await Filter().click(1)

    expect(Drawer).not.toThrow() // Drawer exists
  })

  it('closes drawer by clicking "Anwenden"', async () => {
    const f = await factory.create()
    const ctx = () => f.context('templates/PDP')
    const Filter = () => ctx().collection('Filter').nth(0)
    const Drawer = () => ctx().collection('FilterDrawer')

    await Filter().click(1)
    await Drawer().handle('close').nth(0).click(1)

    expect(Drawer).toThrow() // Drawer is hidden
  })

  it('closes drawer by clicking the drawer close icon', async () => {
    const f = await factory.create()
    const ctx = () => f.context('templates/PDP')
    const Filter = () => ctx().collection('Filter').nth(0)
    const Drawer = () => ctx().collection('FilterDrawer')

    await Filter().click(1)
    await Drawer().handle('close-icon').click(400) // drawer animates for 300ms

    expect(Drawer).toThrow() // Drawer is hidden
  })

  it('closes drawer by clicking the drawer overlay', async () => {
    const f = await factory.create()
    const ctx = () => f.context('templates/PDP')
    const Filter = () => ctx().collection('Filter').nth(0)
    const Drawer = () => ctx().collection('FilterDrawer')

    await Filter().click(1)
    await Drawer().handle('overlay').click(400) // drawer animates for 300ms

    expect(Drawer).toThrow() // Drawer is hidden
  })

  it('can set color filter option', async () => {
    await factory.module('productDetail').fn('fetch').mock({
      fixture:'simple-3times',
      transform: (data: Variant[]) => {
        // needed to open drawer
        data[0].variantData.size.label = '1'
        data[1].variantData.size.label = '2'
        data[2].variantData.size.label = '3'

        data[0].subtitle = 'rote sku'
        data[1].subtitle = 'grüne sku'
        data[2].subtitle = 'braune sku'
        data[0].variantData.color.label = 'rot'
        data[1].variantData.color.label = 'grün'
        data[2].variantData.color.label = 'braun'
        return data
      }
    })
    const f = await factory.create()
    const ctx = () => f.context('templates/PDP')
    const Filter = () => ctx().collection('Filter')
    const Drawer = () => ctx().collection('FilterDrawer')

    ctx().handle('subtitle').should('contain.text', 'rote sku')

    await Filter().click(1)

    await Drawer().handle('color-option').nth(1).click(1)

    ctx().handle('subtitle').should('contain.text', 'grüne sku')
  })

  it('sorts the filter values of each filterKey with the attribute SKU_SORT_NUMBER', async () => {
    await factory.module('productDetail').fn('fetch').mock({
      fixture:'simple-3times',
      transform: (data: Variant[]) => {
        // needed to open drawer
        data[0].variantData.size.label = 'a'
        data[1].variantData.size.label = 'b'
        data[2].variantData.size.label = 'c'

        // sorting
        const val = (n:number) => ({
          SKU_SORT_NUMBER: {
            is_filter: false, 
            is_pdp_attribute: false, 
            label:'', values: [{value:n}]
          }
        })
        data[0].attributes = val(2)
        data[1].attributes = val(3)
        data[2].attributes = val(1)
        return data
      }
    })
    const f = await factory.create()
    const ctx = () => f.context('templates/PDP')
    const Filter = () => ctx().collection('Filter')
    const Drawer = () => ctx().collection('FilterDrawer')

    await Filter().click(1)

    Drawer().handle('size-option').nth(0).should('contain.text', 'c')
    Drawer().handle('size-option').nth(1).should('contain.text', 'a')
    Drawer().handle('size-option').nth(2).should('contain.text', 'b')
  })
})