import * as a from '../actions'
import { State } from '../reducer'
import useConnect, { Config } from 'hooks/useConnect'

// eslint-disable-next-line @typescript-eslint/ban-types
export type Input = {}

export type Output = {
  visible: boolean
  sidebarCategory: string | null
  currentCategory: string | null
  toggle: typeof a.toggleNavi
  setCategory: typeof a.setSidebarCategory
}

const config: Config<Input, Output, State, Record<string, unknown>> = {
  moduleKey: 'ui',
  name: 'ui/useFlyoutNavi',
  createCacheKey: () => '',
  mapState: (state) => ({
    visible: state.showFlyoutNavi,
    sidebarCategory: state.sidebarCategory,
    currentCategory: state.currentCategory,
  }),
  mapDispatch: {
    toggle: a.toggleNavi,
    setCategory: a.setSidebarCategory,
  },
}

export default function useFlyoutNavi(): Output {
  const input = {}
  const hook = useConnect<Input, Output, State, unknown>(input, config)
  return hook
}
