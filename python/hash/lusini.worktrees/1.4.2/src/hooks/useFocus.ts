import React, { useRef, useState, useEffect } from 'react'

/**
 * Does El/Ref has focus?
 * @return {array} [{Element|any} ref, {boolean} isFocus]
 */
export default function useFocus(
  tabindex = 0
): [React.MutableRefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null),
    [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    if (typeof ref.current.tabIndex !== 'number') {
      ref.current.tabIndex = tabindex
    }

    const lFocus = () => setIsFocus(true)
    const lBlur = () => setIsFocus(false)

    ref.current.addEventListener('focus', lFocus)
    ref.current.addEventListener('blur', lBlur)

    return () => {
      if (!ref.current) return
      ref.current.removeEventListener('focus', lFocus)
      ref.current.removeEventListener('blur', lBlur)
    }
  }, [tabindex])

  return [ref, isFocus]
}
