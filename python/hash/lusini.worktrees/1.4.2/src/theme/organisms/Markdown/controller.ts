import markdownToHtml from 'utils/markdownToHtml'
import { createController } from '@kaminrunde/fireside-utils'
import * as t from './types'
import { createOptImg } from 'utils/imageOptimization'

export default createController<t.UserConfig, t.Context>({
  preprocessProps(props) {
    return Object.assign({}, props, {
      md: markdownToHtml(props.md.replace(/<\/?[^>|oneT]+(>|$)/g, '')),
    })
  },
  async createContext(props, { getGridContext }) {
    if (props.imageSrc !== '') {
      const optImg = await createOptImg(props.imageSrc, getGridContext())

      return {
        optImg: optImg,
        imageBase64: optImg.base64,
      }
    }
    return {
      optImg: null,
      imageBase64: '',
    }
  },
})
