import Component from './CategoryImageTeaser'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'
import { categoryId } from '.storybook/knobs'
import * as eec from 'utils/eec'

export default {
  title: 'Category/ImageTeaser',
  component: null,
}
k.registerWidgetSelector('CategoryImageTeaser', () => {
  return { kind: 'Category/ImageTeaser', story: 'Teaser' }
})
export const Teaser = k.create(
  'CategoryImageTeaser',
  Component,
  [
    k.string('gridArea', 'Grid-Area', 'teaser-geschirr'),
    categoryId('categoryId', 'Kategorie', 'geschirr-porzellan', {}),
    k.string(
      'bg',
      'Background Image',
      'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg'
    ),
    k.string('title', 'title', '', {
      hint: 'Overwrites the default title from DB',
    }),
    k.select('style', 'Style', 'prominent', {
      options: [
        { label: 'small', value: 'small' },
        { label: 'top', value: 'top' },
        { label: 'prominent', value: 'prominent' },
      ],
    }),

    ...eec.storyElements,
  ],
  controller
)
