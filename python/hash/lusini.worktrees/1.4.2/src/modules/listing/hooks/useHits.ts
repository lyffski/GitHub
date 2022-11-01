import * as t from '../types'
import * as s from '../selectors'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

type Input = {
  recordId: string
}

type Output = {
  data: t.Product[]
  isFetching: boolean
  fetchError: string | null
  nbHits: number
}

const config: Config<Input, Output, State, never> = {
  moduleKey: 'listing',
  name: 'listing/useHits',
  createCacheKey: (input) => input.recordId,
  mapState: (state, input) => ({
    data: s.getHits(state, input.recordId),
    isFetching: s.isFetching(state, input.recordId),
    fetchError: s.getFetchError(state, input.recordId),
    nbHits: s.getNbHits(state, input.recordId),
  }),
}

export default function useHits(recordId: string): Output {
  const input: Input = { recordId: recordId }
  const hook: Output = useConnect(input, config)
  return hook
}
