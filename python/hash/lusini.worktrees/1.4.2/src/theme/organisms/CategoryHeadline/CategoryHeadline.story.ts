import CategoryHeadline from './CategoryHeadline'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'
import { categoryId } from '.storybook/knobs'
import * as eec from 'utils/eec'

export default {
  title: 'Category/HeadlineTeaser',
  component: null,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
k.registerWidgetSelector('CategoryHeadline', (props) => {
  return { kind: 'Category/HeadlineTeaser', story: 'Headline' }
})

export const Headline = k.create(
  'CategoryHeadline',
  CategoryHeadline,
  [
    // k.constant('__version', '', 1),
    k.string('gridArea', 'Grid-Area', 'CategoryHeadline'),
    categoryId('categoryId', 'Kategorie', 'geschirr-porzellan', {}),
    k.string('title', 'Title', '', {
      hint: 'Overwrites the default title from DB',
    }),
    k.bool('headerOnly', 'Hide Link', false),

    ...eec.storyElements,
  ],
  controller
)
