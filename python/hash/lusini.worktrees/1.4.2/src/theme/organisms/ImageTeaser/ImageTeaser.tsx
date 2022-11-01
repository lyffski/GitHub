import * as React from 'react'
import * as t from './types'
import ImageTeaserMolecule from 'theme/molecules/ImageTeaser'
import EecTracking from 'theme/atoms/EecTracking'

export default function ImageTeaser(props: t.Props) {
  const { link, linkLabel, description, title, context } = props

  if (props.link)
    return (
      <EecTracking config={props.eecTracking} gridArea={props.gridArea}>
        <ImageTeaserMolecule
          imgSrc={context.optImg}
          link={link}
          linkLabel={linkLabel}
          description={description}
          title={title}
        />
      </EecTracking>
    )

  return (
    <ImageTeaserMolecule
      imgSrc={context.optImg}
      link={link}
      linkLabel={linkLabel}
      description={description}
      title={title}
    />
  )
}
