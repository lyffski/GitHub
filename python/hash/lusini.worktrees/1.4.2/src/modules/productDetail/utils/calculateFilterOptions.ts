import * as t from '../types'

type MapEntry = {
  label: string
  image: {
    url: string
    classes: Array<'ASSET_FS' | string>
  }
  sortNumber: number | null
}

export default function calculateFilterOptions(
  variants: t.Variant[],
  filterValues: t.FilterValues,
  filterKey: t.FilterKey
): t.FilterOption[] {
  const labels: MapEntry[] = []
  const usedLabels: Record<string, boolean> = {}
  const selectableLabels: Record<string, boolean> = {}

  const isSelectable = (variant: t.Variant) => {
    if (
      variant.variantData.color.label &&
      filterValues.color &&
      filterKey !== 'color'
    ) {
      if (variant.variantData.color.label !== filterValues.color) return false
    }

    if (
      variant.variantData.size.label &&
      filterValues.size &&
      filterKey !== 'size'
    ) {
      if (variant.variantData.size.label !== filterValues.size) return false
    }

    if (
      variant.variantData.style.label &&
      filterValues.style &&
      filterKey !== 'style'
    ) {
      if (variant.variantData.style.label !== filterValues.style) return false
    }

    if (
      variant.variantData.variant.label &&
      filterValues.variant &&
      filterKey !== 'variant'
    ) {
      if (variant.variantData.variant.label !== filterValues.variant)
        return false
    }
    return true
  }

  for (const variant of variants) {
    const variantFilter = variant.variantData[filterKey]
    if (variantFilter.label && !usedLabels[variantFilter.label]) {
      labels.push({
        label: variantFilter.label,
        image: variant.images.imageWeb[0],
        sortNumber:
          (variant.attributes.SKU_SORT_NUMBER?.values?.[0]?.value as number) ||
          null,
      })
      usedLabels[variantFilter.label] = true
    }
    if (isSelectable(variant) && variantFilter.label)
      selectableLabels[variantFilter.label] = true
  }

  // sort filter values with sortNumber attribute (SKU_SORT_NUMBER)
  return labels
    .sort((prev, next) => {
      if (prev.sortNumber === null) return 1
      if (next.sortNumber === null) return -1
      return prev.sortNumber - next.sortNumber || -1
    })
    .map((row) => ({
      label: row.label,
      image: row.image,
      selectable: selectableLabels[row.label] || false,
    }))
}
