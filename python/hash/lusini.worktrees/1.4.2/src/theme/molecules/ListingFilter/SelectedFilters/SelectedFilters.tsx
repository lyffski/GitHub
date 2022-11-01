import React from 'react'
import styled from 'styled-components'
import { useFilterValues, useAttributes } from 'modules/listing'
import theme from 'theme'
import MenuClose from 'assets/menu-close.svg'
import useTranslations from 'hooks/useTranslations'
import * as filterEvents from '../FilterDrawer/events'
import priceStr from 'utils/priceString'

type Props = {
  recordId: string
}

type SelectedFilter = {
  key: string
  value: string
  label?: string
  isNumeric?: boolean
}

export default function SelectedFilters(props: Props) {
  const filterValues = useFilterValues(props.recordId)
  const attributes = useAttributes(props.recordId)
  const { minPrice, maxPrice } = filterValues.data
  const t = useTranslations<'molecules-ListingFilter'>()

  const selectedFilters = React.useMemo(() => {
    const keyToUnit: Record<string, string> = {}
    const selectedFilters: SelectedFilter[] = []

    for (const f of attributes.data) {
      keyToUnit[f.key] = f.unit || ''
    }

    for (const attr in filterValues.data.attributes) {
      for (const value of filterValues.data.attributes[attr]) {
        const result: SelectedFilter = { key: attr, value }
        const type = filterValues.filterInfo[attr].type
        if (type === 'toggle')
          result.label = filterValues.filterInfo[attr].label
        selectedFilters.push(result)
      }
    }

    for (const attr in filterValues.data.numericAttributes) {
      const value = filterValues.data.numericAttributes[attr]
      if (!value.min && !value.max) continue
      let label = ''
      const min = (value.min || 0).toLocaleString()
      const max = (value.max || 0).toLocaleString()
      if (value.min && value.max)
        label = `${min} ${keyToUnit[attr]} - ${max} ${keyToUnit[attr]}`
      else if (value.min)
        label = t('from_unit_selected_filters', {
          unit: `${min} ${keyToUnit[attr]}`,
        })
      else if (value.max)
        label = t('to_unit_selected_filters', {
          unit: `${max} ${keyToUnit[attr]}`,
        })
      const result: SelectedFilter = {
        key: attr,
        value: label,
        isNumeric: true,
      }
      selectedFilters.push(result)
    }

    if (minPrice && maxPrice) {
      selectedFilters.push({
        key: 'price',
        value: `${priceStr(minPrice)} - ${priceStr(maxPrice)}`,
      })
    } else if (minPrice) {
      selectedFilters.push({
        key: 'price',
        value: t('from_unit_selected_filters', { unit: priceStr(minPrice) }),
      })
    } else if (maxPrice) {
      selectedFilters.push({
        key: 'price',
        value: t('to_unit_selected_filters', { unit: priceStr(maxPrice) }),
      })
    }

    return selectedFilters
  }, [filterValues.data, filterValues.filterInfo, attributes.data])

  const handleClick = (filter: SelectedFilter) => {
    filterEvents.filterValueRemove(filter.key, filter.value)
    if (filter.key === 'price') {
      filterValues.set('minPrice', null)
      filterValues.set('maxPrice', null)
      return
    }
    if (filter.isNumeric) {
      filterValues.setNumericAttribute(filter.key, 'max', null)
      filterValues.setNumericAttribute(filter.key, 'min', null)
      return
    }
    filterValues.setAttribute(
      filter.key,
      filterValues.data.attributes[filter.key].filter((s) => s !== filter.value)
    )
  }

  const hasSelectedFilters = selectedFilters.length > 0
  const handleResetClick = () => {
    filterValues.clear()
    filterEvents.filterReset()
  }

  if (!hasSelectedFilters) return null

  return (
    <Wrapper className="SelectedFilters" data-cy-state="has-selected-filters">
      {selectedFilters.map((f) => (
        <button
          key={`${f.key}:${f.value}`}
          onClick={() => handleClick(f)}
          data-cy-handle="selected-filter-chip"
        >
          {f.label || f.value} <MenuClose />
        </button>
      ))}

      <button
        onClick={() => handleResetClick()}
        data-cy-handle="reset-all-filters"
      >
        {t('reset_selected_filters_btn')}
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -${theme.spacing('xs')}; /** remove margin from last row */

  > button {
    ${theme.ty('rc-s', 'bold')}
    color: ${theme.colors.primary};
    padding: ${theme.spacing('xxs')} ${theme.spacing('s')};
    padding-right: ${theme.spacing('xs')};
    ${theme.rounding('m')};
    border: 1px solid ${theme.colors.primary};
    margin-right: ${theme.spacing('xs')};
    margin-bottom: ${theme.spacing('xs')};
    display: flex;
    align-items: center;
    justify-content: center;

    > svg {
      margin-left: 10px;
      max-width: 8px;
      g {
        stroke: ${theme.colors.primary};
      }
    }
  }
`
