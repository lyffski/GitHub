import * as React from 'react'
import EecTracking from 'theme/atoms/EecTracking'
import styled from 'styled-components'
import theme from 'theme'
import Link from 'theme/atoms/Link'
import { ms } from 'modules/browser/const'
import CategoryItem from './ImageItem'
import * as t from './types'

export default function ImageList(props: t.Props) {
  return (
    <EecTracking
      config={props.eecTracking}
      gridArea={props.gridArea}
      threshold={1}
    >
      <Wrapper>
        <div className="headline">{props.title}</div>
        <div className="brand-wrapper">
          {props.categories.map((item, i) => (
            <Link key={i} to={item.link} className="teaser-wrapper">
              <CategoryItem
                label={item.label}
                optImg={props.context.categoryOptImg[i]}
                imgSrc={item.imgSrc}
                link="#"
              />
            </Link>
          ))}
        </div>
      </Wrapper>
    </EecTracking>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding: ${theme.spacing('ml')} ${theme.spacing('xs')};
  @media (min-width: ${ms.SM}px) {
    padding: ${theme.spacing('xl')} 0;
  }
  > .headline {
    display: block;
    ${theme.ty('rc-2xl')}
    color: ${theme.colors.b0};
    margin: ${theme.spacing('xs')} 0;
    @media (min-width: ${ms.SM}px) {
      margin: ${theme.spacing('m')} 0;
      ${theme.ty('rc-3xl')};
    }
  }
  > .brand-wrapper {
    display: grid;

    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: ${theme.spacing('xs')};
    justify-content: space-around;
    @media (min-width: ${ms.SM}px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-gap: ${theme.spacing('m')};
      justify-content: space-between;
      max-width: 100%;
    }
    > .teaser-wrapper {
      text-align: center;
    }
  }
`
