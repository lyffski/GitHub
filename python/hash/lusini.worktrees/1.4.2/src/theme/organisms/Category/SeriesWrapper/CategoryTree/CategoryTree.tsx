import * as React from 'react'
import ListingCategoryTree from 'theme/molecules/ListingCategoryTree'
import { useCategoryTree } from 'modules/seriesListing'

type Props = {
  recordId: string
}

export default function CategoryTree(props: Props) {
  const categoryTree = useCategoryTree(props.recordId)
  return (
    <div className="CategoryTree">
      <ListingCategoryTree {...categoryTree.data} />
    </div>
  )
}
