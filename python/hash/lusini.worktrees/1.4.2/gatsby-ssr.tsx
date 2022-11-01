import * as React from 'react'
import GlobalLayout from './src/containers/GlobalLayout'

export function wrapPageElement({ element, props }) {
  return <GlobalLayout {...props}>{element}</GlobalLayout>
}
