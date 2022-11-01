import * as React from 'react'
import useConnect, { Config } from 'hooks/useConnect'
import { State } from '../reducer'
import * as a from '../actions'

type Input = {
  objectID: string
}

type Output = {
  _init: typeof a.init
  _clear: typeof a.clear
}

const config: Config<Input, Output, State, Record<string, unknown>> = {
  moduleKey: 'seriesDetail',
  name: 'seriesDetail/useInit',
  createCacheKey: () => '',
  mapState: () => ({}),
  mapDispatch: {
    _init: a.init,
    _clear: a.clear,
  },
}

export default function useInit(objectID: string): Output {
  const input: Input = { objectID }
  const hook: Output = useConnect(input, config)

  React.useEffect(() => {
    hook._init(objectID)
    return () => {
      hook._clear()
    }
  }, [objectID])

  return hook
}
