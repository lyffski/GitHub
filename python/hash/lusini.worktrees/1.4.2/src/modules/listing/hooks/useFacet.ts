import * as t from '../types'
import * as a from '../actions'
import * as s from '../selectors'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

type Input = {
  recordId: string
  facetKey: string
}

type Output = {
  data: t.Facet
  toggle: (value: string) => a.ToggleFacet
}

type DP = {
  toggle: typeof a.toggleFacet
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'listing',
  name: 'listing/useFacet',
  createCacheKey: (input) => `${input.facetKey}:${input.recordId}`,
  mapState: (state, input) => ({
    data: s.getFacet(state, input.recordId, input.facetKey),
  }),
  mapDispatch: {
    toggle: a.toggleFacet,
  },
  transformDispatch: {
    toggle: (fn, sp, input) => (value) =>
      fn(input.recordId, input.facetKey, value),
  },
}

export default function useFacet(recordId: string, facetKey: string): Output {
  const input: Input = { recordId, facetKey }
  const hook: Output = useConnect(input, config)
  return hook
}
