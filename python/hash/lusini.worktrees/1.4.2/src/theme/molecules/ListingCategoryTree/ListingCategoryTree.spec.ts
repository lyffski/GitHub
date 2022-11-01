import DesktopComponent from './DesktopCategories/DesktopCategories'
import MobileComponent from './MobileCategories/MobileCategories'
import { getCategoryOption, RenderFactory } from 'utils/test-helper'

describe('molecules/ListingCategoryTree', () => {
  describe('MobileCategories', () => {
    const factory = new RenderFactory(MobileComponent, {
      item: getCategoryOption(),
      parent: getCategoryOption(),
    })

    beforeEach(async () => {
      factory.clearMocks()
      factory
        .module('hooks')
        .fn('useTagCategoryPaths')
        .mock({
          value: {
            active: true,
            has: (s: string) => s === 'Parent > Custom-Category > Cat-1',
            get: () => '/t/foo/',
          },
          sync: true,
        })
      factory
        .module('listing')
        .fn('useCategoryTree')
        .mock({
          value: {
            data: {
              item: {
                path: '1',
              },
            },
          },
          sync: true,
        })
    })

    it('shows a back button if the tag category has a another path and current level is not root level', async () => {
      const f = await factory.create()
      f.context('molecules/ListingCategoryTree').shouldHaveState(
        'show-back-button'
      )
    })

    it('displays a virtual category link on the tag-category route when we do not have a entry in contentful', async () => {
      const f = await factory.create()
      const ctx = f.context('molecules/ListingCategoryTree')
      expect(ctx.unwrap().innerHTML).toContain('/t/foo/')
    })
  })

  describe('DesktopCategories', () => {
    const factory = new RenderFactory(DesktopComponent, {
      item: getCategoryOption(),
      parent: getCategoryOption(),
    })

    beforeEach(async () => {
      factory.clearMocks()
      factory
        .module('hooks')
        .fn('useTagCategoryPaths')
        .mock({
          value: {
            active: true,
            has: (s: string) => s === 'Parent > Custom-Category > Cat-1',
            get: () => '/t/foo/',
          },
          sync: true,
        })
      factory
        .module('listing')
        .fn('useCategoryTree')
        .mock({
          value: {
            data: {
              item: {
                path: '1',
              },
            },
          },
          sync: true,
        })
    })

    it('shows a back button if the tag category has a another path and current level is not root level', async () => {
      const f = await factory.create()
      f.context('molecules/ListingCategoryTree')
    })

    it('displays a virtual category link on the tag-category route when we do not have a entry in contentful', async () => {
      const f = await factory.create()
      const ctx = f.context('molecules/ListingCategoryTree')
      expect(ctx.unwrap().innerHTML).toContain('/t/foo/')
    })
  })
})
