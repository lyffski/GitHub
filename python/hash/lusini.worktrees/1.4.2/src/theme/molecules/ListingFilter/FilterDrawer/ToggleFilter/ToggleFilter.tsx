import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { useFacet } from 'modules/listing'
import Toggle from 'theme/atoms/Toggle'
import * as filterEvents from '../events'

type Props = {
  recordId: string
  filterKey: string
}

export default function ToggleFilter(props: Props) {
  const facet = useFacet(props.recordId, props.filterKey)

  if (facet.data.options.length <= 1) return null

  const handleClick = () => {
    facet.toggle('true')

    facet.data.value.includes('true')
      ? filterEvents.filterValueRemove(
          facet.data.key,
          (!facet.data.value.includes('true')).toString()
        )
      : filterEvents.filterValueClick(
          facet.data.key,
          (!facet.data.value.includes('true')).toString()
        )
  }
  return (
    <Wrapper className="ToggleFilter" data-cy-collection="ToggleFilter">
      <h4>
        <span data-cy-state="filter-label">{facet.data.label}</span>
        <small />
        <Toggle
          data-cy-handle-input={'toggle-input'}
          checked={facet.data.value.includes('true')}
          onClick={() => handleClick()}
          data-cy-handle={'toggle-checkbox'}
        />
      </h4>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 1.25rem;
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
  }
`
