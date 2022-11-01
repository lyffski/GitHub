import * as React from 'react'
import styled, { css } from 'styled-components'
import useLazyImgSrc from 'hooks/useLazyImgSrc'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import Link from 'theme/atoms/Link'
import { FiArrowRight } from 'react-icons/fi'
import useTranslations from 'hooks/useTranslations'
import { OptImg } from 'utils/imageOptimization'

export type Props = {
  bg: string | OptImg
  title: string
  link: string
  type: 'top' | 'prominent' | 'small'
  imageBase64?: string
  numHits: number | null
  isSeries?: boolean
}

export default function CategoryImageTeaser(props: Props) {
  const t = useTranslations<'molecules-CategoryImageTeaser'>()
  const [ref, imgUrl] = useLazyImgSrc<HTMLDivElement>(
    props.bg,
    100,
    props.imageBase64
  )

  return (
    <Wrapper
      data-cy-ctx="molecules/CategoryImageTeaser"
      ref={ref}
      bg={imgUrl}
      to={props.link}
      type={props.type}
    >
      <div className="content">
        <h3>{props.title}</h3>
        <small>
          {props.numHits}{' '}
          {props.isSeries
            ? t('categoryImageTeaser_series_label')
            : t('categoryImageTeaser_products_label')}
        </small>
        {props.type !== 'top' && (
          <div className="info" data-cy-state="show-info-text">
            {t('categoryImageTeaser_link_label')}
            <FiArrowRight />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

type WrapperProps = {
  bg: string
  type: 'top' | 'prominent' | 'small'
}

const Wrapper = styled(Link)<WrapperProps>`
  display: block;
  background: url('${(p) => p.bg}');
  background-size: cover;
  background-position: center center;
  position: relative;
  width: 100%;
  min-height: ${(p) => (p.type === 'small' ? '17.75rem' : '25rem')};
  height: 100%;
  > .content {
    position: absolute;
    background: ${theme.colors.white};
    ${(p) =>
      p.type === 'top'
        ? css`
            top: ${theme.spacing('ml')};
          `
        : css`
            bottom: ${theme.spacing('ml')};
          `}
    left: ${(p) => (p.type === 'small' ? 0 : theme.spacing('ml'))};
    width: 14.75rem;
    max-width: 90%;
    padding: ${(p) =>
      p.type === 'prominent'
        ? `${theme.spacing('ml')} ${theme.spacing('m')}`
        : p.type === 'small'
        ? `${theme.spacing('s')} ${theme.spacing('m')}`
        : theme.spacing('m')};

    ${(p) =>
      p.type === 'top' &&
      css`
        border-radius: 0 15px 15px 15px;
      `}
    ${(p) =>
      p.type === 'prominent' &&
      css`
        border-radius: 15px 15px 15px 0;
      `}

    @media (min-width: ${ms.MD}px) {
      ${(p) =>
        p.type === 'prominent' &&
        css`
          padding: ${theme.spacing('l')};
        `}
    }

    > h3 {
      ${(p) => (p.type === 'prominent' ? theme.ty('rc-2xl') : theme.ty('rc-l'))}
      ${(p) =>
        p.type === 'small' &&
        css`
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `}

      @media (min-width: ${ms.MD}px) {
        ${(p) =>
          p.type === 'prominent' ? theme.ty('rc-3xl') : theme.ty('rc-2xl')}
      }
    }

    > small {
      ${(p) => (p.type === 'prominent' ? theme.ty('r-base') : theme.ty('r-s'))}
      color: ${theme.colors.shade.b4};
    }

    > .info {
      ${theme.ty('rc-base', 'bold')}
      margin-top: ${(p) =>
        p.type === 'prominent' ? theme.spacing('ml') : theme.spacing('xs')};
      color: ${theme.colors.primary};
      ${(p) =>
        p.type === 'small' &&
        css`
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `}
      > svg {
        color: ${theme.colors.primary};
        margin-bottom: -3px;
        margin-left: 5px;
      }
    }
  }
`
