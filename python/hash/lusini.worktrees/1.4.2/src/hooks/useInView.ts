import * as React from 'react'

type Output<T> = [React.MutableRefObject<T | null>, boolean]

export default function useInView<T extends HTMLElement>(
  offset = 0,
  triggerOnce = false,
  threshold?: number
): Output<T> {
  const ref = React.useRef<null | T>(null)
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  React.useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && triggerOnce) observer.disconnect()
      },
      {
        rootMargin: `${offset}px`,
        threshold,
      }
    )

    observer.observe(ref.current)

    return () => {
      // makes trouble with HMR
      try {
        observer.disconnect()
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }, [offset, triggerOnce, threshold])

  return [ref, isIntersecting]
}
