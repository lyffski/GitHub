import * as React from 'react'

export default function useShopwareEvent(eventName: string, callBack: any) {
  React.useEffect(() => {
    const handleWindowMessage = (event) => {
      if (event.data.type === eventName) {
        callBack()
      }
    }

    window.addEventListener('message', handleWindowMessage, true)

    return () => {
      window.removeEventListener('message', handleWindowMessage, true)
    }
  }, [eventName, callBack])
}
