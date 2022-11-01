import useConnect, { Config } from 'hooks/useConnect'
import { State } from '../reducer'

// eslint-disable-next-line @typescript-eslint/ban-types
type Input = {}

type Output = {
  data: {
    category: string
    search: string
  }
}

const config: Config<Input, Output, State, never> = {
  moduleKey: 'ui',
  name: 'seriesDetail/useActualUIPath',
  createCacheKey: () => '',
  mapState: (state) => {
    let category = ''
    let search = ''
    if (state.currentCategory)
      category = state.currentCategory.split('>').join('/')
    if (state.searchValue) search = state.searchValue

    return { data: { category: category, search: search } }
  },
}

export default function useActualUIPath(): Output {
  const input: Input = {}
  const hook: Output = useConnect(input, config)
  return hook
}
