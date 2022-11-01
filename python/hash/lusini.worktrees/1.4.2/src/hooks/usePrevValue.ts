import * as React from 'react'

/**
 * returns the value of the previous render cyclus. Initially
 * the same value as initialValue
 * @example
 * const [number, setNumber] = React.useState(1)
 * const prevValue = usePrevValue(number)
 */
export default function usePrevValue<A>(initialValue: A): A {
  const value = React.useRef(initialValue)
  React.useEffect(() => {
    value.current = initialValue
  }, [initialValue])
  return value.current
}
