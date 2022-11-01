import config from 'config'

export default function priceStr(price: number | string) {
  const priceInt = typeof price === 'string' ? parseFloat(price) : price
  const maximumFractionDigits = priceInt < 0.01 ? 3 : 2
  return priceInt.toLocaleString(config.i18n.locale, {
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: config.i18n.currency_ISO,
    maximumFractionDigits: maximumFractionDigits,
  })
}
