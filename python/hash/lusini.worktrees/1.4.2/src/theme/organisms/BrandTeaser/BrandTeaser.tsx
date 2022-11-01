import * as React from 'react'
import EecTracking from 'theme/atoms/EecTracking'
import * as eec from 'utils/eec'
import styled from 'styled-components'
import theme from 'theme'
import Link from 'theme/atoms/Link'
import LinkArrow from 'assets/link-arrow.svg'
import VegaSVG from 'assets/brands/vega.svg'
import ErwinMSVG from 'assets/brands/erwin-m.svg'
import PulsivaSVG from 'assets/brands/pulsiva.svg'
import JobelineSVG from 'assets/brands/jobeline.svg'
import LusiniSVG from 'assets/brands/lusini.svg'
import { ms } from 'modules/browser/const'
// BRANCH DEPLOY
type Props = {
  gridArea: string
  label: string
  items: {
    name: string
    imgSrc: string
    link: string
    linkLabel: string
    svg?: any
    logo: string
  }[]
  eecTracking?: eec.TrackingConfig
}

export default function BrandTeaser(props: Props) {
  const brands = props.items
  const svgObj = {
    vega: VegaSVG,
    erwinM: ErwinMSVG,
    pulsiva: PulsivaSVG,
    jobeline: JobelineSVG,
    lusini: LusiniSVG,
  }
  const svgLoader = (brand) => {
    const Svg = svgObj[brand]
    return <Svg data-cy-state="logo" />
  }

  return (
    <EecTracking
      config={props.eecTracking}
      gridArea={props.gridArea}
      threshold={1}
    >
      <Wrapper data-cy-ctx="organisms/BrandTeaser">
        <div>
          <div className="headline" data-cy-state="headline">
            {props.label}
          </div>
          <div className="brand-wrapper">
            {brands.map((item, i) => (
              <div
                className="teaser-wrapper"
                data-cy-state="brand-wrapper"
                key={i}
              >
                <Teaser
                  data-cy-state="teaser"
                  imgSrc={item.imgSrc}
                  to={item.link}
                  className="ImageTeaser"
                >
                  <div className="teaser-description">
                    <div
                      className="teaser-description-headline"
                      data-cy-state="brand-description"
                    >
                      {svgLoader(item.logo)}
                      <h3 data-cy-state="title">{item.name}</h3>
                    </div>
                    <div>
                      <span data-cy-state="link" data-cy-handle="link">
                        {item.linkLabel} <LinkArrow />
                      </span>
                    </div>
                  </div>
                </Teaser>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </EecTracking>
  )
}

const Wrapper = styled.div`
  width: 100%auto;

  > div {
    display: block;
    width: 100%;

    > .headline {
      height: 1.75rem;
      margin-top: ${theme.spacing('ml')};
      margin-bottom: 1rem;
      ${theme.ty('rc-2xl')};
      @media (min-width: ${ms.XL}px) {
        display: block;
        height: 2.25rem;
        ${theme._ty([28, 0, 36], theme.fontSpecial, '400')};
        line-height: 2.25rem;
        margin-bottom: ${theme.spacing('m')};
      }
    }

    > .brand-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
      grid-auto-rows: 1fr;
      grid-gap: ${theme.spacing('s')};
      @media (min-width: ${ms.SM}px) {
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        grid-auto-rows: 1fr;
        grid-gap: ${theme.spacing('m')};
      }
      @media (min-width: ${ms.MD}px) {
        grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
        grid-auto-rows: 1fr;
        grid-gap: ${theme.spacing('xxs')};
      }
      @media (min-width: ${ms.LG}px) {
        grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
        grid-auto-rows: 1fr;
        grid-gap: ${theme.spacing('m')};
      }
      @media (min-width: ${ms.XL}px) {
        grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
        grid-auto-rows: 1fr;
        grid-gap: 1rem;
      }

      ::before {
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
      }

      *:first-child {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
      }
    }
  }
`
const Teaser = styled(Link)<{ imgSrc: string }>`
  background-image: url('${(p) => p.imgSrc}');
  display: block;
  position: relative;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  > .teaser-description {
    background: ${theme.colors.white};
    position: absolute;
    bottom: ${theme.spacing('l')};
    margin-right: ${theme.spacing('l')};
    min-width: 8.125rem;
    @media (min-width: ${ms.SM}px) {
      padding: ${theme.spacing('xxs')} ${theme.spacing('s')};
      bottom: ${theme.spacing('m')};
      min-height: 5rem;
      min-width: 9.375rem;
    }
    @media (min-width: ${ms.MD}px) {
      max-height: 1.25rem;
      min-width: 9.25rem;
    }
    @media (min-width: ${ms.LG}px) {
      padding: ${theme.spacing('xs')} ${theme.spacing('xs')};
      max-height: 5rem;
      min-width: 9.375rem;
    }
    @media (min-width: ${ms.XL}px) {
      padding: ${theme.spacing('m')} ${theme.spacing('s')};
      bottom: ${theme.spacing('m')};
      max-height: 6.875rem;
      min-width: 12.5rem;
    }
    > .teaser-description-headline {
      min-height: 2.5rem;
      display: flex;
      margin-bottom: ${theme.spacing('xxs')};
      @media (min-width: ${ms.XL}px) {
        margin-bottom: ${theme.spacing('xs')};
      }
      align-items: flex-end;
      > svg {
        width: 1.875rem;
        @media (min-width: ${ms.XL}px) {
          width: 2.875rem;
        }
        margin-right: 0.5rem;
      }
      > h3 {
        ${theme.ty('rc-base')}
        white-space: nowrap;
        margin-right: ${theme.spacing('xxs')};
        @media (min-width: ${ms.XL}px) {
          ${theme.ty('rc-2xl')}
        }
      }
    }
    > div {
      margin-bottom: ${theme.spacing('xs')};
      margin-left: ${theme.spacing('xs')};
      > span {
        ${theme.ty('rc-s', 'bold')}
        color:${theme.colors.primary};
        @media (min-width: ${ms.XL}px) {
          display: block;
          ${theme.ty('rc-base', 'bold')}
        }
        > svg {
          margin-bottom: -0.1875rem;

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
  }
`
