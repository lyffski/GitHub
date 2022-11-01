import React from 'react'
import styled from 'styled-components'

type Props = {
  link: string
  'data-cy-state'?: string
}

export default function WistiaPlayer(props: Props) {
  /* Add or remove Wistia Scripts to DOM */
  React.useEffect(() => {
    const script1 = document.createElement('script')
    const script2 = document.createElement('script')
    script1.src = `https://fast.wistia.com/embed/medias/${props.link}.jsonp`
    script1.async = true
    script2.src = `https://fast.wistia.com/assets/external/E-v1.js`
    script2.async = true
    document.body.appendChild(script1)
    document.body.appendChild(script2)
    return () => {
      document.body.removeChild(script1)
      document.body.removeChild(script2)
    }
  }, [])

  return (
    <Wrapper link={props.link} data-cy-state={props['data-cy-state']}>
      <div className="container">
        <WistiaPadding>
          <WistiaResponsiveWrapper>
            <div
              className={`wistia_embed wistia_async_${props.link} wmode=transparent fitStrategy=cover`}
            >
              &nbsp;
            </div>
          </WistiaResponsiveWrapper>
        </WistiaPadding>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ link }>`
  > .container {
    width: 100%; /* The size you want */
  }
  > .container .wistia_embed {
    height: 100%;
    width: 100%;
  }
  .wistia_embed {
    &.wistia_async_${(props) => props.link} {
      display: inline-block;
      width: 100%;
      > .w-vulcan-v2-button {
        display: none;
      }
    }
  }
`

const WistiaPadding = styled.div`
  padding: 56.25% 0 0 0;
  position: relative;
`
const WistiaResponsiveWrapper = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
