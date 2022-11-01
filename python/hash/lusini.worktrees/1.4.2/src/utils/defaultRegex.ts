export const pageTypeInPath = (
  searchValue: string,
  params?: string
): boolean => {
  return !!searchValue.match(
    new RegExp(`^(/[a-z]{2}(-[a-z]{2})?)?/${params || ''}`)
  )
}
