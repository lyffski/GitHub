import * as React from 'react'

type Return = {
  index: number
  numThumbs: number
  increment: () => void
  decrement: () => void
  setIndex: (i: number) => void
  showIncrement: boolean
  showDecrement: boolean
  ref: React.LegacyRef<HTMLDivElement>
}

export default function useThumbnails(numThumbs: number): Return {
  const [index, _setIndex] = React.useState(0)
  const [showIncrement, setShowIncrement] = React.useState(false)
  const [showDecrement, setShowDecrement] = React.useState(false)
  const ref = React.useRef<null | HTMLDivElement>(null)

  const increment = () => {
    if (index + 2 > numThumbs) return
    _setIndex((i) => i + 1)
  }

  const decrement = () => {
    if (index - 1 < 0) return
    _setIndex((i) => i - 1)
  }

  const setIndex = React.useCallback((i: number) => {
    _setIndex(i)
  }, [])

  React.useEffect(() => {
    if (!ref.current) return

    const offset = ref.current.scrollHeight - ref.current.offsetHeight

    if (offset > 0) {
      setShowDecrement(index !== 0)
      setShowIncrement(index + 1 !== numThumbs)
    } else {
      return
    }

    let scrollHeight = 0
    const firstChild = ref.current.children[0] as HTMLDivElement | undefined
    if (firstChild) {
      scrollHeight = firstChild.offsetHeight + 20 // theme.spacing('m')
    }

    if (index <= 1) {
      ref.current.style.transform = `translate3d(0,-${scrollHeight * 0}px,0)`
    } else if (numThumbs < index + 3) {
      ref.current.style.transform = `translate3d(0,-${
        scrollHeight * (numThumbs - 3)
      }px,0)`
    } else {
      ref.current.style.transform = `translate3d(0,-${
        scrollHeight * (index - 1)
      }px,0)`
    }
  }, [index, numThumbs])

  return {
    index,
    increment,
    decrement,
    setIndex,
    showIncrement,
    showDecrement,
    numThumbs,
    ref,
  }
}
