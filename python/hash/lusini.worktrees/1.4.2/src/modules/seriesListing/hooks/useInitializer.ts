import * as React from 'react'
import * as t from '../types'
import * as a from '../actions'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

type Input = {
  recordId: string
  filterValues: Partial<t.FilterValues>
}

type Output = {
  _init: (filterValues: Partial<t.FilterValues>) => a.Init
}

type DP = {
  _init: typeof a.init
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'seriesListing',
  name: 'seriesListing/useInitializer',
  createCacheKey: (input) => input.recordId,
  mapState: () => ({}),
  mapDispatch: {
    _init: a.init,
  },
  transformDispatch: {
    _init: (fn, sp, input) => (filterValues) =>
      fn(input.recordId, filterValues),
  },
}

export default function useInitializer(
  recordId: string,
  filterValues: Partial<t.FilterValues>
): Output {
  const input: Input = { recordId, filterValues }
  const hook: Output = useConnect(input, config)

  React.useEffect(() => {
    hook._init(filterValues)
  }, [recordId, filterValues])

  return hook
}
