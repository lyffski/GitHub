import * as React from 'react'
import styled from 'styled-components'
import Link from 'theme/atoms/Link'
import theme from 'theme'
import LinkArrow from 'assets/link-arrow.svg'

type Props = {
  title: string
  imgUrl: string
  linkTarget: string
  linkLabel: string
  template: 'Image'
}

// proportion: 2000:1300
export default function Intersticial(props: Props) {
  return (
    <Wrapper className="Intersticial" to={props.linkTarget}>
      <img src={props.imgUrl} />

      <div className="title-wrapper">
        <h6>{props.title}</h6>
        <span>
          {props.linkLabel} <LinkArrow />
        </span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled(Link)`
  position: relative;

  > img {
    width: 100%;
  }

  .title-wrapper {
    position: absolute;
    background: white;
    bottom: ${theme.spacing('ml')};
    left: 0;
    width: 80%;
    max-width: 300px;
    padding: ${theme.spacing('m')} ${theme.spacing('ml')};

    > h6 {
      ${theme.ty('rc-2xl')};
      margin-bottom: ${theme.spacing('m')};
    }

    > span {
      ${theme.ty('r-s', 'bold')}
      color:${theme.colors.primary};
      @media (min-width: ${theme.ms.MD}px) {
        display: block;
        ${theme.ty('rc-base', 'bold')}
      }
      > svg {
        margin-bottom: -3px;
        margin-left: 3px;

        color: ${theme.colors.primary};
        #Path-5,
        #Path-6 {
          color: ${theme.colors.primary};
          stroke: ${theme.colors.primary};
        }
        g {
          color: ${theme.colors.primary};
          stroke: ${theme.colors.primary};
          filter: none;
        }
      }
    }
  }
`
