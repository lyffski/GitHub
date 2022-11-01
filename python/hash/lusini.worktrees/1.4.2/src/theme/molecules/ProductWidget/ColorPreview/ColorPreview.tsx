import * as React from 'react'
import styled, { css } from 'styled-components'
import ProductImage from 'theme/atoms/ProductImage'
import theme from 'theme'
import PlusIcon from 'assets/plus.svg'
import { navigate } from 'gatsby'

export type Props = {
  variantImages: string[]
  onImageHover: (string) => void
  onColorClick: (string) => void
  containerId: string
}

export default function ColorPreview(props: Props) {
  const singlePreviewImage = (images) => {
    return images.map((image, i) => (
      <div
        key={'picture' + i}
        className="preview-img"
        data-cy-handle="hover-images"
        onMouseEnter={() => props.onImageHover(image)}
        onMouseLeave={() => props.onImageHover('')}
        onClick={(event) => {
          event.stopPropagation()
          event.preventDefault()
          props.onColorClick(image)
          navigate(`/pdp/${props.containerId}/`)
        }}
      >
        <ProductImage
          data-cy-state="colorpreview-is-visible"
          img={{ url: image, classes: ['ASSET_FS'] }}
          size="xs"
          alt={'image ' + i}
        />
      </div>
    ))
  }
  return (
    <Wrapper data-cy-collection="ColorPreview" className="ColorPreview">
      {singlePreviewImage(props.variantImages.slice(0, 5))}

      {props.variantImages.length > 2 && (
        <PlusWrapper
          data-cy-state="plus-shown"
          length={props.variantImages.length}
        >
          <PlusIcon />
        </PlusWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 1.25rem;
  display: flex;
  flex-direction: row;
  justify-content: left;
  bottom: 0;
  background-color: ${theme.colors.white};
  > .preview-img {
    &:nth-child(3),
    &:nth-child(4) {
      display: none;
    }

    @media (min-width: 375px) {
      &:nth-child(3) {
        display: flex;
      }
    }

    @media (min-width: 450px) {
      &:nth-child(4) {
        display: flex;
      }
    }

    > img {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: ${theme.spacing('xxs')};
      margin-top: 0;
    }

    &:first-of-type {
      > img {
        margin-left: 0;
      }
    }
  }
`

const PlusWrapper = styled.div<{ length: number }>`
  display: none;

  ${(props) =>
    props.length > 2 &&
    css`
      display: block;
    `}

  @media (min-width: 375px) {
    display: none;
    ${(props) =>
      props.length > 3 &&
      css`
        display: block;
      `}
  }

  @media (min-width: 450px) {
    display: none;
    ${(props) =>
      props.length > 4 &&
      css`
        display: block;
      `}
  }

  > svg {
    margin-left: ${theme.spacing('xxs')};
  }
`
