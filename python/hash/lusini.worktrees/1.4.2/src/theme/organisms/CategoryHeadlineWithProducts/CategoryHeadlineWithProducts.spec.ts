import Component from './CategoryHeadlineWithProducts'
import { OrganismFactory } from 'utils/test-helper'
import controller from './controller'

describe('organisms/Category', () => {
  const factory = new OrganismFactory(Component, controller, {
    gridArea: 'BrandTeaser',
    categoryId: '',
    headline: '',
    image: '',
    imageText: '',
    skuList: [],
    eecTracking: {
      campaignId: '',
      creative: '',
      name: ''
    }
  })

  beforeEach(() => {
    factory.clearMocks()
    factory.module('productListFetcher').fn('bySku').mock('list')
    factory.module('utils').fn('categories_getAllCatgories').mock('empty')
  })

  it('displays image if image is defined in props', async () => {
    const f = await factory.create(props => {
      props.image = 'my-image'
    })

    const ctx = () => f.context('organisms/CategoryHeadlineWithProducts')

    ctx().shouldHaveState('image-visible')
  })

  it('displays image-text if image and image-text are defined in props', async () => {
    const f = await factory.create(props => {
      props.image = 'my-image'
      props.imageText = 'my-text'
    })

    const ctx = () => f.context('organisms/CategoryHeadlineWithProducts')

    ctx().shouldHaveState('image-text-visible')
  })
})
