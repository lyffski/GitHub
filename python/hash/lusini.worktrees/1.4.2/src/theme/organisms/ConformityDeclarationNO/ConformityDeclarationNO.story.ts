import Component from './ConformityDeclarationNO'
import * as k from '@kaminrunde/storybook-addon-fireside'
import controller from './controller'

export default {
  title: 'Forms/ConformityDeclaration',
  component: null,
}

k.registerWidgetSelector('ConformityDeclarationNO', () => {
  return {
    kind: 'Forms/ConformityDeclaration',
    story: 'Conformity_Declaration_No',
  }
})

export const Conformity_Declaration_No = k.create(
  'ConformityDeclarationNO',
  Component,
  [
    k.string('gridArea', 'Gid-Area', 'ConformityDeclarationNO'),
    k.string(
      'title',
      'Form title',
      'Samsvarserklæring for matkontaktmateriale'
    ),
    k.string('firstname', 'Firstname', 'Fornavn'),
    k.string('surname', 'Surname', 'Etternavn'),
    k.string('email', 'Email', 'E-post'),
    k.string('product_name', 'Product name', 'Produktnavn'),
    k.string('article_number', 'Article number', 'Artikkelnummer'),
    k.string('submit', 'submit', 'Send'),
    k.string('locale', 'Locale', 'no'),
    k.markdown(
      'formSuccessMessage',
      'Success Text',
      '### Din forespørsel er registrert. Du vil motta ditt dokument innen to arbeidsdager.'
    ),
  ],
  controller
)
