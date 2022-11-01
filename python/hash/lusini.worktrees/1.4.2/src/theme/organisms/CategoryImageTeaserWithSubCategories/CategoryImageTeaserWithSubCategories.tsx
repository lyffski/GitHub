import * as React from 'react'
import styled from 'styled-components'
import * as t from './types'
import { ms } from 'modules/browser/const'
import Link from 'theme/atoms/Link'
import Image from 'theme/molecules/Image'
import CategoryImageTeaser from 'theme/molecules/CategoryImageTeaser'
import theme from 'theme'
import EecTracking from 'theme/atoms/EecTracking'

export default function CategoryImageTeaserWithSubCategories(props: t.Props) {
  const { categories } = props

  return (
    <EecTracking config={props.eecTracking} gridArea={props.gridArea}>
      <Wrapper
        data-cy-ctx="organisms/CategoryImageTeaserWithSubCategories"
      >
        <CategoryImageTeaser
          bg={props.context.optImg}
          title={props.title || props.context.title}
          link={props.context.link}
          type={props.style}
          numHits={props.context.numHits}
          imageBase64={props.context.optImg.base64}
          isSeries={props.context.isSeries}
        />
        <div className="categoryImagesContainer">
          {categories.map((cat, i) => {
            return (
              <div key={i}>
                <Link
                  to={cat.link}
                  className={cat.textStyle}
                  data-cy-handle="productLink"
                >
                  <Image
                    imageSrc={props.context.categoryOptImg[i]}
                    imageBase64={props.context.categoryOptImg[i].base64}
                    alt=""
                  />
                  <h3>{cat.label}</h3>
                </Link>
              </div>
            )
          })}
        </div>
      </Wrapper>
    </EecTracking>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 75rem;

  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);

  > .categoryImagesContainer {
    display: flex;
    flex-wrap: wrap;
    height: 16.25rem;
    overflow: hidden;
    justify-content: center;

    > div {
      margin: ${theme.spacing('m')} ${theme.spacing('xs')};
      width: 10rem;
      overflow: hidden;
      text-overflow: ellipsis;
      @media (min-width: ${ms.XS}px) and (max-width: ${ms.XL}px) {
        :last-child {
          display: none;
        }
        @media (min-width: ${ms.XS}px) and (max-width: ${ms.MD}px) {
          :nth-last-child(-n + 2) {
            display: none;
          }
        }
        > a img {
          margin-bottom: ${theme.spacing('xs')};
          max-width: 100%;
        }
        > .left {
          text-align: left;
          color: ${theme.colors.b0};
        }
      }
    }
  }
`
