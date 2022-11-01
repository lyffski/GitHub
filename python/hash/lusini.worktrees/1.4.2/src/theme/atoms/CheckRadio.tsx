import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import theme from 'theme'

type RadioProps = {
  variation: 'radio'
  label: string
  onClick?: () => void
  checked?: boolean
  disabled?: boolean
  notAvailable?: boolean
  required?: boolean
  radiogroup: string
  'data-cy-handle'?: string
}

type CheckProps = {
  variation: 'checkbox'
  label: string
  onClick?: () => void
  checked?: boolean
  disabled?: boolean
  required?: boolean
  notAvailable?: boolean
  'data-cy-handle'?: string
  'data-cy-handle-input'?: string
}

type Props = RadioProps | CheckProps

type WrapperProps = {
  var: 'radio' | 'checkbox'
  disabled: boolean | undefined
  notAvailable: boolean | undefined
}

export default function CheckRadio(props: Props) {
  return (
    <Wrapper
      className={'CheckRadio'}
      var={props.variation}
      disabled={props.disabled}
      notAvailable={props.notAvailable}
      data-cy-handle={props['data-cy-handle']}
    >
      {props.label}
      <input
        data-cy-handle={props['data-cy-handle-input']}
        type={props.variation}
        name={props.variation === 'radio' ? props.radiogroup : props.label}
        disabled={props.disabled}
        checked={props.checked}
        required={props.required}
        value={props.label}
        onChange={() => {
          props.onClick && props.onClick()
        }}
      />
      <span className={'box'} />
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
  ${(p: WrapperProps) =>
    (p.disabled || p.notAvailable) && `color: ${theme.colors.shade.b5}`};
  display: block;
  position: relative;
  padding-left: ${theme.spacing('ml')};
  user-select: none;
  cursor: ${(p: WrapperProps) => (p.disabled ? 'not-allowed' : 'pointer')};

  /* Der input wird unsichtbar gemacht, die .box ersetzt diese */
  > .box {
    position: absolute;
    left: 0;
    top: 0;
    width: 1.25rem;
    height: 1.25rem;
    background: #fff;
    border: 1px solid ${theme.colors.shade.b4};
    border-radius: ${(p: WrapperProps) =>
      p.var === 'radio' ? `50%` : `${theme._rounding.s}px`};

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

    &:checked {
      + .box {
        border-color: ${theme.colors.primary};

        &:before {
          ${(p: WrapperProps) =>
            p.var === 'checkbox' &&
            `
            top: 3px;
            left: 7px;
            width: 5px;
            height: 10px;
            border: solid ${theme.colors.primary};
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            transition: border 0.1s;
          `}
          ${(p: WrapperProps) =>
            p.var === 'radio' &&
            `
            top: 0.375rem;
            left: 0.375rem;
            width: .5rem;
            height: .5rem;
            border-radius: 50%;
            background-color: ${theme.colors.primary};
            transition: background 0.3s;
          `}
        }

        &:after {
          animation: ${ripple} 0.2s linear forwards;
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }

    &:disabled {
      + .box {
        border-color: ${theme.colors.shade.b5};
      }
      &:checked {
        + .box:before {
          ${(p: WrapperProps) =>
            p.var === 'radio' &&
            `
              background-color: ${theme.colors.shade.b5};
          `}
          ${(p: WrapperProps) =>
            p.var === 'checkbox' &&
            `
              border-color: ${theme.colors.shade.b5};
          `}
        }
      }
    }
  }
`
