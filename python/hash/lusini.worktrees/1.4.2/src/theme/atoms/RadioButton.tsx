import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'

type Props = {
  onClick: () => void
  selected: boolean
  disabled?: boolean
  label: string
  classes?: string
  'data-cy-handle'?: string
}

export default function RadioButton(props: Props) {
  return (
    <Wrapper
      data-cy-handle={props['data-cy-handle']}
      className={'RadioButton' + props.classes}
    >
      <input
        type="radio"
        checked={props.selected}
        onChange={props.onClick}
        disabled={props.disabled}
      />
      <span className="text">{props.label}</span>
    </Wrapper>
  )
}

const Wrapper = styled.label`
  > span {
    margin-left: ${theme.spacing('xs')};
  }

  :not(.isSelectable) {
    opacity: 0.5;
  }
`
