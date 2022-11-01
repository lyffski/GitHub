import * as React from 'react'
import ConformityDeclarationWrapper from 'theme/molecules/ConformityDeclaration'

type Props = {
  id: string
  recipient: string
  firstname: string
  surname: string
  email: string
  product_name: string
  article_number: string
  locale: string
  submit: string
  formSuccessMessage: string
  onClick: () => void
}

export default function ConformityDeclarationNO(props: Props) {
  return (
    <ConformityDeclarationWrapper
      {...props}
      //gerform.io
      apiCall="https://getform.io/f/aec1a29b-dcdf-401c-801e-add63d6683bf"
    />
  )
}
