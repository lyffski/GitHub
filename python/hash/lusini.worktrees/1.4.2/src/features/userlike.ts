import { addRule } from 'redux-ruleset'
import config from 'config'

addRule({
  id: 'userlike/LOAD_CHAT',
  target: '*',
  output: '#script-add',
  addOnce: true,
  delay: 3000,
  condition: () => config.features.userLikeWidgetUrl.length > 0,
  consequence: () => {
    if (typeof document !== 'undefined') {
      const scriptElement = document.createElement('script')
      scriptElement.type = 'text/javascript'
      scriptElement.async = true

      scriptElement.src = config.features.userLikeWidgetUrl

      document.body.appendChild(scriptElement)
    }
  },
})
