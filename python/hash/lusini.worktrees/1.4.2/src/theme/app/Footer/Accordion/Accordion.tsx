import * as React from 'react'
import styled from 'styled-components'
import ArrowDown from 'assets/arrow-down.svg'
import ArrowUp from 'assets/arrow-up.svg'
import theme from 'theme'

type Props = {
  label: string
  children: any
  'data-cy-handle': string
  'data-cy-state': string
}

export default function Accordion(props: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Wrapper className="Accordion">
      <button
        className="label"
        onClick={() => setOpen(!open)}
        data-cy-handle={props['data-cy-handle']}
      >
        {/* eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state*/}
        {props.label && <span>{props.label}</span>}
        {open ? (
          <ArrowUp data-cy-state={props['data-cy-state']} />
        ) : (
          <ArrowDown />
        )}
      </button>
      {props.children && open && (
        <div data-cy-state={props['data-cy-state']}>{props.children}</div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-bottom: 1px solid ${theme.colors.shade.b5};

  > .label {
    padding: ${theme.spacing('s')} 0;
    ${theme._ty([13, 0, 18], theme.font, '700')}
  }

  &:last-child {
    border-bottom: 1px solid ${theme.colors.shade.b5};
  }

  > button {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    svg {
      margin-right: ${theme.spacing('s')};
      width: 0.625rem;
      height: 0.625rem;
    }
  }
`
