import { createPlugin } from '@kaminrunde/fireside-utils'
import {
  BsChevronCompactUp,
  BsChevronUp,
  BsChevronDoubleUp,
} from 'react-icons/bs'

type State = {
  [mediaSizeAndId: string]: 'S' | 'M' | 'L'
}

export default createPlugin<State, { key: string }>((ctx) => {
  /**
   * SMALL GAP
   */
  ctx.extendComponent({
    badge: {
      component: BsChevronCompactUp,
      isActive: (props) => {
        const state = props.state
        const id = `${props.mediaSize}-${props.component.id}`
        return state[id] === 'S'
      },
    },
    icon: {
      component: BsChevronCompactUp,
      isActive: (props) => {
        const state = props.state
        const id = `${props.mediaSize}-${props.component.id}`
        return state[id] === 'S'
      },
      onClick: (props) => {
        const id = `${props.mediaSize}-${props.component.id}`
        if (props.state[id] === 'S') {
          delete props.state[id]
          props.setState(props.state)
        } else {
          props.setState({
            ...props.state,
            [id]: 'S',
          })
        }
      },
    },
  })

  /**
   * MEDIUM GAP
   */
  ctx.extendComponent({
    badge: {
      component: BsChevronUp,
      isActive: (props) => {
        const state = props.state
        const id = `${props.mediaSize}-${props.component.id}`
        return state[id] === 'M'
      },
    },
    icon: {
      component: BsChevronUp,
      isActive: (props) => {
        const state = props.state
        const id = `${props.mediaSize}-${props.component.id}`
        return state[id] === 'M'
      },
      onClick: (props) => {
        const id = `${props.mediaSize}-${props.component.id}`
        if (props.state[id] === 'M') {
          delete props.state[id]
          props.setState(props.state)
        } else {
          props.setState({
            ...props.state,
            [id]: 'M',
          })
        }
      },
    },
  })

  /**
   * LARGE GAP
   */
  ctx.extendComponent({
    badge: {
      component: BsChevronDoubleUp,
      isActive: (props) => {
        const state = props.state
        const id = `${props.mediaSize}-${props.component.id}`
        return state[id] === 'L'
      },
    },
    icon: {
      component: BsChevronDoubleUp,
      isActive: (props) => {
        const state = props.state
        const id = `${props.mediaSize}-${props.component.id}`
        return state[id] === 'L'
      },
      onClick: (props) => {
        const id = `${props.mediaSize}-${props.component.id}`
        if (props.state[id] === 'L') {
          delete props.state[id]
          props.setState(props.state)
        } else {
          props.setState({
            ...props.state,
            [id]: 'L',
          })
        }
      },
    },
  })

  return {}
})
