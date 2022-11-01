import * as React from 'react'
import WistiaPlayer from 'theme/atoms/WistiaPlayer'
import EecTracking from 'theme/atoms/EecTracking'
import * as t from './types'

export default function VideoPlayer(props: t.Props) {
  return (
    <EecTracking config={props.eecTracking} gridArea={props.gridArea}>
      <div data-cy-ctx="organisms/VideoPlayer">
        <WistiaPlayer link={props.link} />
      </div>
    </EecTracking>
  )
}
