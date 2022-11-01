import { Crumb } from 'theme/atoms/Breadcrumbs'
import slugify from 'utils/slugify'

type CategoryTree = {
  [key: string]: string[]
}
/**
 * create crumbs from variant mainCategory
 * first: "Home"
 * each mainCategory level
 * last: variant title
 */
export const createCrumbsFromCategoryTree = (
  categoryTree: CategoryTree,
  categoryTitle: string
): Crumb[] => {
  const crumbs: { label: string; link?: string }[] = []
  crumbs.push({ label: 'Home', link: '/' })
  Object.values(categoryTree).forEach((category: string[]) => {
    const categoryPath = category[0]
    crumbs.push({
      label: categoryPath.split(' > ').slice().reverse()[0],
      link: '/category/' + slugify(categoryPath),
    })
  })
  crumbs.push({ label: categoryTitle })
  return crumbs
}
