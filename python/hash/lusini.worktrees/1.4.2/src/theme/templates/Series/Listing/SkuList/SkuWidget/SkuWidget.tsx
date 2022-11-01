import * as React from 'react'
import styled from 'styled-components'
import { Product } from 'modules/listing/types'
import theme from 'theme'
import genProductImageUrl from 'utils/genProductImageUrl'
import Description from './Description'
import BuyBox from './BuyBox'
import Flags from 'theme/molecules/Flags'
import Link from 'theme/atoms/Link'

type Props = {
  hit: Product
}

export default function SkuWidget(props: Props) {
  return (
    <Wrapper className="SkuWidget" data-cy-collection="SkuWidget">
      <div className="img-wrapper">
        <Flags type="widget" product={props.hit} />
        <Link
          className="detail-link"
          to={`/pdp/${props.hit.containerID}/#sku=${props.hit.sku}`}
        >
          <img src={genProductImageUrl(props.hit.images.imageWeb[0], 's')} />
        </Link>
      </div>

      <Description hit={props.hit} />

      <BuyBox hit={props.hit} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  border-bottom: 1px solid ${theme.colors.shade.b6};
  padding-bottom: ${theme.spacing('ml')};

  grid:
    'ImgWrapper Description'
    '    .      Description'
    'BuyBox     BuyBox'
    / 4fr 6fr;
  grid-column-gap: ${theme.spacing('s')};
  grid-row-gap: ${theme.spacing('m')};

  > .img-wrapper {
    grid-area: ImgWrapper;
    position: relative;
    > a > img {
      width: 100%;
    }

    > .Flags {
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  > .Description {
    grid-area: Description;
  }
  > .BuyBox {
    grid-area: BuyBox;
  }

  @media (min-width: ${theme.ms.LG}px) {
    grid:
      'ImgWrapper Description BuyBox'
      / 160px 1fr 400px;
    grid-column-gap: ${theme.spacing('ml')};
  }
`
