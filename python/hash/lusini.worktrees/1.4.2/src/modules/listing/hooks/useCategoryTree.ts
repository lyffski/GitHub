import { State } from '../reducer'
import * as s from '../selectors'
import * as a from '../actions'
import useConnect, { Config } from 'hooks/useConnect'

type Input = {
  recordId: string
}

type Output = {
  data: ReturnType<typeof s.getCategoryTree>
  setCategory: (path: string) => a.SetCategory
}

type DP = {
  setCategory: typeof a.setCategory
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'listing',
  name: 'listing/useCategoryTree',
  createCacheKey: (input) => input.recordId,
  mapState: (state, input) => ({
    data: s.getCategoryTree(state, input.recordId),
  }),
  mapDispatch: {
    setCategory: a.setCategory,
  },
  transformDispatch: {
    setCategory: (fn, sp, input) => (path) => fn(input.recordId, path),
  },
}

/** @firescoutMockFn listing.useCategoryTree */
export default function useCategoryTree(recordId: string): Output {
  const input = { recordId }
  const hook: Output = useConnect(input, config)
  return hook
}
