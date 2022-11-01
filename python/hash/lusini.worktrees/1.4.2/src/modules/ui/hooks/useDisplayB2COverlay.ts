import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'
import * as a from '../actions'

// eslint-disable-next-line @typescript-eslint/ban-types
export type Input = {}

export type Output = {
  data: boolean
  hideOverlay: () => void
}

const config: Config<Input, Output, State, Record<string, unknown>> = {
  moduleKey: 'ui',
  name: 'ui/useDisplayB2COverlay',
  createCacheKey: () => '',
  mapState: (state) => ({ data: state.showB2COverlay }),
  mapDispatch: { hideOverlay: a.hideOverlay },
}

export default function useDisplayB2COverlay(): Output {
  const input: Input = {}
  const hook: Output = useConnect(input, config)
  return hook
}
