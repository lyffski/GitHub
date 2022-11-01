import * as React from 'react'
import styled from 'styled-components'
import { ms } from 'modules/browser/const'
import { useDisplayVariant } from 'modules/productDetail'
import theme from 'theme'
import ProductImage from 'theme/atoms/ProductImage'
import * as evt from './events'
import useTouchScroll from './hooks/useTouchScroll'
import { SRLWrapper, useLightbox } from 'simple-react-lightbox'
import genProductImageUrl from 'utils/genProductImageUrl'
import Back from 'assets/back.svg'
import useThumbnails from './hooks/useThumbnails'
import Flags from 'theme/molecules/Flags'
import config from 'config'
import WistiaPlayer from 'theme/atoms/WistiaPlayer'

type Props = {
  path: string
}

export default function Gallery(props: Props) {
  const videoWrapperRef = React.useRef<HTMLDivElement>(null)
  const variant = useDisplayVariant()
  const thumbs = useThumbnails(
    variant.data.images.imageWeb.length +
      (variant.data.images.video ? variant.data.images.video.length : 0)
  )

  const { holder, bar, index } = useTouchScroll(variant.data.sku)
  const { openLightbox } = useLightbox()
  const lightImages = variant.data.images.imageWeb.map((item, i) => ({
    key: i,
    src: genProductImageUrl(item, 'l'),
  }))

  const trackChangeImageEvent = (index) => {
    if (variant.data.sku !== 'dummy') {
      evt.changeImage(index, variant.data.title, props.path, variant.data.sku)
    }
  }

  React.useMemo(() => {
    //Desktop Tracking
    trackChangeImageEvent(thumbs.index)
  }, [thumbs.index])

  React.useMemo(() => {
    //Mobile Tracking
    trackChangeImageEvent(index)
  }, [index])
  const callbacks = React.useMemo(() => {
    return {
      onSlideChange: (img) => thumbs.setIndex(img.index),
    }
  }, [])

  React.useEffect(() => {
    thumbs.setIndex(0)
  }, [variant.data.sku])

  React.useEffect(() => {
    const imgContainerHeight =
      document.querySelector('.img-container')?.clientHeight

    if (!videoWrapperRef.current || !imgContainerHeight) return
    videoWrapperRef.current.style.height = imgContainerHeight.toString() + 'px'
  }, [videoWrapperRef.current])

  return (
    <Wrapper className="Gallery" data-cy-collection="Gallery">
      <div className="thumbnails">
        <div className="thumbs-inner" ref={thumbs.ref}>
          {variant.data.images.imageWeb.map((img, i) => (
            <Thumb
              key={i}
              onClick={() => thumbs.setIndex(i)}
              selected={i === thumbs.index}
              data-cy-handle="thumb"
            >
              <ProductImage img={img} alt={variant.data.title} size="s" />
            </Thumb>
          ))}
          {variant.data.images.video &&
            variant.data.images.video.map((vid, j) => {
              const index = variant.data.images.imageWeb.length + j
              const url = `https://res.cloudinary.com/lusini/image/upload/v1626872250/lusini-play-image.jpg`

              return (
                <Thumb
                  key={index}
                  onClick={() => thumbs.setIndex(index)}
                  selected={index === thumbs.index}
                  data-cy-handle="thumb"
                >
                  <VidThumb src={url} alt={variant.data.title} />
                </Thumb>
              )
            })}
        </div>

        {thumbs.showDecrement && (
          <button
            className="prev"
            onClick={thumbs.decrement}
            data-cy-handle="thumb-prev-button"
            data-cy-state="show-thumbs-next"
          >
            <div>
              <Back />
            </div>
          </button>
        )}
        {thumbs.showIncrement && (
          <button
            className="next"
            onClick={thumbs.increment}
            data-cy-handle="thumb-next-button"
            data-cy-state="show-thumbs-prev"
          >
            <div>
              <Back />
            </div>
          </button>
        )}
      </div>
      <div className="main">
        <div className="main-inner" ref={holder}>
          {variant.data.images.imageWeb.length > 0 &&
            (variant.data.images.imageWeb[0].classes[0] === 'DUMMY' ||
              variant.data.images.imageWeb[0].url === '') &&
            !variant.isFetching && (
              <MainImg isActive={true} data-cy-state="show-placeholder-image">
                <img src={config.modules.cloudinary.fallback_product_picture} />
              </MainImg>
            )}
          {variant.data.images.imageWeb.length === 0 && (
            <MainImg isActive={true} data-cy-state="show-placeholder-image">
              <img src={config.modules.cloudinary.fallback_product_picture} />
            </MainImg>
          )}
          {variant.data.images.imageWeb.map((img, i) => (
            <MainImg
              isActive={i === thumbs.index}
              key={i}
              data-cy-handle="main-image"
              onClick={() => openLightbox(i)}
              className="img-container"
            >
              <ProductImage
                // img={{ ...img, classes: ['ASSET_FS'] }}
                img={img}
                alt={variant.data.title}
                size="l"
              />
            </MainImg>
          ))}
          {variant.data.images.video &&
            variant.data.images.video.map((vid, j) => {
              const index = variant.data.images.imageWeb.length + j
              return (
                <MainImg
                  isActive={index === thumbs.index}
                  key={index}
                  ref={videoWrapperRef}
                  data-cy-handle="main-image"
                >
                  <WistiaPlayer
                    link={vid.wistiaID || ''}
                    data-cy-state="wistia-player"
                  />{' '}
                </MainImg>
              )
            })}
        </div>

        <div className="flag-wrapper">
          <Flags product={variant.data} type={'pdp'} />
        </div>
      </div>
      <div className="indicator">
        <Bar ref={bar} elements={thumbs.numThumbs} activeIndex={thumbs.index} />
      </div>

      <SRLWrapper
        options={{
          thumbnails: { showThumbnails: false },
          caption: { showCaption: false },
          buttons: {
            showAutoplayButton: false,
            showDownloadButton: false,
            showFullscreenButton: false,
            backgroundColor: theme.colors.white,
            iconColor: theme.colors.b0,
          },
          settings: {
            overlayColor: 'rgb(255, 255, 255)',
          },
        }}
        elements={lightImages}
        callbacks={callbacks}
      />
    </Wrapper>
  )
}

const VidThumb = styled.img`
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${ms.LG}px) {
    flex-direction: row;
  }

  > .thumbnails {
    display: none;

    @media (min-width: ${ms.LG}px) {
      width: 140px;
      position: relative;
      height: auto;
      display: block;
      overflow: hidden;

      > .thumbs-inner {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        transition: transform 0.3s ease-out;
        > .video-thumb {
          margin-bottom: ${theme.spacing('m')};
          cursor: pointer;
        }
      }

      > button {
        position: absolute;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: white;
        transform: translate(-50%, 0);
        left: 50%;

        > div {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          > svg {
            g {
              stroke: ${theme.colors.shade.b1};
            }
          }
        }

        @media (min-width: ${ms.XL}px) {
          width: 50px;
          height: 50px;
        }

        &.prev {
          top: ${theme.spacing('xs')};
          > div {
            transform: rotate(90deg);
          }
        }
        &.next {
          bottom: ${theme.spacing('xs')};
          > div {
            transform: rotate(270deg);
          }
        }
      }

      > button {
        display: none;
      }
      &:hover {
        > button {
          display: block;
        }
      }
    }
  }

  > .main {
    width: 100%;
    padding-top: 2px;
    @media (min-width: ${ms.LG}px) {
      margin-left: ${theme.spacing('m')};
    }
    overflow: hidden;
    cursor: pointer;
    position: relative;

    > .main-inner {
      display: flex;
      &.animate {
        transition: transform 0.3s ease-out;
      }
    }

    > .flag-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }

  > .indicator {
    width: 100%;
    height: 4px;
    background: #f5e8d0;
    position: relative;
    margin-top: ${theme.spacing('m')};
    @media (min-width: ${ms.LG}px) {
      display: none;
    }
  }
`

const Thumb = styled.div<{ selected: boolean }>`
  margin-bottom: ${theme.spacing('m')};
  border: 1px solid ${(p) => (p.selected ? 'black' : 'transparent')};
  cursor: pointer;
`

const MainImg = styled.div<{ isActive: boolean }>`
  min-width: 100%;

  @media (min-width: ${ms.LG}px) {
    display: ${(p) => (p.isActive ? 'block' : 'none')};
  }

  > .ProductImage {
    width: 100%;
  }
`

const Bar = styled.div<{ elements: number; activeIndex: number }>`
  width: ${(p) => 100 / p.elements}%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
    270deg,
    ${theme.colors.shade.primaryBrighter} 0%,
    ${theme.colors.primary} 100%
  );
  transition: margin-left 0.3s ease-out;
  position: absolute;
`
