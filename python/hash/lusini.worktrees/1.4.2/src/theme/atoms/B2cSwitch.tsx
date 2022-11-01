import * as React from 'react'
import styled from 'styled-components'

type Props = {
  as?: any
  children: any
}

function B2cSwitch() {
  return null
}

B2cSwitch.B2B = function B2B(props: Props) {
  return <B2bCss as={props.as}>{props.children}</B2bCss>
}

B2cSwitch.B2C = function B2C(props: Props) {
  return <B2cCss as={props.as}>{props.children}</B2cCss>
}

export default B2cSwitch

const B2bCss = styled.span`
  body.b2c & {
    display: none;
  }
`

const B2cCss = styled.span`
  body.b2b & {
    display: none;
  }
`
