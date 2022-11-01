import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import priceStr from 'utils/priceString'
import ArrowDown from 'assets/arrow-down.svg'
import ArrowUp from 'assets/arrow-up.svg'
import { usePrice } from 'modules/listing'
import * as Prices from 'theme/atoms/Price'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import SliderRail from './SliderRail'
import Handle from './Handle'
import Track from './Track'
import Tick from './Tick'
import useTranslations from 'hooks/useTranslations'
import * as filterEvents from '../events'

type Props = {
  recordId: string
}

export default function PriceSlider(props: Props) {
  const price = usePrice(props.recordId)
  const [expanded, setExpanded] = React.useState(false)
  const minVal =
    typeof price.data.min === 'number' ? price.data.min : price.options.min

  const maxVal =
    typeof price.data.max === 'number' ? price.data.max : price.options.max

  const t = useTranslations<'molecules-ListingFilter'>()

  const domain: number[] = [
    Math.round(price.options.min),
    Math.round(price.options.max),
  ]

  const handleOnChange = (newValues: readonly number[]) => {
    const [min, max] = newValues
    if (min !== Math.round(minVal)) price.set(min, 'min')
    if (max !== Math.round(maxVal)) price.set(max, 'max')

    if (min !== Math.round(minVal || 0) || max !== Math.round(maxVal || 1000)) {
      filterEvents.filterValueRemove(
        'price',
        `${priceStr(minVal)} - ${priceStr(maxVal)}`
      )
      filterEvents.filterValueClick(
        'price',
        `${priceStr(min)} - ${priceStr(max)}`
      )
    }
  }
  const handleClick = () => {
    !expanded && filterEvents.filterClick('price')
    setExpanded(!expanded)
  }
  return (
    <Wrapper className={'PriceSlider'} data-cy-collection="PriceSlider">
      <h4 onClick={() => handleClick()} data-cy-handle={'drawerPriceToggle'}>
        <span>{t('price_filter_headline')}</span>
        <small>
          {priceStr(price.data.min || price.options.min)} <Prices.PriceTo />{' '}
          {priceStr(price.data.max || price.options.max)}{' '}
          <span className={'netpriceNotice'}>
            <Prices.PriceExclTax />
          </span>
        </small>
        {expanded ? (
          <ArrowUp data-cy-state={'priceFilter-arrowUpShown'} />
        ) : (
          <ArrowDown data-cy-state={'priceFilter-arrowDownShown'} />
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
          <div className="hide" data-cy-state={'drawerPriceOpened'}></div>
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
                    data-cy-handle={'price-handle'}
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
