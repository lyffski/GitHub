import markdownToHtml from 'utils/markdownToHtml'
import { createController } from '@kaminrunde/fireside-utils'

type Props = {
  id: string
  recipient: string
  firstname: string
  surname: string
  email: string
  product_name: string
  article_number: string
  locale: string
  submit: string
  formSuccessMessage: string
  onClick: () => void
}

export default createController<Props, null>({
  preprocessProps(props) {
    return Object.assign({}, props, {
      formSuccessMessage: markdownToHtml(props.formSuccessMessage),
    })
  },
})
