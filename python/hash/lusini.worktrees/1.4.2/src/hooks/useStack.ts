import * as React from 'react'

type Output<T> = [T | null, (el: T) => void, () => void]

export default function useStack<T>(initialList: T[] = []): Output<T> {
  const [stack, setStack] = React.useState(initialList)

  const lastElement = stack.length ? stack[stack.length - 1] : null

  const push = React.useCallback(
    (el: T) => setStack((prev) => [...prev, el]),
    []
  )
  const pop = React.useCallback(() => setStack((prev) => prev.slice(0, -1)), [])

  return [lastElement, push, pop]
}
