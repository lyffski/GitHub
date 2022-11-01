import * as React from 'react'
import styled from 'styled-components'
import CheckRadio from 'theme/atoms/CheckRadio'

type Props = {
  label: string
  options: string[]
  type: 'radio' | 'checkbox'
  required?: boolean
  'data-cy-handle'?: string
}

export default function CheckRadioGroup(props: Props) {
  const checkboxRef = React.useRef<HTMLInputElement>(null)

  return (
    <Wrapper ref={checkboxRef} className="CheckRadioGroup">
      {props.label && (
        <label className="title" data-cy-state>
          {props.label}
        </label>
      )}
      {props.options.map((option) => (
        <div key={option} className="checkRadioOption">
          {props.type == 'checkbox' && (
            <CheckRadio
              data-cy-state
              data-cy-handle={props['data-cy-handle']}
              variation={'checkbox'}
              label={option}
              required={props.required}
              onClick={() => {
                checkboxRef.current?.classList.remove('error')
              }}
            />
          )}
          {props.type == 'radio' && (
            <CheckRadio
              data-cy-state
              data-cy-handle={props['data-cy-handle']}
              variation={'radio'}
              label={option}
              required={props.required}
              radiogroup={props.label}
              onClick={() => {
                checkboxRef.current?.classList.remove('error')
              }}
            />
          )}
        </div>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .checkRadioOption {
    margin-bottom: 0.5rem;
  }
`
