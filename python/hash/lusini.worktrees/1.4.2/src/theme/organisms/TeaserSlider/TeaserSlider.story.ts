import Component from './TeaserSlider'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'
import * as eec from 'utils/eec'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('TeaserSlider', () => {
  return { kind: 'base', story: 'Teaser_Slider' }
})

export const Teaser_Slider = k.create(
  'TeaserSlider',
  Component,
  [
    k.constant('__version', '', 1),
    k.string('gridArea', 'Grid-Area', 'TeaserSlider'),
    k.objectList(
      'items',
      'Slides',
      [
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/trinkglas.jpg',
          link: '#',
          title: 'Test',
          description:
            'Europa hat aus kulinarischer Sicht viel zu bieten! Besonders in Ländern, mit denen viele von uns nicht so vertraut sind. Rumänien ist hier ein echter Geheimtipp! ',
          linkLabel: 'Jetzt entdecken',
        },
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/tablett.jpg',
          link: '#',
          title: 'Test',
          description:
            'Europa hat aus kulinarischer Sicht viel zu bieten! Besonders in Ländern, mit denen viele von uns nicht so vertraut sind. Rumänien ist hier ein echter Geheimtipp! ',
          linkLabel: 'Jetzt entdecken',
        },
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/kuehler.jpg',
          link: '#',
          title: 'Test',
          description:
            'Europa hat aus kulinarischer Sicht viel zu bieten! Besonders in Ländern, mit denen viele von uns nicht so vertraut sind. Rumänien ist hier ein echter Geheimtipp! ',
          linkLabel: 'Jetzt entdecken',
        },
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/shaker.jpg',
          link: '#',
          title: 'Test',
          description:
            'Europa hat aus kulinarischer Sicht viel zu bieten! Besonders in Ländern, mit denen viele von uns nicht so vertraut sind. Rumänien ist hier ein echter Geheimtipp! ',
          linkLabel: 'Jetzt entdecken',
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
          k.string('linkLabel', 'LinkLabel', 'Jetzt entdecken'),
          k.string('title', 'Title', ''),
          k.string('description', 'Description', ''),
        ],
        getRowName: (row) => row.title,
      }
    ),

    ...eec.storyElements,
  ],
  controller
)
