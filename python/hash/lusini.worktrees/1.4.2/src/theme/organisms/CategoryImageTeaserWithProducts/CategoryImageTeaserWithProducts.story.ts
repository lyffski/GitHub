import CategoryImageTeaserWithProducts from './CategoryImageTeaserWithProducts'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'
import { categoryId } from '.storybook/knobs'
import * as eec from 'utils/eec'

export default {
  title: 'Category/ImageTeaser',
  component: null,
}

k.registerWidgetSelector('CategoryImageTeaserWithProducts', () => {
  return { kind: 'Category/ImageTeaser', story: 'With_Products' }
})

export const With_Products = k.create(
  'CategoryImageTeaserWithProducts',
  CategoryImageTeaserWithProducts,
  [
    k.string('gridArea', 'Grid-Area', 'Category Image Teaser'),
    categoryId('categoryId', 'Kategorie', 'geschirr-porzellan', {}),
    k.string(
      'bg',
      'Teaser Image',
      'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg'
    ),
    k.string('title', 'title', '', {
      hint: 'Overwrites the default title from DB',
    }),
    k.select('style', 'Style', 'prominent', {
      options: [
        { label: 'top', value: 'top' },
        { label: 'prominent', value: 'prominent' },
      ],
    }),
    k.stringList(
      'skuList',
      'Produkt Liste',
      ['30101767', '30099973', '30089818', '20070998', '30000710'],
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
