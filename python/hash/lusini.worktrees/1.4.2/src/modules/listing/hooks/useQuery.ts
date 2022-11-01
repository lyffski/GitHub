import * as a from '../actions'
import * as s from '../selectors'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

type Input = { recordId: string }

type Output = {
  data: string
  set: (query: string) => a.SetQuery
}

type DP = {
  set: typeof a.setQuery
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'listing',
  name: 'listing/useQuery',
  createCacheKey: (input) => input.recordId,
  mapState: (state, input) => ({
    data: s.getQuery(state, input.recordId),
  }),
  mapDispatch: { set: a.setQuery },
  transformDispatch: {
    set: (fn, sp, input) => (query) => fn(input.recordId, query),
  },
}

export default function useQuery(recordId: string): Output {
  const input: Input = { recordId }
  const hook: Output = useConnect(input, config)
  return hook
}
