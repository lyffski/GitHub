import * as React from 'react'
import styled from 'styled-components'
import * as t from './types'
import RawMarkdown from 'theme/atoms/Markdown'
import ImageMolecule from 'theme/molecules/Image'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import { OptImg } from 'utils/imageOptimization'

export default function Markdown(props: t.Props) {
  return (
    <Wrapper
      centered={props.centered}
      imagePosition={props.imagePosition}
      data-cy-ctx="organisms/Markdown"
      imageWidth={props.imageWidth}
      hasCaption={Boolean(props.imageCaption)}
    >
      {props.imageSrc && (
        // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
        <ImageMolecule
          imageSrc={props.context.optImg as OptImg}
          imageBase64={props.context.imageBase64}
          imageLink={props.imageLink}
          label={''}
          alt={props.imageAlt}
          imageCaption={props.imageCaption}
        />
      )}
      <RawMarkdown html={props.md} />
    </Wrapper>
  )
}

const Wrapper = styled.div<{
  centered: boolean
  imagePosition: string
  imageWidth: 30 | 40 | 50
  hasCaption: boolean
}>`
  ${(props) =>
    props.centered &&
    `
    text-align: center;
  `}

  & .image-molecule {
    > img {
      width: inherit;
      height: inherit;
    }

    margin-bottom: ${(p) => (p.hasCaption ? '0px' : theme.spacing('m'))};

    @media (min-width: ${ms.SM}px) {
      float: ${(props) => (props.imagePosition === 'left' ? `left` : `right`)};
      margin: ${(props) =>
        props.imagePosition === 'left'
          ? ` 0 ${theme.spacing('m')} 0 0`
          : `0 0 0 ${theme.spacing('m')}`};
      width: ${(p) => p.imageWidth}%;
    }
  }

  .onetrust-btn {
    ${theme.ty('rc-base', '700')};
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    display: block;
    box-sizing: border-box;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.b0};
    padding: ${theme.spacing('xs')} ${theme.spacing('xl')};
    ${theme.rounding('m')};
  }
`
