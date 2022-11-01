import * as React from 'react'
import styled from 'styled-components'
import Link from 'theme/atoms/Link'
import useLazyImgSrc from 'hooks/useLazyImgSrc'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import { OptImg } from 'utils/imageOptimization'

type Props = {
  imageSrc: string | OptImg
  imageLink?: string
  label?: string
  imageCaption?: string
  imageBase64?: string
  alt: string
  fill?: boolean
}

export default function Image(props: Props) {
  const { imageSrc, imageBase64, imageLink, label, imageCaption } = props
  const [ref, imgUrl] = useLazyImgSrc<HTMLImageElement>(
    imageSrc,
    100,
    imageBase64
  )

  return (
    <Wrapper className="image-molecule" data-cy-ctx="molecules/Image">
      <ImageWrapper to={imageLink} className="image-wrapper">
        <img src={imgUrl} ref={ref} alt={props.alt} />
      </ImageWrapper>

      {imageCaption && (
        <figcaption data-cy-state="has-caption" className="caption">
          {imageCaption}
        </figcaption>
      )}
      {label && (
        <figcaption className="label" data-cy-state="has-label">
          <span>{label}</span>
        </figcaption>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.figure`
  width: 100%;
  margin: 0;
  position: relative;
  text-align: center;
  > img,
  .image-wrapper > img {
    width: 100%;
  }
  > .image-wrapper {
    width: 100%;
  }
  .caption {
    padding-top: ${theme.spacing('xxs')};
    margin: 0;
    margin-bottom: ${theme.spacing('s')};
    text-align: left;
    color: ${theme.colors.shade.b3};
    ${theme.ty('r-s')}

    @media (min-width: ${ms.MD}px) {
      margin-bottom: 0;
    }
  }
  .label {
    margin: 0;
    margin-top: ${theme.spacing('xs')};
    height: 24px;
    ${theme.ty('rc-l')}
    position: relative;
    width: 100%;

    @media (min-width: ${ms.LG}px) {
      height: 28px;
      ${theme.ty('rc-xl')}
    }

    > span {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

const ImageWrapper = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  height: auto;

  > img {
    width: 100%;
    position: static;
  }
`
