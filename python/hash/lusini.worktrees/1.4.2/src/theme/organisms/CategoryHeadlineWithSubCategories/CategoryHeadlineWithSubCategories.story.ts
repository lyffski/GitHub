import CategoryHeadlineWithSubCategories from './CategoryHeadlineWithSubCategories'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'
import { categoryId } from '.storybook/knobs'
import * as eec from 'utils/eec'

export default {
  title: 'Category/HeadlineTeaser',
  component: null,
}

k.registerWidgetSelector('CategoryHeadlineWithSubCategories', () => {
  return { kind: 'Category/HeadlineTeaser', story: 'With_Sub_Categories' }
})

export const With_Sub_Categories = k.create(
  'CategoryHeadlineWithSubCategories',
  CategoryHeadlineWithSubCategories,
  [
    k.string('gridArea', 'Grid-Area', 'CategoryHeadline'),
    categoryId('categoryId', 'Kategorie', 'geschirr-porzellan', {}),
    k.string(
      'teaserImage',
      'Teaser Image',
      'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg'
    ),
    k.string('imageText', 'Image Text', ''),
    k.string('title', 'Title', '', {
      hint: 'Overwrites the default title from DB',
    }),
    k.objectList(
      'categories',
      'Categories',
      [
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/trinkglas.jpg',
          link: '#',
          label: 'Gingläser',
        },
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/tablett.jpg',
          link: '#',
          label: 'Servierbretter',
        },
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/kuehler.jpg',
          link: '#',
          label: 'Flaschenkühler',
        },
        {
          imgSrc:
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/shaker.jpg',
          link: '#',
          label: 'Cocktailshaker',
        },
      ],
      {
        schema: [
          k.string(
            'imgSrc',
            'Img Src',
            'https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/trinkglas.jpg'
          ),
          k.string('link', 'Link', 'CategoryLink'),
          k.string('label', 'Label', 'Gingläser'),
        ],
        getRowName: (row) => row.label,
        validate: (rows) => rows.length !== 4 && 'exactly 4 rows are allowed!',
      }
    ),

    ...eec.storyElements,
  ],
  controller
)
