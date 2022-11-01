import * as React from 'react'
import styled, { css } from 'styled-components'
import { useFacet } from 'modules/listing'
import colorMap from 'utils/colorMap'
import ArrowDown from 'assets/arrow-down.svg'
import ArrowUp from 'assets/arrow-up.svg'
import theme from 'theme'
import * as filterEvents from '../events'
type Props = {
  recordId: string
  expanded: boolean
}

export default function ColorFilter(props: Props) {
  const [expanded, setExpanded] = React.useState(props.expanded)
  const facet = useFacet(props.recordId, 'COLORSPACE')

  // remove all colors that are not in colorMap
  const filteredColors = React.useMemo(() => {
    return facet.data.options.filter((opt) => opt.label in colorMap)
  }, [facet.data.options])

  if (filteredColors.length <= 1) return null
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
    <Wrapper className="ColorFilter">
      <h4 onClick={() => handleClick()} data-cy-handle={'drawerColorToggle'}>
        <span>{facet.data.label}</span>
        <small>{facet.data.value.join(', ')}</small>
        {expanded ? (
          <ArrowUp data-cy-state={'colorFilter-arrowUpShown'} />
        ) : (
          <ArrowDown data-cy-state={'colorFilter-arrowDownShown'} />
        )}
      </h4>
      {expanded && (
        <ul data-cy-state={'drawerColorOpened'}>
          {filteredColors.map((opt) => (
            <Color
              key={opt.label}
              svg={colorMap[opt.label].svg}
              data-cy-handle="drawerColoroption"
              data-cy-state={
                facet.data.value.includes(opt.label) && 'colorSelected'
              }
              selected={facet.data.value.includes(opt.label)}
              borderColor={colorMap[opt.label].borderColor}
              onClick={() => handleFilterClick(opt.label)}
            />
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
    margin-top: ${theme.spacing('m')};
    display: flex;
    flex-wrap: wrap;
  }
`

type ColorProps = {
  svg: string
  borderColor: string
  selected: boolean
}

const Color = styled.li.attrs<ColorProps>((p) => ({
  style: {
    backgroundImage: `url(${p.svg})`,
    backgroundSize: `cover`,
    border: `1px solid ${p.selected ? theme.colors.primary : p.borderColor}`,
  },
}))`
  ${theme.rounding('m')}
  width: 30px;
  height: 30px;
  margin-right: ${theme.spacing('m')};
  margin-bottom: ${theme.spacing('m')};
  position: relative;

  ${(p: ColorProps) =>
    p.selected &&
    css`
      &:after {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${theme.colors.primary};
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `}
`
