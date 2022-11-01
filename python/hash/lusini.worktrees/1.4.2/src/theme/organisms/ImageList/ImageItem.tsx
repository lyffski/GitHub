import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import useLazyImgSrc from 'hooks/useLazyImgSrc'
import * as t from './types'

export default function CategoryItem(props: t.Category) {
  const [ref, src] = useLazyImgSrc<HTMLImageElement>(
    props.optImg || props.imgSrc,
    100
  )
  return (
    <Wrapper className="category-item">
      <img src={src} ref={ref} alt={props.label} />
      <div className="category-title">
        <h3>{props.label}</h3>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 106px;
  > img {
    max-width: 120px;
  }
  @media (min-width: ${ms.SM}px) {
    max-width: 180px;
    > img {
      max-width: 180px;
    }
  }

  > .category-title {
    text-align: center;
    width: 100%;
    > h3 {
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: clip;

      color: ${theme.colors.b0};
      margin-top: ${theme.spacing('xs')};
      margin-bottom: ${theme.spacing('xs')};

      ${theme.ty('rc-s')}
      @media (min-width: ${ms.SM}px) {
        margin-top: ${theme.spacing('s')};
        margin-bottom: ${theme.spacing('s')};
        ${theme.ty('rc-base')}
      }
    }
  }
`
