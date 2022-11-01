import { addRule } from 'redux-ruleset'
import { setWindowSize } from 'modules/browser/actions'
import { SET_WINDOW_SIZE, ms } from 'modules/browser/const'
import store from 'store'
import { LOCATION_CHANGED } from 'modules/navigation/const'

const handleResize = () => {
  let width = 0,
    height = 0
  if (typeof window !== 'undefined') {
    width = window.innerWidth
    height = window.innerHeight
  }

  const bpName = (width) => {
    let name = ''
    Object.keys(ms).forEach((key) => {
      if (width >= ms[key]) {
        name = key
      }
    })
    return name
  }

  const action = setWindowSize({
    name: bpName(width),
    width: width,
    height: height,
  })
  store.dispatch(action)
}

addRule({
  id: 'browser/initial-resize',
  target: LOCATION_CHANGED,
  output: SET_WINDOW_SIZE,
  concurrency: 'ONCE',
  position: 'BEFORE',
  consequence: () => {
    // initial resize
    handleResize()
    // event listener for resizing
    window.addEventListener('resize', handleResize)
  },
})
