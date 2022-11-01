import Component from './BrandTeaser'
import * as k from '@kaminrunde/storybook-addon-fireside'
import * as ae from 'utils/eec'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('BrandTeaser', () => {
  return { kind: 'base', story: 'BrandTeaser' }
})

export const BrandTeaser = k.create('BrandTeaser', Component, [
  // k.constant('__version', '', 1),
  k.string('gridArea', 'Grid-Area', 'BrandTeaser'),
  k.string('label', 'Label', 'Die Marken von Lusini'),
  k.objectList(
    'items',
    'Slides',
    [
      {
        imgSrc:
          'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/trinkglas.jpg',
        link: '#',
        linkLabel: 'Jetzt entdecken',
        name: 'VEGA',
        logo: 'vega',
      },
      {
        imgSrc:
          'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/tablett.jpg',
        link: '#',
        linkLabel: 'Jetzt entdecken',
        name: 'Erwin M.',
        logo: 'erwinM',
      },
      {
        imgSrc:
          'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/kuehler.jpg',
        link: '#',
        linkLabel: 'Jetzt entdecken',
        name: 'Pulsiva',
        logo: 'pulsiva',
      },
      {
        imgSrc:
          'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/shaker.jpg',
        link: '#',
        linkLabel: 'Jetzt entdecken',
        name: 'Jobeline',
        logo: 'jobeline',
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
        k.string('name', 'Name', 'Vega'),
        k.select('logo', 'Logo', 'prominent', {
          options: [
            { label: 'Vega', value: 'vega' },
            { label: 'Erwin M.', value: 'erwinM' },
            { label: 'Pulsiva', value: 'pulsiva' },
            { label: 'Jobeline', value: 'jobeline' },
            { label: 'Lusini', value: 'lusini' },
          ],
        }),
      ],
      getRowName: (row) => row.name,
    }
  ),

  ...ae.storyElements,
])
