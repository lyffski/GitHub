import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import Factor from 'assets/factor.svg'

const usps = [
  'Höchste Qualität für Profis',
  'Sicher bezahlen auf Rechnung oder mit PayPal',
  'Kostenlose Retoure innerhalb von 14 Tagen',
]

export default function StaticUsps() {
  return (
    <Wrapper className="StaticUsps">
      {usps.map((val) => (
        <li key={val}>
          <Factor />
          {val}
        </li>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  > li {
    margin-bottom: ${theme.spacing('s')};
    &:last-child {
      margin-bottom: 0;
    }
    display: flex;
    align-items: center;
    > svg {
      margin-right: 0.75rem;
      min-width: 1rem;
    }
  }
`
