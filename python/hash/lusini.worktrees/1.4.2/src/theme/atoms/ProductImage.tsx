import * as React from 'react'
import whitePixel from 'utils/whitePixel'
import LazyImg from 'theme/atoms/LazyImg'
import genProductImageUrl from 'utils/genProductImageUrl'
type Props = React.HTMLAttributes<HTMLImageElement> & {
  img: {
    url: string
    classes: Array<'ASSET_FS' | 'ASSETS_M' | string>
  }
  size: 'l' | 'm' | 's' | 'xs'
  alt: string
  base64?: string
}

export default function ProductImage({
  img,
  size,
  alt,
  base64,
  ...props
}: Props) {
  if (base64 === undefined) base64 = whitePixel
  return (
    <LazyImg
      className="ProductImage"
      src={genProductImageUrl(img, size)}
      alt={alt}
      offset={100}
      base64={base64}
      srcSet={`${genProductImageUrl(img, size)},
      ${genProductImageUrl(img, size, '2')} 2x`}
      {...props}
    />
  )
}
