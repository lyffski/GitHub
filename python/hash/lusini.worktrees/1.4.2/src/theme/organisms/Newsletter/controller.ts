import markdownToHtml from 'utils/markdownToHtml'
import { createController } from '@kaminrunde/fireside-utils'
import * as t from './types'

export default createController({
  preprocessProps(props: t.Props) {
    return Object.assign({}, props, {
      disclaimer: markdownToHtml(props.disclaimer),
    })
  },
  versionUpdate: (props) => {
    /** 16.05.2022 added iconSrc [WDV-1284] */
    if (!props.__version) {
      props.__version = 1
      props.iconSrc = ''
      props.showInput = false
    }

    return props
  },
})
