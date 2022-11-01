import { Product } from 'theme/molecules/ProductWidget/types'
import React from 'react'

export type ContextProps = {
  showVariants: boolean
  onProductWidgetClick?: (product: Product) => void
  linkTo?: string
}

export const Context = React.createContext<ContextProps>({
  showVariants: true,
})

/** @firescoutMockFn hooks.useProductWidgetContext */
export default function useProductWidgetContext() {
  return React.useContext(Context)
}
