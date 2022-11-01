import * as a from '../actions'
import * as t from '../types'
import useConnect, { Config } from 'hooks/useConnect'
import { State } from '../reducer'

// eslint-disable-next-line @typescript-eslint/ban-types
type Input = {}

type Output = {
  data: {
    customerType: t.CustomerType
    DlEvent: t.DlEvent
  }
  setType: typeof a.setCustomerType
}

const config: Config<Input, Output, State, Record<string, unknown>> = {
  moduleKey: 'b2cSwitch',
  name: 'b2cSwitch/useCustomerType',
  createCacheKey: () => '',
  mapState: (state) => ({
    data: state.customerType,
  }),
  mapDispatch: {
    setType: a.setCustomerType,
  },
}

export default function useCustomerType(): Output {
  const input: Input = {}
  const hook: Output = useConnect(input, config)

  return hook
}
