import * as React from 'react'
import styled from 'styled-components'
import { Product } from '../../types'
import theme from 'theme'
import priceStr from 'utils/priceString'
import B2cSwitch from 'theme/atoms/B2cSwitch'
import { PriceB2BGrossInfo, PriceB2CNetInfo } from './PriceSwitch'

type Props = {
  firstProduct: Product
  secondProduct: Product
  amount: number
}

export default function Price(props: Props) {
  const { firstProduct, secondProduct, amount } = props
  const [net, setNet] = React.useState(0)
  const [gross, setGross] = React.useState(0)

  const firstProductNet =
    firstProduct.prices['productCheapestPiecePriceNet'] || 0
  const secondProductNet =
    secondProduct.prices['productCheapestPiecePriceNet'] || 0
  const firstProductgross =
    firstProduct.prices['productCheapestPiecePriceGross'] || 0
  const secondProductGross =
    secondProduct.prices['productCheapestPiecePriceGross'] || 0

  React.useEffect(() => {
    setNet((firstProductNet + secondProductNet) * amount)
    setGross((firstProductgross + secondProductGross) * amount)
  }, [firstProduct, secondProductNet, amount])

  return (
    <Wrapper>
      <div className="sum">
        {<B2cSwitch.B2B>{priceStr(net)}</B2cSwitch.B2B>}
        {<B2cSwitch.B2C>{priceStr(gross)}</B2cSwitch.B2C>}
      </div>
      <span className="tax">
        <PriceB2BGrossInfo piecePriceGross={gross} />
        <PriceB2CNetInfo />
      </span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: left;
  margin-bottom: ${theme.spacing('m')};

  @media (min-width: ${theme.ms.LG}px) {
    padding-top: ${theme.spacing('m')};
  }
  .sum {
    ${theme.ty('r-l', '700')};
    margin-top: 0;
    margin-bottom: 0;
  }

  > .tax {
    ${theme.ty('r-s')};
    color: ${theme.colors.shade.b3};
    margin-top: 0;
    margin-bottom: 0;
  }
`
