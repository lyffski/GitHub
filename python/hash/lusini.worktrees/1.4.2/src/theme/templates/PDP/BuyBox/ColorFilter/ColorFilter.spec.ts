import Component from './ColorFilter'
import { RenderFactory } from 'utils/test-helper'
import { useFilter } from 'modules/productDetail'

describe('templates/PDP/ColorFilter', () => {
  const factory = new RenderFactory(
    Component,
    {
      onMoreClick: () => null,
    },
    'templates/PDP'
  )

  beforeEach(async () => {
    factory.clearMocks()
    await factory.module('productDetail').fn('fetch').mock('simple')
  })

  it('displays a plus-button when more than five options are available', async () => {
    const filterResult: ReturnType<typeof useFilter> = {
      highlight: false,
      setValue: () => null as any,
      data: {
        key: 'color',
        value: null,
        options: [
          { image: { classes: [], url: '' }, label: 'a', selectable: true },
          { image: { classes: [], url: '' }, label: 'b', selectable: true },
          { image: { classes: [], url: '' }, label: 'c', selectable: true },
          { image: { classes: [], url: '' }, label: 'd', selectable: true },
          { image: { classes: [], url: '' }, label: 'e', selectable: true },
          { image: { classes: [], url: '' }, label: 'f', selectable: true },
        ],
      },
    }
    factory.module('productDetail').fn('useFilter').mock({
      sync: true,
      value: filterResult,
    })
    const f = await factory.create()
    const ctx = f.context('templates/PDP').collection('ColorFilter')

    ctx.handle('option').should('have.length', 5)
    ctx.shouldHaveState('has-color-options')
    ctx.shouldHaveState('has-more-colors')
  })

  it('displays only the color-label when only one option is available', async () => {
    const filterResult: ReturnType<typeof useFilter> = {
      highlight: false,
      setValue: () => null as any,
      data: {
        key: 'color',
        value: null,
        options: [
          { image: { classes: [], url: '' }, label: 'a', selectable: true },
        ],
      },
    }
    factory.module('productDetail').fn('useFilter').mock({
      sync: true,
      value: filterResult,
    })

    const f = await factory.create()
    const ctx = f.context('templates/PDP').collection('ColorFilter')

    ctx.shouldHaveState('is-single-filter')
  })
})
