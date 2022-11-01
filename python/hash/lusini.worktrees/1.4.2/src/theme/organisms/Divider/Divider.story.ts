import Component from './Divider'
import * as k from '@kaminrunde/storybook-addon-fireside'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('Divider', () => {
  return { kind: 'base', story: 'Divider' }
})

export const Divider = k.create(
  'Divider',
  Component,
  [
    k.string('gridArea', 'Gid-Area', 'Divider'),
    k.bool('transparent', 'Transparent', false),
  ],
  {}
)
