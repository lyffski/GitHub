import * as React from 'react'
import useLazyImgSrc from 'hooks/useLazyImgSrc'
import styled from 'styled-components'

type Props = React.HTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  base64?: string
  offset?: number
  srcSet?: string
}

export default function LazyImg({
  src,
  alt,
  base64,
  offset,
  srcSet,
  ...props
}: Props) {
  const [ref, imgUrl, loaded] = useLazyImgSrc<HTMLImageElement>(
    src,
    offset || 100,
    base64,
    srcSet
  )

  return (
    <Wrapper
      src={imgUrl}
      ref={ref}
      srcSet={loaded ? srcSet : base64}
      fade={imgUrl !== ''}
      alt={alt}
      {...props}
    />
  )
}

const Wrapper = styled.img<{ fade: boolean }>`
  width: 100%;
  transition: opacity 0.2s ease-in-out;
  opacity: ${(props) => (props.fade ? '1' : '0')};
`
