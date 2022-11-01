import * as t from './types'
import { createController } from '@kaminrunde/fireside-utils'
import { createOptImg } from 'utils/imageOptimization'

export default createController<t.UserConfig, t.Context>({
  async createContext(props, { getGridContext }) {
    const optImg = await createOptImg(props.imgSrc, getGridContext())

    return {
      optImg: optImg,
    }
  },
})
