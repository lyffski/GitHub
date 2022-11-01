import Component from './VideoPlayer'
import * as k from '@kaminrunde/storybook-addon-fireside'
import * as eec from 'utils/eec'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('VideoPlayer', () => {
  return { kind: 'base', story: 'Video_Player' }
})

export const Video_Player = k.create('VideoPlayer', Component, [
  k.select('ratio', 'Ratio', '16:9', {
    options: [
      { label: '1:1', value: '1:1' },
      { label: '16:9', value: '16:9' },
      { label: '3:2', value: '3:2' },
      { label: '4:3', value: '4:3' },
    ],
  }),
  k.constant('__version', '', 1),
  k.string('gridArea', 'Grid-Area', 'VideoPlayer'),
  k.string('link', 'WistiaID', ''),
  k.bool('isInline', 'Inline', true, {
    hint: 'Whether the Video is Inline Style or Popup Style',
  }),

  ...eec.storyElements,
])
