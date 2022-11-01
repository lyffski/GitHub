import * as React from 'react'
import styled from 'styled-components'
import * as t from './types'
import CategoryHeadline from 'theme/molecules/CategoryHeadline'
import { ms } from 'modules/browser/const'
import useLazyImgSrc from 'hooks/useLazyImgSrc'
import Link from 'theme/atoms/Link'
import theme from 'theme'
import CatImage from './CatImage'
import EecTracking from 'theme/atoms/EecTracking'

export default function CategoryHeadlineWithSubCategories(props: t.Props) {
  const { categories, teaserImage } = props
  const [ref, imgUrl] = useLazyImgSrc<HTMLDivElement>(props.context.optImg, 100)

  return (
    <EecTracking config={props.eecTracking} gridArea={props.gridArea}>
      <Wrapper
        ref={ref}
        data-cy-ctx="organisms/CategoryHeadlineWithSubCategories"
      >
        {teaserImage && (
          <ImageTeaser
            data-cy-state="image-visible"
            as={Link}
            to={props.context.link}
            bg={imgUrl}
          >
            {props.imageText && (
              <div data-cy-state="image-text-visible" className="image-content">
                <h3 className="title">{props.imageText}</h3>
              </div>
            )}
          </ImageTeaser>
        )}

        <div className="headlineAndImages">
          <CategoryHeadline
            link={props.context.link}
            title={props.title !== '' ? props.title : props.context.title}
            numHits={props.context.numHits}
            headerStyle="big"
          />

          <div className="images">
            {categories.map((cat, i) => (
              <CatImage
                key={cat.imgSrc}
                label={cat.label}
                link={cat.link}
                optImg={props.context.categoryOptImg[i]}
              />
            ))}
          </div>
        </div>
      </Wrapper>
    </EecTracking>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  > .headlineAndImages {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;

    > .images {
      flex: 1;
      margin-top: ${theme.spacing('m')};
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: ${theme.spacing('s')};
      grid-row-gap: ${theme.spacing('xxs')};

      @media (min-width: ${ms.SM}px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: ${theme.spacing('m')};
        > .CatImage:nth-child(4) {
          display: none;
        }
      }

      @media (min-width: ${ms.LG}px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: ${theme.spacing('m')};
        > .CatImage:nth-child(4) {
          display: block;
        }
      }
    }
  }
`

const ImageTeaser = styled.div<{ bg: string }>`
  height: inherit;
  display: none;
  background: url('${(p) => p.bg}');
  background-size: cover;
  background-position: center center;
  position: relative;
  min-width: 385px;
  margin-right: ${theme.spacing('m')};

  @media (min-width: ${ms.XL}px) {
    display: flex;
  }

  > .image-content {
    position: absolute;
    background: rgba(255, 255, 255, 0.9);
    bottom: 0;
    left: 0;
    right: 0;
    padding: ${theme.spacing('m')};
    width: 90%;

    @media (min-width: ${ms.SM}px) {
      top: unset;
      left: 0;
      right: ${theme.spacing('s')};
      bottom: ${theme.spacing('s')};
    }

    > .title {
      ${theme.ty('rc-2xl')}
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 5.9rem;
    }
  }
`
