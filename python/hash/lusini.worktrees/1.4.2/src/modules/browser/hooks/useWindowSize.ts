import * as a from '../actions'
import * as t from '../types'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

// eslint-disable-next-line @typescript-eslint/ban-types
export type Input = {}

export type Output = {
  data: t.WindowSize
  setSize: typeof a.setWindowSize
}

const config: Config<Input, Output, State, Record<string, unknown>> = {
  moduleKey: 'browser',
  name: 'browser/useWindowSize',
  createCacheKey: () => '',
  mapState: (state) => ({
    data: state.windowSize,
  }),
  mapDispatch: {
    setSize: a.setWindowSize,
  },
}

export default function useWindowSize(): Output {
  const input: Input = {}
  const hook: Output = useConnect(input, config)
  return hook
}
