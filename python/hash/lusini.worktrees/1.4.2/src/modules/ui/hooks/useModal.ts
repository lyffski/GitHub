import * as a from '../actions'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

// eslint-disable-next-line @typescript-eslint/ban-types
export type Input = {}

export type Output = {
  content: any
  setContent: typeof a.setModalContent
}

const config: Config<Input, Output, State, Record<string, unknown>> = {
  moduleKey: 'ui',
  name: 'ui/useModal',
  createCacheKey: () => '',
  mapState: (state) => ({
    content: state.modalContent,
  }),
  mapDispatch: {
    setContent: a.setModalContent,
  },
}

export default function useModal(): Output {
  const input = {}
  const hook = useConnect<Input, Output, State, unknown>(input, config)
  return hook
}
