import * as React from 'react'
import * as t from '../types'
import * as a from '../actions'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

type Input = {
  recordId: string
  filterValues: Partial<t.FilterValues>
  attributes: { key: string; label: string; filtertype: string }[]
}

type Output = {
  _init: (
    filterValues: Partial<t.FilterValues>,
    attributes: { key: string; label: string; filtertype: string }[]
  ) => a.Init
}

type DP = {
  _init: typeof a.init
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'listing',
  name: 'listing/useInitializer',
  createCacheKey: (input) => input.recordId,
  mapState: () => ({}),
  mapDispatch: {
    _init: a.init,
  },
  transformDispatch: {
    _init: (fn, sp, input) => (filterValues, attributes) =>
      fn(input.recordId, filterValues, attributes),
  },
}

export default function useInitializer(
  recordId: string,
  filterValues: Partial<t.FilterValues>,
  attributes: { key: string; label: string; filtertype: string }[]
): Output {
  const input: Input = { recordId, filterValues, attributes }
  const hook: Output = useConnect(input, config)

  React.useEffect(() => {
    hook._init(filterValues, attributes)
  }, [recordId, filterValues, attributes])

  return hook
}
