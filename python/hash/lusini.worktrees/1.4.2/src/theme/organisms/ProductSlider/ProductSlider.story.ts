import Component from './ProductSlider'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'
import * as eec from 'utils/eec'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('ProductSlider', () => {
  return { kind: 'base', story: 'Product_Slider' }
})

export const Product_Slider = k.create(
  'ProductSlider',
  Component,
  [
    k.constant('__version', '', 2),
    k.string('gridArea', 'Grid-Area', 'ProductSlider'),
    k.string('title', 'Titel', ''),
    k.number('maxProducts', 'Maximale Anzahl der Produkte', 20, {
      hint: 'Max Products  only for search',
    }),
    k.bool('searchSwitch', 'SKU Liste / Suche  ', true),
    k.string('search', 'Suche', ''),
    k.stringList(
      'skuList',
      'Produkt Liste',
      ['30089818', '30089818', '30089818', '30089818', '30089818'],
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
