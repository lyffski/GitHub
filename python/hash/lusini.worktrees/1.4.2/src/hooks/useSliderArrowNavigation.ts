import * as React from 'react'
import useInView from 'hooks/useInView'

export default function useArrowNavigation(
  distanceModif: number | ((rect: DOMRect) => number)
) {
  const [lastItemRef, lastItemReached] = useInView<HTMLDivElement>()
  const [firstItemRef, firstItemReached] = useInView<HTMLDivElement>()
  const productListRef = React.useRef<null | HTMLDivElement>(null)

  const handleSlide = (direction: 'left' | 'right') => {
    if (!productListRef.current) return

    const rect = productListRef.current.getBoundingClientRect()

    const scrollLeft = productListRef.current.scrollLeft || 0
    const distance =
      typeof distanceModif === 'number'
        ? rect.width * distanceModif
        : distanceModif(rect)
    const scrollX = direction === 'left' ? -distance : distance

    productListRef.current.scroll({
      left: scrollLeft + scrollX,
      behavior: 'smooth',
    })
  }

  return {
    lastItemRef,
    firstItemRef,
    productListRef,
    lastItemReached,
    firstItemReached,
    handleSlide,
  }
}
