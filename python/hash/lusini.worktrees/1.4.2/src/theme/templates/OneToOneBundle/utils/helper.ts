export const getSkuFromUrl = () => {
  if (typeof window === 'undefined') return null
  if (!window.location.href.includes('sku')) return null

  const regex = /\?sku=(.*?)\//
  const sku = regex.exec(window.location.href)

  return sku
}
