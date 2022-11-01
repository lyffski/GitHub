export type CategoryOption = {
  count: number
  data: CategoryOption[] | null
  exhaustive: boolean
  isRefined: boolean
  name: string
  /** e.g Besteck > Gabel > Menügabel */
  path: string
  /** e.g /category/besteck/gabel/menuegabel */
  urlPath: string
}
