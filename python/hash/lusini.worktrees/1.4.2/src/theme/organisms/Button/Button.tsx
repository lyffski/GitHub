import * as React from 'react'
import ButtonAtom from 'theme/atoms/Button'
import * as t from './types'
import EecTracking from 'theme/atoms/EecTracking'

export default function Button(props: t.Props) {
  const variation =
    props.variation === null || props.variation === undefined
      ? 'primary'
      : props.variation
  return (
    <EecTracking
      config={props.eecTracking}
      gridArea={props.gridArea}
      threshold={1}
    >
      <ButtonAtom
        data-cy-ctx="organisms/Button"
        variation={variation}
        to={props.link}
      >
        {props.label}
      </ButtonAtom>
    </EecTracking>
  )
}
