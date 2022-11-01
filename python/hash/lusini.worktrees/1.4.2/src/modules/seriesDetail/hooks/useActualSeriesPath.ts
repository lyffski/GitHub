import useConnect, { Config } from 'hooks/useConnect'
import { State } from '../reducer'

// eslint-disable-next-line @typescript-eslint/ban-types
type Input = {}

type Output = {
  data: { series: string; productLine: string }
}

const config: Config<Input, Output, State, never> = {
  moduleKey: 'seriesDetail',
  name: 'seriesDetail/useActualSeriesPath',
  createCacheKey: () => '',
  mapState: (state) => {
    if (state.data?.categories) {
      return {
        data: {
          series: Object.values(state.data?.categories)
            .slice(-1)[0]
            .toString()
            .split('>')
            .join('/'),
          productLine: state.data.title !== 'undefined' ? state.data.title : '',
        },
      }
    } else {
      return { data: { series: '', productLine: '' } }
    }
  },
}

export default function useActualSeriesPath(): Output {
  const input: Input = {}
  const hook: Output = useConnect(input, config)
  return hook
}
