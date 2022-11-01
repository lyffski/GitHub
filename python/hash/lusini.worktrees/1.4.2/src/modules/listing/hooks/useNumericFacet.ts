import * as t from '../types'
import * as a from '../actions'
import * as s from '../selectors'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

type Input = {
  recordId: string
  filterKey: string
}

type Output = {
  data: t.NumericFacet
  set: (n: number, type: 'min' | 'max') => a.SetFacetRange
}

type DP = {
  set: typeof a.setFacetRange
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'listing',
  name: 'listing/useNumericFacet',
  createCacheKey: (input) => input.recordId + input.filterKey,
  mapState: (state, input) => ({
    data: s.getNumericFacet(state, input.recordId, input.filterKey),
  }),
  mapDispatch: {
    set: a.setFacetRange,
  },
  transformDispatch: {
    set: (fn, sp, input) => (n, type) =>
      fn(input.recordId, input.filterKey, n, type),
  },
}

export default function useNumericFacet(
  recordId: string,
  filterKey: string
): Output {
  const input: Input = { recordId, filterKey }
  const hook: Output = useConnect(input, config)
  return hook
}
