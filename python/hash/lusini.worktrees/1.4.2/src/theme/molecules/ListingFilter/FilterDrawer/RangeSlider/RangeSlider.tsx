import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import ArrowDown from 'assets/arrow-down.svg'
import ArrowUp from 'assets/arrow-up.svg'
import { useNumericFacet } from 'modules/listing'
import * as Prices from 'theme/atoms/Price'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import SliderRail from './SliderRail'
import Handle from './Handle'
import Track from './Track'
import Tick from './Tick'
import * as filterEvents from '../events'

type Props = {
  recordId: string
  filterKey: string
  expanded: boolean
}

export default function RangeSlider(props: Props) {
  const facet = useNumericFacet(props.recordId, props.filterKey)
  const [expanded, setExpanded] = React.useState(props.expanded)
  const minVal =
    typeof facet.data.value.min === 'number'
      ? facet.data.value.min
      : facet.data.options.min || 0

  const maxVal =
    typeof facet.data.value.max === 'number'
      ? facet.data.value.max
      : facet.data.options.max || 1000

  const domain: number[] = [
    facet.data.options.min || 0,
    facet.data.options.max || 1000,
  ]

  if (domain[0] === domain[1]) return null

  const handleOnChange = (newValues: readonly number[]) => {
    const [min, max] = newValues

    if (
      minVal !== Math.round(facet.data.options.min || 0) ||
      maxVal !== Math.round(facet.data.options.max || 1000)
    ) {
      filterEvents.filterValueRemove(
        facet.data.key,
        `${Math.round(minVal)}${facet.data.unit} - ${Math.round(maxVal)}${
          facet.data.unit
        }`
      )
    }
    if (min !== Math.round(minVal)) facet.set(min, 'min')
    if (max !== Math.round(maxVal)) facet.set(max, 'max')
    filterEvents.filterValueClick(
      facet.data.key,
      `${min}${facet.data.unit} - ${max}${facet.data.unit}`
    )
  }

  const toUnit = (n: number) => n.toLocaleString() + ' ' + facet.data.unit
  const handleClick = () => {
    !expanded && filterEvents.filterClick(facet.data.key)
    setExpanded(!expanded)
  }

  return (
    <Wrapper className={'RangeSlider'} data-cy-collection="RangeSlider">
      <h4 onClick={() => handleClick()} data-cy-handle={'drawerRangeToggle'}>
        <span>{facet.data.label}</span>
        <small>
          {toUnit(facet.data.value.min || facet.data.options.min || 0)}{' '}
          <Prices.PriceTo />{' '}
          {toUnit(facet.data.value.max || facet.data.options.max || 100)}{' '}
        </small>
        {expanded ? (
          <ArrowUp data-cy-state={'rangeFilter-arrowUpShown'} />
        ) : (
          <ArrowDown data-cy-state={'rangeFilter-arrowDownShown'} />
        )}
      </h4>
      {expanded && (
        // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
        <Slider
          mode={3}
          step={1}
          domain={domain}
          className={'slider'}
          onChange={(val) => handleOnChange(val)}
          values={[minVal, maxVal]}
        >
          <div className="hide" data-cy-state={'drawerRangeOpened'}></div>
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                    data-cy-handle={'range-handle'}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={5}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map((tick) => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
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
    margin-top: ${theme.spacing('m')};
    display: flex;
    align-items: center;
    > small {
      flex: 1;
      ${theme.ty('rc-base')}
      color: ${theme.colors.shade.b3};
      margin: 0 ${theme.spacing('s')};
      align-self: flex-end;
      margin-bottom: -1px;

      > .netpriceNotice {
        margin-left: ${theme.spacing('xs')};
        ${theme.ty('rc-s')}
      }
    }
    > svg {
      height: 10px;
      path {
        fill: ${theme.colors.shade.b3};
      }
    }
  }

  > .slider {
    ${theme.ty('rc-base')}
    margin: ${theme.spacing('l')} ${theme.spacing('xs')};
    position: relative;
    height: 1rem;
    > .hide {
      display: none;
    }
  }
`
