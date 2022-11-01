import * as t from '../types'
import useConnect, { Config } from 'hooks/useConnect'
import { State } from '../reducer'
import * as s from '../selectors'

// eslint-disable-next-line @typescript-eslint/ban-types
type Input = {}

type Output = {
  data: t.Variant[]
}

const config: Config<Input, Output, State, never> = {
  moduleKey: 'productDetail',
  name: 'productDetail/useVariants',
  createCacheKey: () => '',
  mapState: (state) => ({
    data: s.getVariants(state),
  }),
}

export default function useVariants(): Output {
  const input: Input = {}
  const hook: Output = useConnect(input, config)
  return hook
}
