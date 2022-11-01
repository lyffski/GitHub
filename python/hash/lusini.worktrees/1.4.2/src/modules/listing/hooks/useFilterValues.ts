import * as t from '../types'
import * as a from '../actions'
import * as s from '../selectors'
import useConnect, { Config } from 'hooks/useConnect'
import { State } from '../reducer'

type Input = {
  recordId: string
}

type Output = {
  data: t.FilterValues
  filterInfo: ReturnType<typeof s.getFilterInfoDict>
  set: (
    key: keyof t.FilterValues,
    value: ValueOf<t.FilterValues>
  ) => a.SetFilterValue
  setAttribute: (key: string, value: string[]) => a.SetAttribute
  setNumericAttribute: (
    key: string,
    type: 'min' | 'max',
    value: number | null
  ) => a.SetFacetRange
  clear: () => a.ResetFilterValues
}

type DP = {
  set: typeof a.setFilterValue
  setAttribute: typeof a.setAttribute
  clear: typeof a.resetFilterValues
  setNumericAttribute: typeof a.setFacetRange
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'listing',
  name: 'listing/useFilterValues',
  createCacheKey: (input) => input.recordId,
  mapState: (state, input) => {
    return {
      data: s.getFilterValues(state, input.recordId),
      filterInfo: s.getFilterInfoDict(state, input.recordId),
    }
  },
  mapDispatch: {
    set: a.setFilterValue,
    clear: a.resetFilterValues,
    setAttribute: a.setAttribute,
    setNumericAttribute: a.setFacetRange,
  },
  transformDispatch: {
    set: (fn, sp, input) => (key, value) => fn(input.recordId, key, value),
    clear: (fn, sp, input) => () => fn(input.recordId),
    setAttribute: (fn, sp, input) => (key, value) =>
      fn(input.recordId, key, value),
    setNumericAttribute: (fn, sp, input) => (key, type, value) =>
      fn(input.recordId, key, value ? value : 0, type),
  },
}

export default function useFilterValues(recordId: string): Output {
  const input: Input = { recordId }
  const hook: Output = useConnect(input, config)
  return hook
}
