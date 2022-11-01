import * as t from '../types'
import * as a from '../actions'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

// eslint-disable-next-line @typescript-eslint/ban-types
type Input = {}

type Output = {
  data: t.SeriesContainer | null
  filters: State['filters']
  isFetching: boolean
  fetchError: string | null
}

const config: Config<Input, Output, State, Record<string, unknown>> = {
  moduleKey: 'seriesDetail',
  name: 'seriesDetail/useSeriesContainer',
  createCacheKey: () => '',
  mapState: (state) => ({
    data: state.data,
    isFetching: state.isFetching,
    fetchError: state.fetchError,
    filters: state.filters,
  }),
  mapDispatch: { _init: a.init },
}

export default function useSeriesContainer(): Output {
  const input: Input = {}
  const hook: Output = useConnect(input, config)

  return hook
}
