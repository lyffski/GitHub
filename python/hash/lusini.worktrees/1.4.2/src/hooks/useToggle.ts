import * as React from 'react'

export default function useToggle(
  initialValue: boolean
): [boolean, () => void] {
  const [value, setValue] = React.useState(initialValue)

  const toggleValue = React.useCallback(() => setValue((value) => !value), [])

  return [value, toggleValue]
}
