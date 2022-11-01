import Component from './CategoryHeadlineWithProducts'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'
import { categoryId } from '.storybook/knobs'
import * as eec from 'utils/eec'

export default {
  title: 'Category/HeadlineTeaser',
  component: null,
}

k.registerWidgetSelector('CategoryHeadlineWithProducts', () => {
  return { kind: 'Category/HeadlineTeaser', story: 'With_Products' }
})

export const With_Products = k.create(
  'CategoryHeadlineWithProducts',
  Component,
  [
    k.string('gridArea', 'Grid-Area', 'teaser-geschirr'),
    categoryId('categoryId', 'Kategorie', 'geschirr-porzellan', {}),
    k.string('headline', 'Headline', '', {
      hint: 'Overwrites the default title from DB',
    }),
    k.string(
      'image',
      'Bild',
      'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg',
      {
        hint: 'only visible on Desktop size (1200px)',
      }
    ),
    k.string('imageText', 'Text im Bild', 'Tischwäsche nach Wunschmaß', {
      hint: 'only visible on Desktop size (1200px)',
    }),
    k.stringList(
      'skuList',
      'Produkt Liste',
      ['30101767', '30099973', '30089818', '20010282', '30041100'],
      {
        hint: 'use single SKUs to show product widgets. Max size of displayed Products is 10',
        validate: (value) => {
          if (value.length < 3) return 'Use at least 3 skus'
          if (value.length >= 10)
            return '10 Products will be displayed, but you can add more than 10 Products, so they replace sold out Products'
          return false
        },
      }
    ),

    ...eec.storyElements,
  ],
  controller
)
