import { RenderFactory } from 'utils/test-helper'
import Component from './ListingFilter'

describe('molecules/ListingFilter', () => {
  const factory = new RenderFactory(Component, {
    recordId: 'category',
  })

  beforeEach(async () => {
    factory.clearMocks()
    await factory.module('listing').fn('fetch').mock('simple')
  })

  it('should render a list of all available filters, after button "all filters" is clicked', async () => {
    const f = await factory.create()
    const ctx = f.context('molecules/ListingFilter')
    ctx.shouldNotHaveState('drawerShown')
    await ctx.handle('showDrawer').click(1000)
    ctx.shouldHaveState('drawerShown')
  })

  it('should close the the rendered list of filters, after close button is clicked', async () => {
    const f = await factory.create()
    const ctx = f.context('molecules/ListingFilter')
    await ctx.handle('showDrawer').click(1000)
    ctx.shouldHaveState('drawerShown')
    await ctx.handle('closeDrawer').click(1000)
    ctx.shouldNotHaveState('drawerShown')
  })

  it('should toggle the sorting after clicking the sorting button', async () => {
    const f = await factory.create()
    const ctx = f.context('molecules/ListingFilter')
    ctx.shouldNotHaveState('sortingOpened')
    await ctx.handle('sortingToggle').click(1000)
    ctx.shouldHaveState('sortingOpened')
    await ctx.handle('sortingToggle').click(1000)
    ctx.shouldNotHaveState('sortingOpened')
  })
})
