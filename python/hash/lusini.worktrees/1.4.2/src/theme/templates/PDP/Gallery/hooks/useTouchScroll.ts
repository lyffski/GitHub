import * as React from 'react'

export default function useTouchScroll(sku: string) {
  const holder = React.useRef<null | HTMLDivElement>(null)
  const bar = React.useRef<null | HTMLDivElement>(null)
  const [resize, setResize] = React.useState(0)
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (!holder.current || !bar.current) return

    const slideWidth = holder.current.offsetWidth
    const numImages = holder.current.children.length

    bar.current.style.marginLeft = '0%'

    let touchstartx: number
    let touchmovex: number
    let movex: number
    let index = 0
    let longtouch = false
    let tempMovex: number
    const touchstart = (e: TouchEvent) => {
      if (!holder.current) return
      longtouch = false
      setTimeout(() => {
        longtouch = true
      }, 250)
      touchstartx = e.touches[0].pageX
      holder.current.classList.remove('animate')
    }

    const touchmove = (e: TouchEvent) => {
      if (!holder.current) return
      touchmovex = e.touches[0].pageX
      // Calculate distance to translate holder.
      movex = index * slideWidth + (touchstartx - touchmovex)

      // update position
      holder.current.style.transform = `translate3d(-${movex}px,0,0)`
    }

    const touchend = () => {
      if (!holder.current) return
      holder.current.classList.add('animate')
      // Calculate the index. All other calculations are based on the index.
      const absMove = Math.abs(index * slideWidth - movex)
      const maxIndex = numImages - 1
      if (movex === tempMovex) {
        return
      }
      // Calculate the index. All other calculations are based on the index.
      if (absMove > slideWidth / 3 || longtouch === false) {
        if (movex > index * slideWidth && index < maxIndex) {
          index++
          setIndex(index)
        } else if (movex < index * slideWidth && index > 0) {
          index--
          setIndex(index)
        }
      }

      if (bar.current) {
        bar.current.style.marginLeft = index * (100 / numImages) + '%'
      }
      holder.current.style.transform = `translate3d(-${
        index * slideWidth
      }px,0,0)`
      tempMovex = movex
    }

    const resize = () => {
      setResize((n) => {
        return n + 1
      })
    }

    holder.current.addEventListener('touchstart', touchstart)
    holder.current.addEventListener('touchmove', touchmove)
    holder.current.addEventListener('touchend', touchend)
    window.addEventListener('resize', resize)

    return () => {
      if (!holder.current) return
      holder.current.style.transform = `translate3d(0,0,0)`
      holder.current.removeEventListener('touchstart', touchstart)
      holder.current.removeEventListener('touchmove', touchmove)
      holder.current.removeEventListener('touchend', touchend)
      window.removeEventListener('resize', resize)
    }
  }, [sku, resize])

  return { index, holder, bar }
}
