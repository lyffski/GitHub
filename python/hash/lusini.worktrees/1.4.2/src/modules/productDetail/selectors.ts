import * as t from './types'
import { State } from './reducer'
import createReSelector from 're-reselect'
import { createSelector } from 'reselect'
import calculateFilterOptions from './utils/calculateFilterOptions'
import { dummyVariant } from './const'

export const getVariants = (state: State) => state.data

export const getFilteredVariants = createSelector(
  (state: State) => state.data,
  (state: State) => state.filterValues,
  (variants, filterValues) => {
    const { color, size, variant, style } = filterValues
    return (
      variants.filter((product) => {
        if (product.variantData.color.label && color) {
          if (product.variantData.color.label !== color) return false
        }

        if (product.variantData.size.label && size) {
          if (product.variantData.size.label !== size) return false
        }

        if (product.variantData.style.label && style) {
          if (product.variantData.style.label !== style) return false
        }

        if (product.variantData.variant.label && variant) {
          if (product.variantData.variant.label !== variant) return false
        }

        return true
      }) || null
    )
  }
)

export const getDisplayVariant = (state: State) =>
  getFilteredVariants(state)[0] || dummyVariant

export const getFilterOptions = createReSelector(
  (state: State) => state.data,
  (state: State, filterKey: t.FilterKey) => filterKey,
  (state: State) => state.filterValues,
  (variants, filterKey, filterValues): t.FilterOption[] => {
    return calculateFilterOptions(variants, filterValues, filterKey)
  }
)((_, filterKey: t.FilterKey) => filterKey)

export const getFilter = createReSelector(
  (state: State, filterKey: t.FilterKey) => getFilterOptions(state, filterKey),
  (state: State, filterKey: t.FilterKey) => filterKey,
  (state: State, filterKey: t.FilterKey) => state.filterValues[filterKey],
  (options, key, value): t.Filter => ({
    options,
    key,
    value,
  })
)((_, filterKey: t.FilterKey) => filterKey)

export const isFetching = (state: State) => state.isFetching
