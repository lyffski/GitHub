// import * as t from '../types'
import * as a from '../actions'
import * as s from '../selectors'
import * as t from '../types'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

type Input = {
  recordId: string
}

type Output = {
  data: t.Page
  options: number[]
  set: (page: number) => a.SetPage
}

type DP = {
  set: typeof a.setPage
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'listing',
  name: 'listing/usePage',
  createCacheKey: (input) => input.recordId,
  mapState: (state, input) => s.getPage(state, input.recordId),
  mapDispatch: {
    set: a.setPage,
  },
  transformDispatch: {
    set: (fn, sp, input) => (page) => fn(input.recordId, page),
  },
}

export default function usePage(recordId: string): Output {
  const input: Input = { recordId }
  const hook: Output = useConnect(input, config)
  return hook
}
