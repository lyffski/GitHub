import * as React from 'react'
import NewsletterComponent from 'theme/molecules/Newsletter'
import * as t from './types'

export default function Newsletter(props: t.Props) {
  return (
    <NewsletterComponent
      labels={props.labels}
      title={props.title}
      disclaimer={props.disclaimer}
      showInput={props.showInput}
      iconSrc={props.iconSrc}
    />
  )
}
