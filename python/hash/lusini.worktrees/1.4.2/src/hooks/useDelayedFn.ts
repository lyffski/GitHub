import * as React from 'react'

export default function useDelayedFn<Fn extends (...args: any[]) => void>(
  delay: number,
  fn: Fn
): [boolean, Fn] {
  const [isDelaying, setIsDelaying] = React.useState(false)
  const timeout = React.useRef<any | null>(null)

  const delayedFn = (...args: any[]) => {
    setIsDelaying(true)
    timeout.current = setTimeout(() => {
      fn(...args)
      setIsDelaying(false)
    }, delay)
  }

  React.useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  return [isDelaying, delayedFn as Fn]
}
