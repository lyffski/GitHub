import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { GetRailProps } from 'react-compound-slider'

type Props = {
  getRailProps: GetRailProps
}

export default function SliderRail(props: Props) {
  return (
    <Wrapper className={'SliderRail'}>
      <div className={'railOuterStyle'} {...props.getRailProps()} />
      <div className={'railInnerStyle'} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .railOuterStyle {
    position: absolute;
    width: 100%;
    height: 42px;
    transform: translate(0%, -50%);
    ${theme.rounding('l')}
    cursor: pointer;
  }

  > .railInnerStyle {
    position: absolute;
    width: 100%;
    height: 10px;
    transform: translate(0%, -50%);
    ${theme.rounding('l')}
    pointer-events: none;
    background-color: ${theme.colors.shade.b5};
  }
`
