import { createCustomKnob } from '@kaminrunde/storybook-addon-fireside'
import { FormElement } from './custom-knobs/FormBuilder/types'

type CategoryIdOptions = {}
export const formBuilder = createCustomKnob<FormElement[], {}>('formBuilder')

export const categoryId = createCustomKnob<string, CategoryIdOptions>(
  'categoryId'
)
