import { GridContext } from '@kaminrunde/fireside-utils'
import { ms } from 'modules/browser/const'
import imageToBase64 from 'utils/imageToBase64'
import config from 'config'
import sizeOf from 'buffer-image-size'
import decode from 'data-uri-to-buffer'
import whitePixel from './whitePixel'

type MS = keyof typeof ms

export type OptImg = {
  src: string
  widths: Record<MS, number>
  manipulated: boolean
  base64: string
  ratio: number
}

const smallerImgSrc = (src: string) => {
  const params = `w_40,f_auto,dpr_1`
  return (
    config.modules.cloudinary.endpoint +
    'image/fetch/' +
    params +
    '/' +
    encodeURIComponent(src)
  )
  // return src.replace('/upload/', '/upload/' + params + '/')
}

export async function createOptImg(
  src: string,
  ctx: GridContext,
  modulator: Partial<Record<MS, number>> = {}
): Promise<OptImg> {
  const base64 = (await imageToBase64(smallerImgSrc(src))) || whitePixel
  const size = sizeOf(decode(base64))
  const widths: Record<MS, number> = {
    XS: 1,
    SM: 1,
    MD: 1,
    LG: 1,
    XL: 1,
  }

  let manipulated = false
  let ctxMs = ctx.byMediaSize['XS']
  const orderedMs: MS[] = ['XS', 'SM', 'MD', 'LG', 'XL']

  for (const key of orderedMs) {
    ctxMs = ctx.byMediaSize[key] || ctxMs
    if (!ctxMs) continue
    const size = ctxMs.colStretch / ctxMs.totalCols
    widths[key] = size
  }

  if (src.match(/[wWhHqQxXyYcC]_/)) {
    manipulated = true
  }

  if (!src.includes('/image/upload/')) {
    manipulated = true
  }

  if (!size.width) throw new Error('could not resolve dimensions')

  for (const ms in modulator) {
    widths[ms] = widths[ms] * modulator[ms]
  }

  return {
    src: src,
    widths: widths,
    manipulated,
    base64,
    ratio: (size.width || 1) / (size.height || 1),
  }
}

const msWidth = {
  XS: ms['SM'],
  SM: ms['MD'],
  MD: ms['LG'],
  LG: ms['XL'],
  XL: 2000,
}

export function optImgToSrc(
  optImg: OptImg,
  mediaSize: MS,
  bgRef: HTMLElement | HTMLImageElement,
  maxWidth: number
): string {
  const isBg = bgRef.tagName !== 'IMG'
  let windowWidth = msWidth[mediaSize]
  if (windowWidth > maxWidth) windowWidth = maxWidth
  const size = optImg.widths[mediaSize]
  let dpr = window.devicePixelRatio
  if (dpr > 2) dpr = 2
  let imgWidth = Math.ceil(windowWidth * size)

  if (isBg) {
    const rect = bgRef.getBoundingClientRect()
    const rectRatio = rect.width / rect.height

    if (rectRatio < optImg.ratio) {
      imgWidth = Math.ceil(windowWidth * size * optImg.ratio)
    }
  }

  const params = `w_${imgWidth},f_auto,dpr_${dpr}${
    optImg.manipulated ? '' : ',q_80'
  }`
  const src = optImg.manipulated
    ? config.modules.cloudinary.endpoint +
      'image/fetch/' +
      params +
      '/' +
      encodeURIComponent(optImg.src)
    : optImg.src.replace('/upload/', '/upload/' + params + '/')
  return src
}
