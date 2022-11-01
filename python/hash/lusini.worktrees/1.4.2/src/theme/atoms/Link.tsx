/* eslint-disable react/prop-types */
import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'

type Props = {
  to?: string
  children?: React.ReactNode
  className?: string
  onClick?: any
  ref?: any
  'data-cy-ctx'?: string
  'data-cy-handle'?: string
  'data-cy-collection'?: string
  'data-cy-state'?: string
}

export default React.forwardRef(function Link(props: Props, ref: any) {
  const { to, children, className, onClick, ...rest } = props
  if (!to)
    return (
      // eslint-disable-next-line @kaminrunde/firescout/onclick-needs-handle
      <span onClick={onClick} className={className} ref={ref} {...rest}>
        {children}
      </span>
    )
  const internal = to.startsWith('/') || to.startsWith('#')

  if (internal) {
    if (process.env.NODE_ENV === 'development') {
      // if(!to.endsWith('/')) {
      //   console.log('internal links must end with a trailing slash')
      //   return <a style={{color: 'green', background: 'blue'}}>{children}</a>
      // }
    }

    return (
      // eslint-disable-next-line @kaminrunde/firescout/onclick-needs-handle
      <GatsbyLink
        ref={ref}
        onClick={onClick}
        className={className}
        to={to}
        {...rest}
      >
        {children}
      </GatsbyLink>
    )
  } else {
    return (
      // eslint-disable-next-line @kaminrunde/firescout/onclick-needs-handle
      <a
        href={to}
        ref={ref}
        onClick={onClick}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    )
  }
}) as React.ComponentType<Props>
