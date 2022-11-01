import config from 'config'
import whitePixel from './whitePixel'

export default function genProductImageUrl(
  img:
    | {
        url: string
        classes: Array<'ASSET_FS' | 'ASSETS_M' | 'DUMMY' | string>
      }
    | undefined,
  size: 'l' | 'm' | 's' | 'xs',
  scale?: string
) {
  if (img) {
    if (img.classes[0]) {
      if (img.url !== '') {
        if (img.classes[0] === 'DUMMY') {
          return whitePixel
        } else {
          const isFs =
            img.classes[0] === 'ASSET_FS' ||
            img.classes[0] === 'FOREIGN_ARTICLE_IMAGE'
          let key = (isFs ? 'freisteller_' : 'milieu_') + size
          if (scale) key += '_' + scale
          const transformation = config.modules.cloudinary.transformations[key]

          return (
            config.modules.cloudinary.endpoint + transformation + '/' + img.url
          )
        }
      }
      return config.modules.cloudinary.fallback_product_picture
    }
    return config.modules.cloudinary.fallback_product_picture
  }
  return config.modules.cloudinary.fallback_product_picture
}
