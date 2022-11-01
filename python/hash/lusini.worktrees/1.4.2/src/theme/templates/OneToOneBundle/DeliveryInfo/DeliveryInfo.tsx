import React from 'react'
import styled from 'styled-components'
import { Product } from '../types'
import DeliveryInfo from 'theme/molecules/DeliveryInfo'
import calculateDeliveryDate from 'utils/calculateDeliveryDate'

type Props = {
  product: Product
}

export default function BundlerWidget(props: Props) {
  const { product } = props

  const deliveryInformations = React.useMemo(
    () =>
      calculateDeliveryDate(
        {
          stock: product?.stock,
          deliveryDays: product?.deliveryDays ? product?.deliveryDays : null,
          specialDelivery: product?.specialDelivery,
          sellOut: product?.sellOut,
          unit: {
            packUnit: product?.unit?.packUnit,
          },
        },
        1
      ),
    [product, 1]
  )

  return (
    <Wrapper>
      <DeliveryInfo {...deliveryInformations} />
    </Wrapper>
  )
}

const Wrapper = styled.div``
