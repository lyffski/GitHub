import useConnect, { Config } from 'hooks/useConnect'
import * as t from '../types'
import * as a from '../actions'
import { State } from '../reducer'

// eslint-disable-next-line @typescript-eslint/ban-types
type Input = {}

type Output = {
  data: t.Cart
  isUpdating: boolean
  updateError: null | string
  addItem: typeof a.addItemRequest
  removeItem: typeof a.removeItemRequest
}

const config: Config<Input, Output, State, Record<string, unknown>> = {
  moduleKey: 'cart',
  name: 'cart/useCart',
  createCacheKey: () => '',
  mapState: (state) => ({
    data: state.data,
    isUpdating: state.isUpdating,
    updateError: state.updateError,
  }),
  mapDispatch: {
    addItem: a.addItemRequest,
    removeItem: a.removeItemRequest,
  },
}

export default function useCart(): Output {
  const input: Input = {}
  const cart: Output = useConnect(input, config)
  return cart
}
