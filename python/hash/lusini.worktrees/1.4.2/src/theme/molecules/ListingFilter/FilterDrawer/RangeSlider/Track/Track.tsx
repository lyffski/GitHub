import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { GetTrackProps } from 'react-compound-slider'

type Props = {
  source: {
    id: string
    value: number
    percent: number
  }
  target: {
    id: string
    value: number
    percent: number
  }
  getTrackProps: GetTrackProps
  disabled?: boolean
}

type WrapperProps = {
  sourcePercent: number
  targetPercent: number
  disabled: boolean
}

export default function Track(props: Props) {
  return (
    <Wrapper
      className={'Track'}
      sourcePercent={props.source.percent}
      targetPercent={props.target.percent}
      disabled={props.disabled}
      {...props.getTrackProps()}
    />
  )
}

const Wrapper = styled.div`
  position: absolute;
  transform: translate(0%, -50%);
  height: 10px;
  z-index: 1;
  background: ${(p: WrapperProps) =>
    p.disabled
      ? `#999`
      : `linear-gradient(270deg, #EDD179 0%, ${theme.colors.primary} 100%)`};
  ${theme.rounding('l')}
  cursor: pointer;
  left: ${(p: WrapperProps) => p.sourcePercent}%;
  width: ${(p: WrapperProps) => p.targetPercent - p.sourcePercent}%;
`
