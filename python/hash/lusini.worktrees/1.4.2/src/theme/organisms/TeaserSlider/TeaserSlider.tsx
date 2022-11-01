import * as React from 'react'
import styled from 'styled-components'
import * as t from './types'
import ImageTeaserMolecule from 'theme/molecules/ImageTeaser'
import useArrowNavigation from 'hooks/useSliderArrowNavigation'
import { ms } from 'modules/browser/const'
import ArrowLeftIcon from 'assets/arrow-button-left.svg'
import ArrowRightIcon from 'assets/arrow-button-right.svg'
import theme from 'theme'
import EecTracking from 'theme/atoms/EecTracking'

export default function TeaserSlider(props: t.Props) {
  const {
    lastItemRef,
    firstItemRef,
    productListRef,
    lastItemReached,
    firstItemReached,
    handleSlide,
  } = useArrowNavigation(() => {
    const container = productListRef.current?.querySelector('.TeaserContainer')
    if (!container) return 0
    const width = container.getBoundingClientRect().width
    return width + 20
  })

  return (
    <EecTracking config={props.eecTracking} gridArea={props.gridArea}>
      <Wrapper className="TeaserSlider" data-cy-ctx={'organisms/TeaserSlider'}>
        <div className={'innerSlider'} ref={productListRef}>
          <div ref={firstItemRef} className={'firstLast'}>
            &#160;
          </div>
          {props.items.map((item, i) => (
            <TeaserContainer
              className="TeaserContainer"
              isLast={i === props.items.length - 1}
              key={i}
            >
              <ImageTeaserMolecule
                imgSrc={props.context.optImages[i]}
                link={item.link}
                linkLabel={item.linkLabel}
                description={item.description}
                title={item.title}
              />
            </TeaserContainer>
          ))}
          <div ref={lastItemRef} className={'firstLast'}>
            &#160;
          </div>
        </div>

        {!firstItemReached && (
          <button
            data-cy-handle="prev-button"
            data-cy-state="has-prev-button"
            className="prevButton"
            onClick={() => handleSlide('left')}
          >
            <ArrowLeftIcon />
          </button>
        )}
        {!lastItemReached ? (
          <button
            data-cy-handle="next-button"
            data-cy-state="has-next-button"
            className="nextButton"
            onClick={() => handleSlide('right')}
          >
            <ArrowRightIcon />
          </button>
        ) : null}
      </Wrapper>
    </EecTracking>
  )
}

const Wrapper = styled.div`
  max-width: 78.75rem;
  width: 100%;
  position: relative;
  height: 28rem;
  @media (min-width: ${ms.MD}px) {
    height: 30.5rem;
  }

  .innerSlider {
    position: relative;
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;

    ::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }

    > .firstLast {
      width: 1px;
    }
  }

  > button {
    width: 3.125rem;
    height: 3.125rem;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    box-shadow: 0rem 0.5rem 0.9375rem #828282;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    display: flex;
    background: ${theme.colors.white};

    &.prevButton {
      left: ${theme.spacing('xs')};
    }

    &.nextButton {
      right: ${theme.spacing('xs')};
    }
  }
`

const TeaserContainer = styled.div<{ isLast: boolean }>`
  width: 100%;
  max-width: 62.5rem;
  flex-shrink: 0;
  height: 100%;
  margin-right: ${(p) => (p.isLast ? 0 : theme.spacing('m'))};
`
