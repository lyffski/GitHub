import Component from './Newsletter'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'

export default {
  title: 'base',
  component: null,
}

k.registerWidgetSelector('Newsletter', () => {
  return { kind: 'base', story: 'Newsletter' }
})

export const Newsletter = k.create(
  'Newsletter',
  Component,
  [
    k.constant('__version', '', 1),
    k.string('gridArea', 'Grid-Area', 'newsletter-grid'),
    k.string(
      'title',
      'Titel',
      'Bleiben Sie mit unserem Newsletter regelmäßig gut informiert über Neuheiten, Trends und Inspirationen.'
    ),
    k.stringList('labels', 'Labels', [
      'Top Angebote & Schnäppchen',
      'Neuheiten & Aktionen',
      'Aktuelle Trends & Tipps',
    ]),
    /** 16.05.2022 removed toggle [WDV-1284] --> always not visible */
    // k.bool('showInput', 'Eingabefeld Sichtbar', false),
    k.string(
      'iconSrc',
      'Icon URL (png)',
      'https://res.cloudinary.com/lusini/image/upload/v1652774640/application/newsletter/voucher-20.png'
    ),
    k.markdown(
      'disclaimer',
      'Datenschutzerklärung',
      'Informationen dazu, wie Lusini mit Ihren Daten umgeht, finden sie in unserer [Datenschutzerklärung](/helpandservice/rechtliches/datenschutz/). Sie können sich jederzeit kostenfrei abmelden.'
    ),
  ],
  controller
)
