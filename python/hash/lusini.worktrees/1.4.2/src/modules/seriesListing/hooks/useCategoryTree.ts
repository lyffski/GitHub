import { State } from '../reducer'
import * as s from '../selectors'
import useConnect, { Config } from 'hooks/useConnect'

type Input = {
  recordId: string
}

type Output = {
  data: ReturnType<typeof s.getCategoryTree>
}

const config: Config<Input, Output, State, never> = {
  moduleKey: 'seriesListing',
  name: 'seriesListing/useCategoryTree',
  createCacheKey: (input) => input.recordId,
  mapState: (state, input) => ({
    data: s.getCategoryTree(state, input.recordId),
  }),
}

export default function useCategoryTree(recordId: string): Output {
  const input = { recordId }
  const hook: Output = useConnect(input, config)
  return hook
}
