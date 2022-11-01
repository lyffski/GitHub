import React from 'react'
import styled from 'styled-components'
import { ms } from 'modules/browser/const'
import theme from 'theme'
import useContainerSize from 'hooks/useContainerSize'

type Props = {
  children: any
  className?: string
  'data-cy-ctx'?: string
  forceBigSize?: boolean
  brand?: string | null
}

export default function Container(props: Props) {
  const containerSize = useContainerSize()

  return (
    <Wrapper
      className={props.className ? 'Container ' + props.className : 'Container'}
      containerSize={props.forceBigSize ? 1300 : containerSize}
      data-cy-ctx={props['data-cy-ctx']}
      brand={props.brand}
    >
      {props.children}
    </Wrapper>
  )
}

const Wrapper = styled.div<{
  containerSize: number
  brand: string | null | undefined
}>`
  margin: 0 auto;
  box-sizing: content-box;
  max-width: ${(p) => p.containerSize}px;
  padding: 0 ${theme.spacing('xs')};

  ${(props) =>
    props.brand &&
    `
      * {
         h2 {
           color:${
             theme.colors.brand[
               props.brand.toLowerCase().replace(/[^\w]|_/g, '')
             ]
           } !important;
         }
      }
  `}

  --container-size: calc(100vw - ${theme.spacing('xs')} * 2);

  @media (min-width: ${ms.MD}px) {
    padding: 0 ${theme.spacing('s')};
    --container-size: calc(100vw - ${theme.spacing('s')} * 2);
  }

  @media (min-width: ${ms.LG}px) {
    padding: 0 ${theme.spacing('m')};
    --container-size: calc(100vw - ${theme.spacing('m')} * 2);
  }

  @media (min-width: ${(p) =>
      p.containerSize === 700
        ? 700 + theme._spacing.xs * 2
        : 1300 + theme._spacing.m * 2}px) {
    --container-size: ${(p) => (p.containerSize === 700 ? 700 : 1300)}px;
  }

  .Container {
    padding: 0px !important;
  }

  .full-width {
    width: 100vw !important;
    margin: 0 -${theme.spacing('m')};

    @media (min-width: 1340px) {
      margin: 0 calc((100vw - 1300px) / -2);
    }
  }

  .full-width-MOBILE_PORTRAIT {
    width: 100vw !important;
    margin: 0 -${theme.spacing('m')};

    @media (min-width: ${ms.SM}px) {
      width: unset !important;
      margin: unset;
    }
  }

  .full-width-TABLET_PORTRAIT {
    width: 100vw !important;
    margin: 0 ${theme.spacing('m')};

    @media (min-width: ${ms.MD}px) {
      width: unset !important;
      margin: unset;
    }
  }

  .full-width-TABLET_LANDSCAPE {
    width: 100vw !important;
    margin: 0 ${theme.spacing('m')};

    @media (min-width: ${ms.LG}px) {
      width: unset !important;
      margin: unset;
    }
  }

  .full-width-DESKTOP {
    width: 100vw !important;
    margin: 0 ${theme.spacing('m')};
    @media (min-width: 1300px) {
      margin: 0 calc((100vw - 18.75rem) / -2 - 1.25rem);
    }
  }
`
