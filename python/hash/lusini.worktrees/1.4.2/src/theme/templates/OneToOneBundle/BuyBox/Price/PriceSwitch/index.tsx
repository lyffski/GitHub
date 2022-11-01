import * as React from 'react'
import priceStr from 'utils/priceString'
import B2cSwitch from 'theme/atoms/B2cSwitch'
import useTranslations from 'hooks/useTranslations'

type Props = {
  piecePriceGross: number
}

export const PriceB2BGrossInfo = (props: Props) => {
  const t = useTranslations<'templates-OneToOneBundle'>()
  return (
    <>
      {Boolean(props.piecePriceGross) && (
        <B2cSwitch.B2B data-cy-state="has-gross-price">
          {t('buy_box_tax')} {priceStr(props.piecePriceGross)}
        </B2cSwitch.B2B>
      )}
    </>
  )
}

export const PriceB2CNetInfo = () => {
  const t = useTranslations<'templates-OneToOneBundle'>()
  return <B2cSwitch.B2C>{t('buy_box_delivery')}</B2cSwitch.B2C>
}
