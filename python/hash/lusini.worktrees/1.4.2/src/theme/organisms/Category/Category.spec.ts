import { Category as Component } from './Category'
import { OrganismFactory } from 'utils/test-helper'
import controller from './controller'

describe('organisms/Category', () => {
  const factory = new OrganismFactory(Component, controller, {
    __version: 1,
    categoryId: 'test',
    gridArea: 'test',
    injectedTeasers: [],
    showInjectedTeaser: false,
  })
  it('renders series-listing when category is a series-category', async () => {
    factory.module('listing').fn('fetch').mock('simple', jest.fn)
    factory
      .module('utils')
      .fn('categories_getAllCatgories')
      .mock(
        {
          value: [
            {
              objectID: 'test-id',
              path: 'RootCat',
              hasSeries: true,
            },
          ],
        },
        jest.fn
      )

    const f = await factory.create((props) => {
      props.categoryId = 'test-id'
    })
    // console.log(f.context('organisms/Category').unwrap().outerHTML)
    f.context('organisms/Category').shouldHaveState('series')
  })

  it('renders product-listing when category is not a series-category', async () => {
    factory.module('listing').fn('fetch').mock('simple', jest.fn)
    factory
      .module('utils')
      .fn('categories_getAllCatgories')
      .mock(
        {
          value: [
            {
              objectID: 'test-id',
              path: 'RootCat',
              hasSeries: false,
            },
          ],
        },
        jest.fn
      )

    const f = await factory.create((props) => {
      props.categoryId = 'test-id'
    })
    f.context('organisms/Category').shouldHaveState('listing')
  })
})
