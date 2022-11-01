import { useState, useEffect } from 'react'
import useInView from './useInView'
import { OptImg, optImgToSrc } from 'utils/imageOptimization'
import { useWindowSize } from 'modules/browser'
import useContainerSize from './useContainerSize'

const cache: Record<string, string> = {}
/**
 * Loads given image when in Viewport
 * Optionally displays placeholder base64 until then
 *
 * !!! Attentiton!!!
 * The ref must be attached to the image-element or on the div that contains the image
 *
 * @param {string} url - final image url
 * @param {number} offset - useInView offset
 * @param {string} base64 - optional placeholder img
 * @return {array} [{HTMLElement} ref, {string | undefined} shownImg - url]
 */
export default function useLazyImgSrc<T extends HTMLElement>(
  url: string | OptImg,
  offset: number,
  base64 = '',
  srcSet = ''
): [React.MutableRefObject<T | null>, string, boolean] {
  const cacheKey = typeof url === 'string' ? url : url.src
  base64 = typeof url === 'string' ? base64 : url.base64
  const [ref, refInVp] = useInView<T>(offset, true)
  const [shownImg, setShownImg] = useState(cache[cacheKey] || base64)
  const windowSize = useWindowSize()
  const containerSize = useContainerSize()

  useEffect(() => {
    let mounted = true
    const src = typeof url === 'string' ? url : url.src
    if (refInVp && !src.startsWith('data:image')) {
      const optSrc =
        typeof url === 'string'
          ? url
          : optImgToSrc(
              url,
              windowSize.data.name,
              ref.current as any,
              containerSize
            )
      // only return new imgSrc when it's fully loaded
      const img = new Image()
      img.onload = () => {
        mounted && setShownImg(optSrc)
        cache[src] = optSrc
      }
      if (srcSet) img.srcset = srcSet
      img.src = optSrc
    }
    return () => {
      mounted = false
    }
  }, [refInVp, url, windowSize.data.name])

  return [ref, shownImg, shownImg === url]
}
