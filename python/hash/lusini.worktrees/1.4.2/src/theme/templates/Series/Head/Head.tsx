import * as React from 'react'
import styled from 'styled-components'
import { useSeriesContainer } from 'modules/seriesDetail'
import theme from 'theme'
import genProductImageUrl from 'utils/genProductImageUrl'
import config from 'config'

export default function Head() {
  const container = useSeriesContainer()

  if (!container.data || container.isFetching) return null

  return (
    <Wrapper>
      <ImgGrid
        isSingle={container.data.images.imageWeb.length <= 1}
        className="image-list"
      >
        <img
          className="img-1"
          src={genProductImageUrl(container.data.images.imageWeb[0], 'l')}
          alt={container.data.title}
        />
        {container.data.images.imageWeb[1] && (
          <img
            className="img-2"
            src={genProductImageUrl(container.data.images.imageWeb[1], 's')}
            alt={container.data.title}
            data-cy-state="has-second-img"
          />
        )}
        {container.data.images.imageWeb[2] && (
          <img
            className="img-3"
            src={genProductImageUrl(container.data.images.imageWeb[2], 's')}
            alt={container.data.title}
            data-cy-state="has-third-img"
          />
        )}
      </ImgGrid>
      <div className="information-box">
        {container.data.attributes.Brand &&
          container.data.attributes.Brand.values.map((brand, i) => {
            return (
              <div key={i} className="brand">
                {brand.icon && brand.icon !== undefined && (
                  <div className="logo" data-cy-state="has-brand-logo">
                    <img
                      src={config.modules.cloudinary.endpoint + brand.icon}
                      alt={`${brand?.value}`}
                    />
                  </div>
                )}
                {brand.value}
              </div>
            )
          })}

        <h1>{container.data.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: container.data.description }} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  @media (min-width: ${theme.ms.MD}px) {
    display: flex;
    flex-direction: row;
    > .image-list {
      flex: 1;
    }
    > .information-box {
      margin-left: ${theme.spacing('l')};
      flex: 1;
    }
  }

  @media (min-width: ${theme.ms.LG}px) {
    > .image-list {
      flex: 3;
    }
    > .information-box {
      margin-left: ${theme.spacing('xl')};
      flex: 2;
    }
  }

  > .information-box {
    margin-top: ${theme.spacing('s')};
    > .brand {
      ${theme.ty('r-base')}
      margin-bottom: ${theme.spacing('xs')};
      display: flex;

      > .logo {
        margin-right: ${theme.spacing('xxs')};
        margin-top: 0.125rem;
        img {
          max-height: 1.25rem;
        }
      }
    }

    @media (min-width: ${theme.ms.MD}px) {
      margin-top: 0;
    }

    > h1 {
      margin-top: ${theme.spacing('xxs')};
      ${theme.ty('rc-2xl')}

      @media (min-width: ${theme.ms.MD}px) {
        margin-top: ${theme.spacing('xs')};
        ${theme.ty('rc-3xl')}
      }
    }

    > p {
      margin-top: ${theme.spacing('xxs')};
      ${theme.ty('r-s')}

      @media (min-width: ${theme.ms.MD}px) {
        margin-top: ${theme.spacing('xs')};
        ${theme.ty('r-base')}
      }
    }
  }
`

const ImgGrid = styled.div<{ isSingle: boolean }>`
  display: grid;
  height: 100%;
  > img {
    display: none;
    width: 100%;
    &:first-child {
      display: block;
    }
  }

  > .img-1 {
    grid-area: Img1;
  }
  > .img-2 {
    grid-area: Img2;
  }
  > .img-3 {
    grid-area: Img3;
  }

  @media (min-width: ${theme.ms.LG}px) {
    display: ${(props) => (props.isSingle ? 'flex' : 'grid')};
    max-width: ${(props) => (props.isSingle ? '450px' : '100%')};
    grid:
      'Img1 Img2'
      'Img1 Img3'
      / 2fr 1fr;
    grid-row-gap: ${theme.spacing('m')};
    grid-column-gap: calc(${theme.spacing('m')} * 2);

    > img {
      display: block;
      &:first-child {
        width: calc(100% + ${theme.spacing('m')});
      }
    }
  }
`
