// import * as t from '../types'
import * as a from '../actions'
import * as s from '../selectors'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

type Input = {
  recordId: string
}

type Output = {
  data: {
    min: number | null
    max: number | null
  }
  options: {
    min: number
    max: number
  }
  set: (price: number, type: 'min' | 'max') => a.SetPrice
}

type DP = {
  set: typeof a.setPrice
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'listing',
  name: 'listing/usePrice',
  createCacheKey: (input) => input.recordId,
  mapState: (state, input) => s.getPrice(state, input.recordId),
  mapDispatch: {
    set: a.setPrice,
  },
  transformDispatch: {
    set: (fn, sp, input) => (price, type) => fn(input.recordId, price, type),
  },
}

export default function usePrice(recordId: string): Output {
  const input: Input = { recordId }
  const hook: Output = useConnect(input, config)
  return hook
}
