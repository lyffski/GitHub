import * as t from './types'
import { createController } from '@kaminrunde/fireside-utils'
import { createOptImg } from 'utils/imageOptimization'

export default createController<t.UserConfig, t.Context>({
  async createContext(props, { getGridContext }) {
    const gridContext = getGridContext()
    return {
      optImages: await Promise.all(
        props.items.map((item) => createOptImg(item.imgSrc, gridContext), {
          XL: 0.8,
        })
      ),
    }
  },
})
