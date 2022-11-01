import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'

export default function Divider(props: { transparent: boolean }) {
  if (props.transparent) return <div style={{ height: 1 }} />
  return <Wrapper data-cy-ctx="organisms/Divider" />
}

const Wrapper = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.primary};
`
