import Component from './Button'
import * as k from '@kaminrunde/storybook-addon-fireside'
import * as ae from 'utils/eec'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('Button', () => {
  return { kind: 'base', story: 'Button' }
})

export const Button = k.create(
  'Button',
  Component,
  [
    // k.constant('__version', '', 1),
    k.string('gridArea', 'Gid-Area', 'Button'),
    k.string('label', 'Label', 'my-label'),
    k.string('link', 'Link Target', '/', {
      hint: 'the url the user navigates to when he clicked the button',
    }),
    k.select('variation', 'ButtonStyle', 'primary', {
      options: [
        { label: 'primary', value: 'primary' },
        { label: 'secondary', value: 'secondary' },
        { label: 'primary_s', value: 'primary_s' },
        { label: 'secondary_s', value: 'secondary_s' },
        { label: 'cart', value: 'cart' },
        { label: 'cart_disabled', value: 'cart_disabled' },
        { label: 'special', value: 'special' },
        { label: 'special_s', value: 'special_s' },
      ],
    }),
    ...ae.storyElements,
  ],
  {}
)
