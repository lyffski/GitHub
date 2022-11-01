import * as t from '../types'
import * as s from '../selectors'
import * as a from '../actions'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

type Input = {
  recordId: string
}

type Output = {
  data: t.Index
  setIndex: (index: t.Index) => a.SetIndex
}

type DP = {
  setIndex: typeof a.setIndex
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'listing',
  name: 'listing/useIndex',
  createCacheKey: (input) => input.recordId,
  mapState: (state, input) => ({
    data: s.getIndex(state, input.recordId),
  }),
  mapDispatch: {
    setIndex: a.setIndex,
  },
  transformDispatch: {
    setIndex: (fn, sp, input) => (index) => fn(input.recordId, index),
  },
}

export default function useIndex(recordId: string): Output {
  const input: Input = { recordId }
  const hook: Output = useConnect(input, config)
  return hook
}
