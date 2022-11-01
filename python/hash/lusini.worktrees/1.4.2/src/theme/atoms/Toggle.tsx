import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import theme from 'theme'

type Props = {
  onClick: () => void
  checked?: boolean
  'data-cy-handle'?: string
  'data-cy-handle-input'?: string
}

export default function Toggle(props: Props) {
  return (
    <Wrapper>
      <input
        type="checkbox"
        data-cy-handle={props['data-cy-handle-input']}
        checked={props.checked}
        onChange={() => {
          props.onClick()
        }}
      />
      <span className={'box'} data-cy-handle={props['data-cy-handle']} />
    </Wrapper>
  )
}

const ripple = keyframes`
  0% {
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.0);
  }
  50% { 
    box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0);
  }
`

const Wrapper = styled.label`
  ${theme.ty('rc-base')}
  display: block;
  position: relative;
  padding-left: ${theme.spacing('ml')};
  user-select: none;
  cursor: pointer;

  /* Der input wird unsichtbar gemacht, die .box ersetzt diese */
  > .box {
    position: absolute;
    left: 0;
    top: -0.625rem;
    width: 1.25rem;
    height: 1.25rem;
    background: #fff;
    border: 1px solid ${theme.colors.shade.b4};
    border-radius: ${theme._rounding.s}px;

    /* :after ist für die graue ausfadenen ripple-animation da */
    /* :before ist Haken bzw der Bobbel ansich innerhalb der box */
    &:after,
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  &:hover {
    > .box {
      border-color: ${theme.colors.primary};
    }
  }

  > input {
    outline: 0;
    visibility: hidden;
    width: 1.25rem;
    margin: 0;
    display: block;
    float: left;
    font-size: inherit;
    position: absolute;

    & :checked {
      + .box {
        border-color: ${theme.colors.primary};

        &:before {
          top: 3px;
          left: 7px;
          width: 5px;
          height: 10px;
          border: solid ${theme.colors.primary};
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          transition: border 0.1s;
        }

        &:after {
          animation: ${ripple} 0.2s linear forwards;
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }
  }
`
