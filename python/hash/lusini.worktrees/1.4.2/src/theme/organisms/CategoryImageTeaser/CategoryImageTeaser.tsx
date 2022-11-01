import * as React from 'react'
import ImageTeaser from 'theme/molecules/CategoryImageTeaser'
import * as t from './types'
import EecTracking from 'theme/atoms/EecTracking'

export default function CategoryImageTeaser(props: t.Props) {
  return (
    <EecTracking
      config={props.eecTracking}
      gridArea={props.gridArea}
      threshold={1}
    >
      <ImageTeaser
        data-cy-ctx="organisms/CategoryImageTeaser"
        bg={props.context.optImg}
        title={props.title || props.context.title}
        link={props.context.link}
        type={props.style}
        numHits={props.context.numHits}
        imageBase64={''}
        isSeries={props.context.isSeries}
      />
    </EecTracking>
  )
}
