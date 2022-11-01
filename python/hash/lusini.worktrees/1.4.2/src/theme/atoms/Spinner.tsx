import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import theme from 'theme'

type Props = {
  className?: string
  size: 'small' | 'medium' | 'big'
}

export default function Spinner({ className, size }: Props) {
  return (
    <Wrapper className={`${className} ${size}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Wrapper>
  )
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Wrapper = styled.div`
  display: block;
  position: relative;

  &.small,
  &.small div {
    width: 1rem;
    height: 1rem;
  }

  &.medium,
  &.medium div {
    width: 3.125rem;
    height: 3.125rem;
  }

  &.big,
  &.big div {
    width: 6.25rem;
    height: 6.25rem;
  }

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    margin: ${theme.spacing('xxs')};
    border: 2px solid ${theme.colors.white};
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${theme.colors.primary} transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`
