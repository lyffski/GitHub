import * as React from 'react'

export const Context = React.createContext(1300)

export default function useContainerSize() {
  return React.useContext(Context)
}
