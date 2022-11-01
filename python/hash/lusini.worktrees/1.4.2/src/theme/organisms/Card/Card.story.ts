import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'
import Component from './Card'
import * as eec from 'utils/eec'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('Card', () => {
  return { kind: 'base', story: 'Card' }
})

export const Card = k.create(
  'Card',
  Component,
  [
    k.string('gridArea', 'Grid-Area', 'Card'),
    k.string(
      'teaserImage',
      'Teaser Image',
      'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg',
      {
        hint: 'Wird auf 380px Breite und 240px Höhe zugeschnitten!',
      }
    ),
    k.string('title', 'Titel', 'Alle Infos & Inspirationen'),
    k.string(
      'disclaimer',
      'Beschreibung',
      'Erfahrern Sie alles über die aktuellen Tends. Lassen Sie sich von unseren mit Liebe zusammengestellten Sortimenten inspirieren'
    ),
    k.string('link', 'Link', '/category/geschirr/eisbecher'),

    ...eec.storyElements,
  ],
  controller
)
