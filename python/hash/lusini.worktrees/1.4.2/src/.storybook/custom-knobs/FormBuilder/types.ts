export type FormElement =
  | {
      type: 'text'
      name: string
      label: string
      required: boolean
      multiline: boolean
    }
  | { type: 'number'; name: string; label: string; required: boolean }
  | { type: 'email'; name: string; label: string; required: boolean }
  // | { type: 'file', name: string, label: string, required: boolean }
  | {
      type: 'select'
      name: string
      label: string
      required: boolean
      options: string[]
    }
  | {
      type: 'radioGroup'
      name: string
      label: string
      required: boolean
      options: string[]
    }
  | {
      type: 'checkboxGroup'
      name: string
      label: string
      required: boolean
      options: string[]
    }
