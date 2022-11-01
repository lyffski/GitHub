import * as React from 'react'

const original = jest.requireActual('./useTranslations')

export const withTranslations = (Component) =>
  function Wrapper(props) {
    return <Component {...props} />
  }

export const Context = original.Context

export default () => {
  function t() {
    return ''
  }
  t.asText = () => ''
  return t
}
