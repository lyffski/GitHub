export default function pdpLdJson(product, currency = '€', description = '') {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image:
      product.images?.imageWeb.length > 1
        ? product.images?.imageWeb[0].url
        : '',
    description: description !== '' ? description : product.subTitle,
    mpn: product.containerID,
    brand: {
      '@type': 'Thing',
      name: product.brand,
    },
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '4.4',
    //   reviewCount: '89',
    // },
    offers: {
      '@type': 'Offer',
      priceCurrency: currency,
      price: product.prices?.packPriceGross,
      itemCondition: 'http://schema.org/UsedCondition',
      availability: 'http://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Lusini',
      },
    },
  }
}
