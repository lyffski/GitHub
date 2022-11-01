import * as React from 'react'
import ListingCategoryTree from 'theme/molecules/ListingCategoryTree'
import { useCategoryTree } from 'modules/listing'

type Props = {
  recordId: string
  'data-cy-state': 'show-categories'
}

export default function CategoryTree(props: Props) {
  const categoryTree = useCategoryTree(props.recordId)
  return (
    <div className="CategoryTree" data-cy-state={props['data-cy-state']}>
      <ListingCategoryTree {...categoryTree.data} />
    </div>
  )
}
