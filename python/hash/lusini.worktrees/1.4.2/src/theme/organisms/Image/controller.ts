import * as t from './types'
import { createController } from '@kaminrunde/fireside-utils'
import * as optImg from 'utils/imageOptimization'

export default createController<t.UserConfig, t.Context>({
  async createContext(props, { getGridContext }) {
    return {
      optImg: await optImg.createOptImg(props.imageSrc, getGridContext()),
    }
  },
})
export const versionUpdate = (props: any): t.UserConfig => {
  /**
   * 23.07.2020 - HDI
   * Enable seperate link for Image and Label
   *
   */
  if (!props.__version) {
    props.imageLink = props.link
    props.labelLink = ''
    props.__version = 1
    delete props.link
  }
  /**
   * 23.07.2020 - Toby
   * extend Label with Markdown (Link seperation)
   * removed labelLink
   */
  if (props.__version === 1) {
    if (props.labelLink) props.label = `[${props.label}](${props.labelLink})`
    props.__version = 2
    delete props.labelLink
  }
  /**
   * 23.07.2020 - HDI
   * Enable seperate link for Image and Label
   *
   */
  if (props.__version === 2) {
    props.alt = props.label
    props.__version = 3
    delete props.link
  }
  return props
}
