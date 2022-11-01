import * as k from '@kaminrunde/storybook-addon-fireside'
import Component from './Markdown'
import controller from './controller'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('Markdown', () => {
  return { kind: 'base', story: 'Markdown' }
})

const markdownContent = `+++box
+++Schreibe etwas Interessantes+++

Probleme mit der Syntax?  wir haben eine Doku unter 

**documentation -> Markdown Dokumentation**
+++`

export const Markdown = k.create(
  'Markdown',
  Component,
  [
    k.string('gridArea', 'Grid-Area', 'Markdown'),
    k.bool('centered', 'Zentriert', false),
    k.markdown('md', 'Markdown', markdownContent, {}),
    k.select('imagePosition', 'Position', 'left', {
      tab: 'Image',
      options: [
        { label: 'left', value: 'left' },
        { label: 'right', value: 'right' },
      ],
    }),
    // @ts-expect-error
    k.select('imageWidth', 'Width', 40, {
      tab: 'Image',
      options: [
        { label: '30%', value: 30 },
        { label: '40%', value: 40 },
        { label: '50%', value: 50 },
      ],
    }),
    k.string('imageSrc', 'Src', '', { tab: 'Image' }),
    k.string('imageLink', 'Link', '', { tab: 'Image' }),
    k.string('imageAlt', 'Alt Text', '', { tab: 'Image' }),
    k.string('imageCaption', 'Caption', '', { tab: 'Image' }),
  ],
  controller
)
