import * as React from 'react'
import * as t from './types'
import ImageMolecule from 'theme/molecules/Image'
import EecTracking from 'theme/atoms/EecTracking'

export default function Image(props: t.Props) {
  if (props.imageLink)
    return (
      <EecTracking config={props.eecTracking} gridArea={props.gridArea}>
        <ImageMolecule
          data-cy-ctx="organisms/Image"
          imageSrc={props.context.optImg}
          imageLink={props.imageLink}
          label={props.label}
          alt={props.alt || props.label}
          imageCaption={props.imageCaption}
          fill={props.fill}
        />
      </EecTracking>
    )

  return (
    <ImageMolecule
      data-cy-ctx="organisms/Image"
      imageSrc={props.context.optImg}
      imageLink={props.imageLink}
      label={props.label}
      alt={props.alt || props.label}
      imageCaption={props.imageCaption}
      fill={props.fill}
    />
  )
}
