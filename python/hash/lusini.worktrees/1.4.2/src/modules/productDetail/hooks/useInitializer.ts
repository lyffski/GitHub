import * as React from 'react'
import * as t from '../types'
import useConnect, { Config } from 'hooks/useConnect'
import { State } from '../reducer'
import * as a from '../actions'

type Input = {
  filterValues: Partial<t.FilterValues> & {
    containerID: string
  }
}

type Output = {
  _init: typeof a.init
  _clear: typeof a.clear
}

const config: Config<Input, Output, State, Record<string, unknown>> = {
  moduleKey: 'productDetail',
  name: 'productDetail/useInit',
  createCacheKey: () => '',
  mapState: () => ({}),
  mapDispatch: {
    _init: a.init,
    _clear: a.clear,
  },
}

export default function useInit(
  filterValues: Partial<t.FilterValues> & {
    containerID: string
  },
  clearOnUnmount: boolean
): Output {
  const input: Input = { filterValues }
  const hook: Output = useConnect(input, config)

  React.useEffect(() => {
    hook._init(filterValues)
  }, [filterValues])

  // TODO: why error?
  // @ts-ignore
  React.useEffect(() => {
    if (clearOnUnmount) {
      return () => hook._clear()
    }
  }, [])

  return hook
}
