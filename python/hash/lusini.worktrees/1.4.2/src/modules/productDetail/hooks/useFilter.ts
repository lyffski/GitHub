import * as t from '../types'
import * as a from '../actions'
import * as s from '../selectors'
import useConnect, { Config } from 'hooks/useConnect'
import { State } from '../reducer'

type Input = {
  filterKey: t.FilterKey
}

type Output = {
  data: t.Filter
  setValue: (value: string) => a.SetFilterValue
  highlight: boolean
}

type DP = {
  setValue: typeof a.setFilterValue
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'productDetail',
  name: 'productDetail/useFilter',
  createCacheKey: (input) => input.filterKey,
  mapState: (state, input) => {
    const filter = s.getFilter(state, input.filterKey)
    return {
      data: filter,
      highlight: !filter.value && filter.options.length > 1,
    }
  },
  mapDispatch: {
    setValue: a.setFilterValue,
  },
  transformDispatch: {
    setValue: (fn, state, input) => (value) => fn(input.filterKey, value),
  },
}

/** @firescoutMockFn productDetail.useFilter */
export default function useFilter(filterKey: t.FilterKey): Output {
  const input: Input = { filterKey }
  const hook: Output = useConnect(input, config)
  return hook
}
