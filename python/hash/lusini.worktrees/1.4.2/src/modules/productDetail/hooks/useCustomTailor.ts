import * as t from '../types'
import * as a from '../actions'
import useConnect, { Config } from 'hooks/useConnect'
import { State } from '../reducer'

type Input = any

type Output = {
  data: t.CustomTailorType
  set: (type: t.CustomTailorAction, value: any) => a.SetCustomTailor
  init: (value: t.CustomTailorFullType) => a.InitCustomTailor
  fullData: t.CustomTailorFullType
}

type DP = {
  set: typeof a.setCustomTailor
  init: typeof a.initCustomTailor
}

const config: Config<Input, Output, State, DP> = {
  moduleKey: 'productDetail',
  name: 'productDetail/useCustomTailor',
  createCacheKey: () => 'customTailor',
  mapState: (state) => {
    if (state.customTailor) {
      let newSize = state.customTailor?.size || {}
      if (
        state.customTailor?.form === 'round' ||
        state.customTailor?.form === 'square'
      ) {
        newSize = {
          width: state.customTailor?.size?.width || 1,
          length: state.customTailor?.size?.width || 1,
        }
      }

      return {
        data: {
          form: state.customTailor?.form,
          size: newSize,
          brink: state.customTailor?.brink,
          amount: state.customTailor?.amount,
        },
        fullData: state.customTailorFullObject,
      }
    } else {
      return { data: null }
    }
  },
  mapDispatch: {
    set: a.setCustomTailor,
    init: a.initCustomTailor,
  },
}

export default function useCustomTailor(): Output {
  const input: Input = {}
  const hook: Output = useConnect(input, config)
  return hook
}
