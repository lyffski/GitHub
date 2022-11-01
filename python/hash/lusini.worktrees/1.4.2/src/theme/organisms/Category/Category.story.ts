import Component from './Category'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'
import { categoryId } from '.storybook/knobs'

export default {
  title: 'Category',
  component: null,
}

k.registerWidgetSelector('Category', () => {
  return { kind: 'Category', story: 'Category' }
})

export const Category = k.create(
  'Category',
  Component,
  [
    k.constant('__version', '', 1),
    k.string('gridArea', 'Grid-Area', 'Category'),
    categoryId('categoryId', 'Kategorie', 'geschirr-porzellan', {}),
    k.select('tag', 'Tag', '', {
      options: [
        { label: '', value: '' },
        { label: 'sale', value: 'sale' },
        { label: 'new', value: 'new' },
      ],
    }),
    k.bool('showInjectedTeaser', 'Injected Teaser anzeigen', false, {
      tab: 'Injected Teaser',
    }),
    k.objectList('injectedTeasers', 'Injected Teasers', [], {
      tab: 'Injected Teaser',
      validate: (rows) => {
        if (rows.length !== 0 && rows.length !== 2) {
          return 'Es sind entweder 0 oder 2 Einträge erlaubt'
        }
        return false
      },
      schema: [
        k.string('title', 'Überschrift', ''),
        k.string('imgUrl', 'Img-Url', '', {
          hint: 'Images need the format 1000:650!!',
        }),
        k.string('linkTarget', 'Link-Target', ''),
        k.string('linkLabel', 'Link-Label', ''),
        k.constant('template', '', 'Image'),
      ],
      getRowName: (row) => row.title,
    }),
  ],
  controller
)
