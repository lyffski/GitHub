import * as React from 'react'
import styled from 'styled-components'
import { OptImg } from 'utils/imageOptimization'
import Link from 'theme/atoms/Link'
import useLazyImgSrc from 'hooks/useLazyImgSrc'
import theme from 'theme'

type Props = {
  optImg: OptImg
  label: string
  link: string
}

export default function CatImage(props: Props) {
  const [ref, src] = useLazyImgSrc<HTMLImageElement>(props.optImg, 100)
  return (
    <Wrapper className="CatImage" to={props.link}>
      <img src={src} ref={ref} alt={props.label} />
      <figcaption>{props.label}</figcaption>
    </Wrapper>
  )
}

const Wrapper = styled(Link)`
  width: 100%;
  > img {
    width: 100%;
  }
  > figcaption {
    text-align: center;
    margin-top: ${theme.spacing('xxs')};
    ${theme.ty('rc-base')}

    @media (min-width: ${theme.ms.SM}px) {
      ${theme.ty('rc-l')}
    }

    @media (min-width: ${theme.ms.MD}px) {
      ${theme.ty('rc-2xl')}
    }
  }
`
