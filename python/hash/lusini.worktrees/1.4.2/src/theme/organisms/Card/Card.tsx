import * as React from 'react'
import styled from 'styled-components'
import useLazyImgSrc from 'hooks/useLazyImgSrc'
import Link from 'theme/atoms/Link'
import * as t from './types'
import theme from 'theme'
import EecTracking from 'theme/atoms/EecTracking'

export default function Card(props: t.Props) {
  const [ref, imgUrl] = useLazyImgSrc<HTMLImageElement>(
    props.context.optImg,
    100
  )
  return (
    <EecTracking config={props.eecTracking} gridArea={props.gridArea}>
      <Wrapper
        data-cy-ctx="organisms/Card"
        to={props.link}
        data-cy-handle="link"
      >
        <div>
          <TeaserImage ref={ref} url={imgUrl} />
          <div>
            <h2>{props.title}</h2>
            <p>{props.disclaimer}</p>
          </div>
        </div>
      </Wrapper>
    </EecTracking>
  )
}
const TeaserImage = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  width: 100%;
  height: 15rem;
`

const Wrapper = styled(Link)`
  display: flex;
  position: relative;
  flex-flow: row wrap;
  justify-content: center;
  > div {
    margin-left: ${theme.spacing('s')};
    margin-right: ${theme.spacing('s')};
    height: 26.875rem;
    width: 23.75rem;
    border-radius: 0.3125rem;
    background-color: #ffffff;
    box-shadow: 0 0.625rem 1.25rem 0 rgba(0, 0, 0, 0.15),
      0 0.1875rem 0.375rem 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    > div {
      padding: ${theme.spacing('ml')};
      > h2 {
        padding: 0px;
        color: ${theme.colors.b0};
        ${theme.ty('rc-3xl')}
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      > p {
        margin: 0;
        margin-top: 7px;
        color: ${theme.colors.shade.b3};
        ${theme.ty('r-base')}
        font-weight:300;
        display: -webkit-box;
        max-width: 100%;
        margin: 0 auto;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`
