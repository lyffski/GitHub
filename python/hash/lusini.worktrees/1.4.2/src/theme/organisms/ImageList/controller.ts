import * as t from './types'
import { createController } from '@kaminrunde/fireside-utils'
import { createOptImg } from 'utils/imageOptimization'

export default createController<t.UserConfig, t.Context>({
  async createContext(props, { getGridContext }) {
    const categoryOptImg = await Promise.all(
      props.categories.map((cat) =>
        createOptImg(cat.imgSrc, getGridContext(), {
          XS: 0.5,
          SM: 0.5,
          MD: 0.3,
          LG: 0.25,
          XL: 0.2,
        })
      )
    )
    return {
      categoryOptImg,
    }
  },
})
