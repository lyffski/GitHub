import Component from './Image'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'
import * as eec from 'utils/eec'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('Image', () => {
  return { kind: 'base', story: 'Image' }
})

export const Image = k.create(
  'Image',
  Component,
  [
    k.constant('__version', 'Version', 3),
    k.string('gridArea', 'Grid-Area', 'Image'),
    k.string(
      'imageSrc',
      'Image-Source',
      'https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg'
    ),
    k.string('alt', 'alt', '', {
      hint: 'Alle Bilder müssen ein alt-tag haben!',
    }),
    k.string('imageLink', 'Image-Link', ''),
    k.string('imageCaption', 'Image-Caption', '', {
      hint: 'Längere Bildbeschreibung welche auch mehrzeilig werden kann.',
    }),
    k.string('label', 'Label', '', {
      hint: 'prägnantes ein-wort label. wird abgeschnitten wenn nicht genug platz vorhanden ist',
    }),
    // k.bool('fill', 'Fill', false, {
    //   hint: 'Wenn das Bild Nachbarkomponenten hat, dann nimmt es automatisch die Größe der Nachbarkomponente(n) ein'
    // })

    ...eec.storyElements,
  ],
  controller
)
