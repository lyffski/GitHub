import Component from './ImageTeaser'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'
import * as eec from 'utils/eec'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('ImageTeaser', () => {
  return { kind: 'base', story: 'ImageTeaser' }
})

export const ImageTeaser = k.create(
  'ImageTeaser',
  Component,
  [
    k.constant('__version', 'Version', 1),
    k.string('gridArea', 'Grid-Area', 'Image-Teaser'),
    k.string('linkLabel', 'Link Label', 'Jetzt entdecken'),
    k.string(
      'imgSrc',
      'Img Src',
      'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/trinkglas.jpg'
    ),
    k.string('link', 'Link', '/category/moebel'),
    k.string('title', 'Title', ''),
    k.string('description', 'Description', ''),

    ...eec.storyElements,
  ],
  controller
)
