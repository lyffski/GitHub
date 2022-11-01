import { PDP as Component } from '../PDP'
import { RenderFactory } from 'utils/test-helper'
import { Variant } from 'modules/productDetail/types'

describe('templates/PDP/Gallery', () => {
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
        data[0].images.imageWeb = [
          {classes: [], url: 'img-0-1'},
          {classes: [], url: 'img-0-2'},
          {classes: [], url: 'img-0-3'},
        ]
        data[1].images.imageWeb = [
          {classes: [], url: 'img-1-1'},
          {classes: [], url: 'img-1-2'},
          {classes: [], url: 'img-1-3'},
        ]
        data[2].images.imageWeb = [
          {classes: [], url: 'img-2-1'},
          {classes: [], url: 'img-2-2'},
          {classes: [], url: 'img-2-3'},
        ]
        return data
      }
    })
  })

  it.todo('can navigate to an image by clicking the thumbnails (desktop)')

  it.todo('can navigate to next/prev image by swipe (mobile)')

  it.todo('resets image gallery to first image, when variant changes')

  it.todo('can show a video')

  it.todo('displays a placeholder-image if no image for the product exists')
})