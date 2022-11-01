import Component from './FormBuilder'
import * as k from '@kaminrunde/storybook-addon-fireside'
import { formBuilder } from '.storybook/knobs'
import controller from './controller'

export default {
  title: 'Forms/FormBuilder',
  component: null,
}

k.registerWidgetSelector('FormBuilder', () => {
  return { kind: 'Forms/FormBuilder', story: 'FormBuilder' }
})

export const FormBuilder = k.create(
  'FormBuilder',
  Component,
  [
    k.string('gridArea', 'Grid-Area', 'Form-Builder'),
    k.string('submitButtonText', 'Submit button label', 'Submit'),
    k.string(
      'endPoint',
      'End Point',
      'https://getform.io/f/b355d002-e37f-440a-8954-46b8d4b0a3a5'
    ),
    formBuilder('formBuilder', 'Form Builder', [], {}),
    k.markdown(
      'formSuccessMessage',
      'Success Text',
      '### Dankeschön!\n\nDeine Anfrage wurde erfolgreich übermittelt.\n\nWir werden uns schnellstmöglich bei dir melden.'
    ),
  ],
  controller
)
