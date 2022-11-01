import * as React from 'react'
import styled from 'styled-components'
import * as t from './types'
import CategoryHeadline from 'theme/molecules/CategoryHeadline'
import Link from 'theme/atoms/Link'
import EecTracking from 'theme/atoms/EecTracking'

export default function HeadLine(props: t.Props) {
  return (
    <EecTracking
      config={props.eecTracking}
      gridArea={props.gridArea}
      threshold={1}
    >
      <Wrapper
        as={Link}
        to={props.context.link}
        data-cy-ctx="organisms/CategoryHeadline"
      >
        <CategoryHeadline
          link={props.context.link}
          title={props.title !== '' ? props.title : props.context.title}
          numHits={props.context.numHits}
          headerStyle="big"
          hideLink={props.headerOnly}
        />
      </Wrapper>
    </EecTracking>
  )
}

const Wrapper = styled.div``
