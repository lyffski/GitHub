import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { ms } from 'modules/browser/const'
import useDelayedFn from 'hooks/useDelayedFn'
import CloseIcon from 'assets/menu-close.svg'
import theme from 'theme'
import ScrollLock from 'react-scrolllock'

export type DrawerApi = {
  close: () => void
}

type Props =
  | {
      /** triggered after the close animation ended */
      onClose: () => void
      onTriggerDLEvent?: (event: string) => void
      /** triggered before the close animation starts */
      onCloseStart?: () => void
      label?: any
      children: React.ReactNode
      visible: boolean
      fromLeft?: boolean
      maxWidth?: string
      hideOverlay?: boolean
      className?: string
      apiRef?: React.MutableRefObject<null | DrawerApi>
      'data-cy-handle-overlay'?: string
      'data-cy-handle-close-icon'?: string
      'data-cy-ctx'?: string
      'data-cy-collection'?: string
      'data-cy-state'?: string
    }
  | {
      onClose: () => void
      onTriggerDLEvent?: (event: string) => void
      /** triggered before the close animation starts */
      onCloseStart?: () => void
      children: React.ReactNode
      visible: boolean
      fromLeft?: boolean
      maxWidth?: string
      hideOverlay?: boolean
      customHeader: true
      isClosing: boolean
      className?: string
      apiRef?: React.MutableRefObject<null | DrawerApi>
      'data-cy-handle-overlay'?: string
      'data-cy-handle-close-icon'?: string
      'data-cy-ctx'?: string
      'data-cy-collection'?: string
      'data-cy-state'?: string
    }

export default function Drawer(props: Props) {
  const [isClosing, delayedClose] = useDelayedFn(300, props.onClose)

  const handleClose = () => {
    delayedClose()
    props.onCloseStart && props.onCloseStart()
  }

  React.useEffect(() => {
    if (!props.apiRef) return
    props.apiRef.current = {
      close: handleClose,
    }
  })

  return (
    <Wrapper
      fromLeft={props.fromLeft}
      isClosing={
        'isClosing' in props && props.isClosing !== false
          ? props.isClosing
          : isClosing
      }
      maxWidth={props.maxWidth || '33rem'}
      hideOverlay={props.hideOverlay}
      className={props.className}
      data-cy-ctx={props['data-cy-ctx']}
      data-cy-collection={props['data-cy-collection']}
      data-cy-state={props['data-cy-state']}
    >
      <div
        className="overlay"
        data-cy-handle={props['data-cy-handle-overlay']}
        onClick={() => {
          props.onTriggerDLEvent && props.onTriggerDLEvent('Overlay')

          handleClose()
        }}
      />
      <ScrollLock isActive={props.visible}>
        <div className="content">
          {!('customHeader' in props) && (
            // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
            <div className="top">
              <div className="label">{props.label}</div>
              <div
                className="close"
                data-cy-handle={props['data-cy-handle-close-icon']}
                onClick={() => {
                  props.onTriggerDLEvent !== undefined
                    ? props.onTriggerDLEvent('X')
                    : null
                  handleClose()
                  return false
                }}
              >
                <CloseIcon />
              </div>
            </div>
          )}
          {props.children}
        </div>
      </ScrollLock>
    </Wrapper>
  )
}

const animationShowFromRight = keyframes`
  from { right: -33rem; }
  to { right: 0; }
`

const animationHideFromRight = keyframes`
  from { right: 0; }
  to { right: -33rem; }
`

const animationShowFromLeft = keyframes`
  from { left: -33rem; }
  to { left: 0; }
`

const animationHideFromLeft = keyframes`
  from { left: 0; }
  to { left: -33rem; }
`

const overlayShow = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const overlayHide = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

type WrapperProps = {
  fromLeft?: boolean
  isClosing: boolean
  maxWidth: string
  hideOverlay?: boolean
}

const Wrapper = styled.div<WrapperProps>`
  display: contents;
  > .overlay {
    background: ${(p) =>
      p.hideOverlay ? 'transsparent' : 'rgba(0, 0, 0, 0.7)'};
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
    animation: ${(p) =>
      p.isClosing ? css`0.3s ${overlayHide}` : css`0.3s ${overlayShow}`};
    opacity: ${(p) => (p.isClosing ? '0' : '1')};
  }

  > .content {
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.15),
      0 3px 6px 0 rgba(0, 0, 0, 0.1);
    background: white;
    overflow: auto;
    position: fixed;
    border-right: 1px solid ${theme.colors.shade.b5};
    animation: ${(p) =>
      p.fromLeft
        ? css`0.3s ${animationShowFromLeft}`
        : css`0.3s ${animationShowFromRight}`};

    ${(p) =>
      p.fromLeft
        ? p.isClosing &&
          css`
            animation: ${() => css`0.3s ${animationHideFromLeft}`};
          `
        : p.isClosing &&
          css`
            animation: ${() => css`0.3s ${animationHideFromRight}`};
          `}

    ${(p) =>
      p.fromLeft
        ? p.isClosing
          ? `left:-33rem;`
          : `left:0`
        : p.isClosing
        ? `right:-33rem;`
        : `right:0`};
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 3;

    @media (min-width: ${ms.SM}px) {
      width: ${(p) => p.maxWidth};
    }

    > .top {
      display: flex;
      flex-direction: ${(p) => (p.fromLeft ? `row-reverse` : `row`)};
      min-height: 4.5rem;
      margin: 0 ${(p) => (p.fromLeft ? '0' : theme.spacing('ml'))};
      border-bottom: ${(p) =>
        p.fromLeft ? `none` : `1px solid ${theme.colors.shade.b5}`};
      .label {
        display: flex;
        ${theme._ty([22, 0, 32], '"Roboto", sans-serif', '700')}
        text-transform: uppercase;
        flex: 1;
        color: ${theme.colors.b0};
        margin-top: ${theme.spacing('ml')};
      }

      .close {
        margin: ${theme.spacing('ml')};
        margin-right: ${(p) =>
          p.fromLeft ? theme.spacing('ml') : theme.spacing('xs')};
        height: 1.25rem;
        cursor: pointer;
        > svg {
          font-size: 2rem;
          #menu-close {
            stroke: ${theme.colors.b0};
          }
          width: 1.25rem;
        }
      }
    }
  }
`
