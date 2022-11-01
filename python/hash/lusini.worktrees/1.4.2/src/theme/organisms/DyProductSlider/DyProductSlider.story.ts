import Component from './DyProductSlider'
import * as k from '@kaminrunde/storybook-addon-fireside'

export default {
  title: 'Personalisation/Personalisation',
  component: null,
}

k.registerWidgetSelector('DyProductSlider', () => {
  return { kind: 'Personalisation', story: 'DyProductSlider' }
})

export const DyProductSlider = k.create(
  'DyProductSlider',
  Component,
  [
    k.string('gridArea', 'Gid-Area', 'DyProductSlider'),
    k.string('dySelector', 'DY-Selector', 'wdv-1162-home-recommendation-slot1'),
    k.string('pageType', 'DY-Page-Type', 'HOMEPAGE'),
    k.string('title', 'Title', '', {
      hint: 'Wenn kein title in dy gepflegt ist, wird dieser title ausgespielt',
    }),
  ],
  {}
)
