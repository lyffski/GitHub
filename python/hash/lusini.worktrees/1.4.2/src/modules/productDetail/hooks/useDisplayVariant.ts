import * as t from '../types'
import * as s from '../selectors'
import useConnect, { Config } from 'hooks/useConnect'
import { State } from '../reducer'

// eslint-disable-next-line @typescript-eslint/ban-types
type Input = {}

type Output = {
  data: t.Variant
  isFetching: boolean
}

const config: Config<Input, Output, State, never> = {
  moduleKey: 'productDetail',
  name: 'productDetail/useDisplayVariant',
  createCacheKey: () => '',
  mapState: (state) => ({
    data: s.getDisplayVariant(state),
    isFetching: s.isFetching(state),
  }),
}

export default function useDisplayVariant(): Output {
  const input: Input = {}
  const hook: Output = useConnect(input, config)
  return hook
}
