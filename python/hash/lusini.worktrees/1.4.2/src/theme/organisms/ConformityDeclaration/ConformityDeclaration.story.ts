import Component from './ConformityDeclaration'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'

export default {
  title: 'Forms/ConformityDeclaration',
  component: null,
}

k.registerWidgetSelector('ConformityDeclaration', () => {
  return {
    kind: 'Forms/ConformityDeclaration',
    story: 'Conformity_Declaration',
  }
})

export const Conformity_Declaration = k.create(
  'ConformityDeclaration',
  Component,
  [
    k.string('gridArea', 'Gid-Area', 'ConformityDeclaration'),
    k.string('title', 'Form title', 'Konformitätserklärung'),
    k.string('firstname', 'Firstname', 'Fornavn'),
    k.string('surname', 'Surname', 'Efternavn'),
    k.string('email', 'Email', 'Email'),
    k.string('product_name', 'Product name', 'Produktnavn'),
    k.string('article_number', 'Article number', 'Artikelnummer'),
    k.string('submit', 'submit', 'Send'),
    k.string('locale', 'Locale', 'dk'),
    k.markdown(
      'formSuccessMessage',
      'Success Text',
      '### Din forespørsel er registrert. Du vil motta ditt dokument innen to arbeidsdager.'
    ),
  ],
  controller
)
