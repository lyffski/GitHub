import { createController } from '@kaminrunde/fireside-utils'
import { createOptImg } from 'utils/imageOptimization'
import * as t from './types'

export default createController<t.UserConfig, t.Context>({
  async createContext(props, { getGridContext }) {
    return {
      optImg: await createOptImg(props.teaserImage, getGridContext()),
    }
  },
})
