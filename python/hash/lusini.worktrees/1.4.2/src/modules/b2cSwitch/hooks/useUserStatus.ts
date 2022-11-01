import * as a from '../actions'
import * as t from '../types'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

// eslint-disable-next-line @typescript-eslint/ban-types
type Input = {}

type Output = {
  data: t.UserStatus
  setStatus: typeof a.setUserStatus
}

const config: Config<Input, Output, State, Record<string, unknown>> = {
  moduleKey: 'b2cSwitch',
  name: 'b2cSwitch/useUserStatus',
  createCacheKey: () => '',
  mapState: (state) => ({
    data: state.userStatus,
    isLoggedIn: state.userStatus === 'loggedOut' ? true : false,
  }),
  mapDispatch: {
    setStatus: a.setUserStatus,
  },
}

export default function useUserStatus(): Output {
  const input: Input = {}
  const hook: Output = useConnect(input, config)

  return hook
}
