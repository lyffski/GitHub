import * as a from '../actions'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

// eslint-disable-next-line @typescript-eslint/ban-types
export type Input = {}

export type Output = {
  data: string
  setValue: typeof a.setSearchValue
}

const config: Config<Input, Output, State, Record<string, unknown>> = {
  moduleKey: 'ui',
  name: 'ui/useSearchModal',
  createCacheKey: () => '',
  mapState: (state) => ({
    data: state.searchValue,
  }),
  mapDispatch: {
    setValue: a.setSearchValue,
  },
}

export default function useSearchValue(): Output {
  const input: Input = {}
  const hook: Output = useConnect(input, config)
  return hook
}
