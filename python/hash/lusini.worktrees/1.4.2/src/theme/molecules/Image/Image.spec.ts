import Component from './Image'
import { RenderFactory } from 'utils/test-helper'

describe('molecules/Image', () => {
  const factory = new RenderFactory(Component, {
    imageSrc: '',
    alt: '',
    imageCaption: '',
    label: '',
  })

  it('renders caption and label for the image, if given by props', async () => {
    const f = await factory.create((props) => {
      props.label = 'label'
      props.imageCaption = 'imageCaption'
    })
    f.context('molecules/Image').shouldHaveState('has-caption')
    f.context('molecules/Image').shouldHaveState('has-label')
  })
})
