import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import Link from 'theme/atoms/Link'
import ArrowRight from 'assets/arrow-right.svg'
import { ms } from 'modules/browser/const'
import Container from 'theme/atoms/Container'

export type Crumb = {
  label: string
  link?: string
}

type Props = {
  breadcrumbs: Crumb[]
  isFetching: boolean
}

export default function Breadcrumbs(props: Props) {
  return (
    <Container>
      <Wrapper className="Breadcrumbs" isFetching={props.isFetching}>
        {props.breadcrumbs.map((crumb, i) => (
          <div className="crumb-container" key={i}>
            {/*eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state*/}
            {i !== 0 && <ArrowRight />}
            <Link className="crumb" to={crumb.link}>
              {crumb.label}
            </Link>
          </div>
        ))}
      </Wrapper>
    </Container>
  )
}

const Wrapper = styled.div<{ isFetching: boolean }>`
  ${(props) =>
    props.isFetching &&
    `
      * {
          color: transparent !important;
          text-shadow: 0 0 0.9375rem rgba(0,0,0,0.5) !important;
      }
  `}

  margin: ${theme.spacing('s')} 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  > div.crumb-container {
    > a.crumb,
    > span.crumb {
      padding-right: ${theme.spacing('xs')};
      color: ${theme.colors.shade.b2};
      ${theme._ty([13, 0, 18], theme.fontSpecial, '400')}
      @media (min-width: ${ms.MD}px) {
        ${theme._ty([16, 0.4, 19], theme.fontSpecial, '400')}
      }
      text-decoration: none;
    }
    > span.crumb {
      font-weight: bold;
    }
    > a.crumb:hover {
      text-decoration: underline;
    }
    > svg {
      padding-right: ${theme.spacing('xs')};
      width: 0.25rem;
      @media (min-width: ${ms.MD}px) {
        width: 0.3125rem;
      }
    }
  }
`
