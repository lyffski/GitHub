import * as React from 'react'
import styled from 'styled-components'
import ArrowDown from 'assets/arrow-down.svg'
import ArrowUp from 'assets/arrow-up.svg'
import theme from 'theme'
import { useFacet } from 'modules/listing'
import CheckRadio from 'theme/atoms/CheckRadio'
import * as filterEvents from '../events'

type Props = {
  recordId: string
  filterKey: string
  expanded: boolean
}

export default function CheckFilter(props: Props) {
  const facet = useFacet(props.recordId, props.filterKey)
  const [expanded, setExpanded] = React.useState(props.expanded)

  if (facet.data.options.length <= 1) return null

  const handleClick = () => {
    !expanded && filterEvents.filterClick(facet.data.key)
    setExpanded(!expanded)
  }
  const handleFilterClick = (label: string) => {
    facet.data.value.includes(label)
      ? filterEvents.filterValueRemove(facet.data.key, label)
      : filterEvents.filterValueClick(facet.data.key, label)
    facet.toggle(label)
  }

  return (
    <Wrapper className="CheckFilter" data-cy-collection="CheckFilter">
      <h4 onClick={() => handleClick()} data-cy-handle={'headline'}>
        <span data-cy-state="filter-label">
          {facet.data.label +
            ' ' +
            (facet.data.unit ? '(' + facet.data.unit + ')' : '')}
        </span>
        <small>{facet.data.value.join(', ')}</small>
        <div>
          {expanded ? (
            <ArrowUp data-cy-state={'arrow-up-shown'} />
          ) : (
            <ArrowDown data-cy-state={'arrow-down-shown'} />
          )}
        </div>
      </h4>
      {expanded && (
        <ul data-cy-state={'expanded'}>
          {facet.data.options.map((opt) => (
            <li key={opt.label}>
              <CheckRadio
                variation="checkbox"
                label={opt.label}
                checked={facet.data.value.includes(opt.label)}
                onClick={() => handleFilterClick(opt.label)}
                data-cy-handle={'checkbox'}
                data-cy-handle-input={'input'}
              />
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-bottom: ${theme.spacing('m')};
  border-bottom: 1px solid ${theme.colors.shade.b5};
  cursor: pointer;

  > h4 {
    ${theme.ty('rc-xl')}
    display: flex;
    align-items: center;
    > small {
      flex: 1;
      ${theme.ty('rc-base')}
      color: ${theme.colors.shade.b3};
      margin: 0 ${theme.spacing('s')};
      align-self: flex-end;
      margin-bottom: -1px;
    }
    > svg {
      height: 10px;
      path {
        fill: ${theme.colors.shade.b3};
      }
    }
  }

  > ul {
    margin-top: ${theme.spacing('s')};
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${theme.spacing('s')};
  }
`
