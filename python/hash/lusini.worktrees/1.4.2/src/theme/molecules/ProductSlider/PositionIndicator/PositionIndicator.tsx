import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'

type Props = {
  componentRef: React.RefObject<null | HTMLDivElement>
  maxSteps: number
  offset: number
  displayedSteps: number
  'data-cy-state': string
}

export default function PositionIndicator(props: Props) {
  const indicatorRef = React.useRef<null | HTMLDivElement>(null)
  const wrapperRef = React.useRef<null | HTMLDivElement>(null)

  /**
   * calc initial indicator width. the width is proportional the displayed
   * content relative to the full content (just like the browser scrollbar)
   */
  React.useEffect(() => {
    if (!indicatorRef.current) return
    if (!props.componentRef.current) return
    const displayedWidth = props.componentRef.current.offsetWidth
    const innerWidth = props.componentRef.current.scrollWidth
    const step = (innerWidth - props.offset) / props.displayedSteps
    const maxWidth = step * props.maxSteps
    const widthPercent = Math.round((displayedWidth / maxWidth) * 100)
    indicatorRef.current.style.width = widthPercent + '%'

    // remove indicator when width is 100%
    if (widthPercent === 100) {
      if (!wrapperRef.current) return
      wrapperRef.current.style.display = 'none'
    }
  }, [props.maxSteps, props.offset, props.displayedSteps])

  /**
   * defines the left margin for the scroll-bar.
   */
  React.useEffect(() => {
    if (!props.componentRef.current) return
    const l = () => {
      if (!indicatorRef.current || !props.componentRef.current) return
      if (!wrapperRef.current) return
      const scrollLeft = props.componentRef.current.scrollLeft
      const displayedWidth = props.componentRef.current.offsetWidth
      const innerWidth = props.componentRef.current.scrollWidth
      const step = (innerWidth - props.offset) / props.displayedSteps
      const maxWidth = step * props.maxSteps
      let scrollPercent = (scrollLeft / (maxWidth - displayedWidth)) * 100
      // substract scrollbar size
      const wrapperWidth = wrapperRef.current.offsetWidth
      const indicatorWidth = indicatorRef.current.offsetWidth
      scrollPercent = scrollPercent * (1 - indicatorWidth / wrapperWidth)
      indicatorRef.current.style.left = scrollPercent + '%'
    }
    props.componentRef.current.addEventListener('scroll', l)
    return () => {
      if (props.componentRef.current)
        props.componentRef.current.removeEventListener('scroll', l)
    }
  }, [props.maxSteps, props.offset, props.displayedSteps])

  return (
    <Wrapper
      className="PositionIndicator"
      ref={wrapperRef}
      data-cy-state={props['data-cy-state']}
    >
      <div className="indicator" ref={indicatorRef}></div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 99%;
  margin: 0 auto;
  height: 0.125rem;
  color: #f5e8d0;
  background: ${theme.colors.shade.primaryUltraBright};
  height: 0.3125rem;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  > .indicator {
    width: 0%; /* will be recalculated */
    height: 0.3125rem;
    background: linear-gradient(
      270deg,
      ${theme.colors.shade.primaryBrighter} 0%,
      ${theme.colors.primary} 100%
    );
    border-radius: 1rem;
    position: absolute;
    left: 0; /* will be recalculated */
  }
`
