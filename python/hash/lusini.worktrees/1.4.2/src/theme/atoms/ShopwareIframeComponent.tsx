import * as React from 'react'
import styled from 'styled-components'
import Spinner from 'theme/atoms/Spinner'
import {useUserStatus} from 'modules/b2cSwitch'

type Props = {
  src: string
  defaultHeight: number
  iframeKey?: string
  'data-cy-state'?: string
}

type HeightPostMessage = {
  type: string
  height: number
}

type UserPostMessage = {
  type: string
  userStatus: 'loggedIn' | 'loggedOut'
}

export default function ShopwareIframeComponent({
  src,
  defaultHeight,
  iframeKey,
  ...props
}: Props) {
  const ref = React.useRef<HTMLIFrameElement>(null)
  const [listenerReady, setListenerReady] = React.useState(false)
  const [iframeReady, setIframeReady] = React.useState(false)
  const userState = useUserStatus()

  const setIframeHeight = (e) => {
    const { type, height }: HeightPostMessage = e.data

    if (type === 'setHeight' && ref.current) {
      ref.current.height = height.toString() + 'px'
      setIframeReady(true)
    }
  }

  const setUserStatus = (e) => {
    const { type, userStatus }: UserPostMessage = e.data

    if (type === 'REFRESH_USER_STATUS') {
      userState.setStatus(userStatus)
    }
  }

  React.useEffect(() => {
    window.addEventListener('message', setIframeHeight)
    window.addEventListener('message', setUserStatus)
    setListenerReady(true)

    return () => {
      window.removeEventListener('message', setIframeHeight)
      window.removeEventListener('message', setUserStatus)
    }
  }, [])

  if (!listenerReady) {
    return <Placeholder defaultHeight={defaultHeight.toString() + 'px'} />
  }

  return (
    <Wrapper data-cy-state={props['data-cy-state']} iframeReady={iframeReady}>
      <LoadingSpinner size="big" iframeReady={iframeReady} />
      <iframe
        id="iframeID"
        ref={ref}
        key={iframeKey}
        src={src}
        width="100%"
        height={defaultHeight.toString() + 'px'}
        scrolling="no"
        frameBorder="0"
      />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ iframeReady: boolean }>`
  margin: 0;
  width: 100%;

  iframe {
    border: 0px;
    ${(p) => !p.iframeReady && 'visibility: hidden;'}
  }
`

const Placeholder = styled.div<{ defaultHeight: string }>`
  height: ${(p) => p.defaultHeight};
  width: 100%;
`

const LoadingSpinner = styled(Spinner)<{ iframeReady: boolean }>`
  margin: 200px auto 0;
  ${(p) => p.iframeReady && 'display: none;'}
`
