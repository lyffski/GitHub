import * as t from '../types'
export default function applyShopwarePrice(
  variant: t.Variant,
  shopwarePrice: number
): t.Variant {
  if (!variant.configurations.custom_tailor.is_custom_tailor) {
    return variant
  }
  const result = {
    ...variant,
    prices: {
      ...variant.prices,
      packPriceNet: shopwarePrice,
      piecePriceNet: shopwarePrice,
      piecePriceGross:
        (shopwarePrice * (100 + parseInt(variant.taxRate))) / 100,
      packPriceGross: (shopwarePrice * (100 + parseInt(variant.taxRate))) / 100,
    },
  }

  return result
}
