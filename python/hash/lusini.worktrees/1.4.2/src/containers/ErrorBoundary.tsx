import * as React from 'react'
import { Redirect } from '@reach/router'
import config from 'config'

export default class ErrorBoundary extends React.Component<
  { children: any },
  { hasError: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error, errorInfo)
  }

  render() {
    if (
      typeof window !== 'undefined' &&
      window.location.pathname === '/error/' &&
      this.state.hasError
    ) {
      return <h1>Something went super wrong</h1>
    }
    if (this.state.hasError && process.env.NODE_ENV !== 'development') {
      return <Redirect to={'/' + config.locale + '/error/'} />
    }

    return this.props.children
  }
}
