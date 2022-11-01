import * as React from 'react'

type Output<T> = React.RefObject<T>

export default function useOutsideClick<T extends HTMLDivElement>(
  handler: (e: React.MouseEvent) => any
): Output<T> {
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])

  return ref
}
