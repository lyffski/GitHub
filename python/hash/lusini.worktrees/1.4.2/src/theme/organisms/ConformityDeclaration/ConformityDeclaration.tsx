import * as React from 'react'
import ConformityDeclarationWrapper from 'theme/molecules/ConformityDeclaration'
import config from 'config'

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

export default function ConformityDeclaration(props: Props) {
  return (
    <ConformityDeclarationWrapper
      {...props}
      apiCall={config.formApi?.conformityDeclaration || ''}
    />
  )
}
