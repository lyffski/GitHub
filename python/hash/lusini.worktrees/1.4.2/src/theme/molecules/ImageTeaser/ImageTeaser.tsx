import * as React from 'react'
import styled from 'styled-components'
import Link from 'theme/atoms/Link'
import LinkArrow from 'assets/link-arrow.svg'
import theme from 'theme'
import useLazyImgSrc from 'hooks/useLazyImgSrc'
import { ms } from 'modules/browser/const'
import { OptImg } from 'utils/imageOptimization'

type Props = {
  imgSrc: string | OptImg
  link: string
  description: string
  title: string
  linkLabel: string
}

export default function ImageTeaser(props: Props) {
  const { imgSrc, link, linkLabel, description, title } = props
  const [ref, imgUrl] = useLazyImgSrc<HTMLImageElement>(imgSrc, 100)
  return (
    <div>
      <Wrapper ref={ref} imgSrc={imgUrl} to={link} className="ImageTeaser">
        <div className="teaser-description">
          <h3>{title}</h3>
          <p className="description">{description}</p>
          <div>
            <span>
              {linkLabel} <LinkArrow />
            </span>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled(Link)<{ imgSrc: string }>`
  background-image: url('${(p) => p.imgSrc}');
  display: block;
  position: relative;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 28rem;
  @media (min-width: ${ms.MD}px) {
    height: 30.5rem;
  }

  > .teaser-description {
    border-radius: 15px 15px 15px 0;
    position: absolute;
    bottom: ${theme.spacing('m')};
    left: ${theme.spacing('m')};
    margin-right: ${theme.spacing('m')};
    padding: ${theme.spacing('m')} ${theme.spacing('ml')};
    background: ${theme.colors.white};
    @media (min-width: ${ms.MD}px) {
      left: ${theme.spacing('ml')};
      bottom: ${theme.spacing('ml')};
      max-width: 41.25rem;
      padding: ${theme.spacing('ml')} ${theme.spacing('xl')};
    }
    > h3 {
      ${theme.ty('rc-2xl')}
      margin-bottom: ${theme.spacing('m')};
      @media (min-width: ${ms.MD}px) {
        ${theme.ty('rc-3xl')}
        margin-bottom: 0;
      }
    }
    > .description {
      display: none;
      @media (min-width: ${ms.MD}px) {
        color: ${theme.colors.shade.b4};
        display: block;
        ${theme.ty('r-base')}
        margin: 0;
        margin-bottom: ${theme.spacing('xs')};
      }
    }
    > div > span {
      ${theme.ty('r-s', 'bold')}
      color:${theme.colors.primary};
      @media (min-width: ${ms.MD}px) {
        display: block;
        ${theme.ty('rc-base', 'bold')}
      }
      > svg {
        margin-bottom: -3px;

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
