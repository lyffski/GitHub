import { Context, ContextProps } from 'hooks/useProductWidgetContext'
import * as React from 'react'
import ProductList from 'theme/molecules/ProductList'
import { RECORD_ID } from '../const'

type Props = {
  onProductWidgetClick: ContextProps['onProductWidgetClick']
  linkTo: ContextProps['linkTo']
}

export default function ProductListWrapper(props: Props) {
  return (
    <Context.Provider
      value={{
        showVariants: false,
        onProductWidgetClick: props.onProductWidgetClick,
        linkTo: props.linkTo,
      }}
    >
      <ProductList
        recordId={RECORD_ID}
        showCategoryTree={false}
        listname={'one-to-one-bundle'}
      />
    </Context.Provider>
  )
}
