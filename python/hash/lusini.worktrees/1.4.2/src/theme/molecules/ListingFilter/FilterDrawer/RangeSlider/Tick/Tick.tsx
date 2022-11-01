import * as React from 'react'
import styled from 'styled-components'

type Props = {
  tick: {
    id: string
    value: number
    percent: number
  }
  count: number
}

type WrapperProps = {
  tickPercent: number
  count: number
}

export default function Tick(props: Props) {
  return (
    <Wrapper
      className={'Tick'}
      tickPercent={props.tick.percent}
      count={props.count}
    >
      <div className={'first'} />
      <div className={'second'}>{props.tick.value}</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .first {
    position: absolute;
    margin-top: 14px;
    width: 1px;
    height: 5px;
    background-color: rgb(200, 200, 200);
    left: ${(p: WrapperProps) => p.tickPercent}%;
  }

  > .second {
    position: absolute;
    margin-top: 22px;
    font-size: 10px;
    text-align: center;
    margin-left: ${(p: WrapperProps) => -(100 / p.count) / 2}%;
    width: ${(p: WrapperProps) => 100 / p.count}%;
    left: ${(p: WrapperProps) => p.tickPercent}%;
  }
`
