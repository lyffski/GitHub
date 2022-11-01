import { pageTypeInPath } from 'utils/defaultRegex'

export default (path: string) => {
  if (pageTypeInPath(path, '$'))
    return { pageType: 'Home' as 'Home', pageName: 'Start' }
  if (pageTypeInPath(path, 'pdp'))
    return { pageType: 'Product' as 'Product', pageName: 'Productpage' }
  if (pageTypeInPath(path, 'category'))
    return {
      pageType: 'Category' as 'Category',
      pageName: path.split('/').slice(-2, -1).pop() || '',
    }

  if (pageTypeInPath(path, 'series'))
    return {
      pageType: 'Series' as 'Series',
      pageName: path.split('/').slice(-2, -1).pop() || '',
    }
  if (pageTypeInPath(path, 'search'))
    return { pageType: 'Search' as 'Search', pageName: 'Search' }
  if (pageTypeInPath(path, 'cart'))
    return { pageType: 'Cart' as 'Cart', pageName: 'Cart' }
  if (pageTypeInPath(path, 'checkout'))
    return { pageType: 'Checkout' as 'Checkout', pageName: 'Checkout' }
  if (pageTypeInPath(path, 'account'))
    return { pageType: 'Account' as 'Account', pageName: 'Account' }
  if (pageTypeInPath(path, 'helpandservice'))
    return {
      pageType: 'Service' as 'Service',
      pageName: path.split('/').pop() || '',
    }
  return { pageType: '' as '', pageName: '' }
}
