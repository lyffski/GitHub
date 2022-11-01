import * as s from '../selectors'
import useConnect, { Config } from 'hooks/useConnect'
import { State } from '../reducer'

type Input = {
  recordId: string
}

type Output = {
  data: ReturnType<typeof s.getAttributes>
}

const config: Config<Input, Output, State, never> = {
  moduleKey: 'listing',
  name: 'listing/useAttributes',
  createCacheKey: (input) => input.recordId,
  mapState: (state, input) => {
    return {
      data: s.getAttributes(state, input.recordId),
    }
  },
}

export default function useAttributes(recordId: string): Output {
  const input: Input = { recordId }
  const hook: Output = useConnect(input, config)
  return hook
}
