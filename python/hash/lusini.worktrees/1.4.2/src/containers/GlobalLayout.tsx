import * as React from 'react'
import GlobalStyle from './GlobalStyle'
import Partials from './Partials'
import ErrorBoundary from './ErrorBoundary'

export default function GlobalLayout(props: { children: any }) {
  return (
    <ErrorBoundary>
      <GlobalStyle />
      {props.children}

      <Partials />
    </ErrorBoundary>
  )
}
