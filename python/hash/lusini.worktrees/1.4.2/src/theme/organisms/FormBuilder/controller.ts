import markdownToHtml from 'utils/markdownToHtml'
import { createController } from '@kaminrunde/fireside-utils'
import * as t from './types'

export default createController<t.Props, null>({
  preprocessProps(props) {
    return Object.assign({}, props, {
      formSuccessMessage: markdownToHtml(props.formSuccessMessage),
    })
  },
})
