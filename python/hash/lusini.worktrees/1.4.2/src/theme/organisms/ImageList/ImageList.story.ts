import Component from './ImageList'
import * as k from '@kaminrunde/storybook-addon-fireside'
import * as ae from 'utils/eec'
import controller from './controller'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('ImageList', () => {
  return { kind: 'ImageList', story: 'ImageList' }
})

export const ImageList = k.create(
  'ImageList',
  Component,
  [
    // k.constant('__version', '', 1),
    k.string('gridArea', 'Grid-Area', 'ImageList'),
    k.string('title', 'Title', 'Die Marken von Lusini'),
    k.objectList(
      'categories',
      'Categories',
      [
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/trinkglas.jpg',
          link: '#',
          label: 'Stühle',
        },
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/tablett.jpg',
          link: '#',

          label: 'Tische',
        },
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/kuehler.jpg',
          link: '#',

          label: 'Lampen',
        },
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/shaker.jpg',
          link: '#',

          label: 'Regale',
        },
      ],
      {
        schema: [
          k.string(
            'imgSrc',
            'Img Src',
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/trinkglas.jpg'
          ),
          k.string('link', 'Link', 'Link'),
          k.string('label', 'Kategorie Name', 'Kategorie'),
        ],
        getRowName: (row) => row.label,
      }
    ),

    ...ae.storyElements,
  ],
  controller
)
