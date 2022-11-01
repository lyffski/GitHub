import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { GetHandleProps } from 'react-compound-slider'

type Props = {
  domain: number[]
  handle: {
    id: string
    value: number
    percent: number
  }
  getHandleProps: GetHandleProps
  disabled?: boolean
  'data-cy-handle'?: string
}

type WrapperProps = {
  disabled: boolean
  percent: number
}

export default function Handle(props: Props) {
  const [min, max] = props.domain
  return (
    <Wrapper
      className={'Handle'}
      disabled={!!props.disabled}
      percent={props.handle.percent}
    >
      <div className={'first'} {...props.getHandleProps(props.handle.id)} />
      <div
        role="slider"
        data-cy-handle={props['data-cy-handle']}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={props.handle.value}
        className={'second'}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .first {
    left: ${(p: WrapperProps) => p.percent}%;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    z-index: 5;
    width: 28px;
    height: 42px;
    cursor: pointer;
    background-color: none;
  }

  > .second {
    left: ${(p: WrapperProps) => p.percent}%;
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15), 0 0 6px 0 rgba(0, 0, 0, 0.1);
    background-color: ${(p: WrapperProps) =>
      p.disabled ? `#666` : theme.colors.primary};
  }
`
