import * as React from 'react'
import styled from 'styled-components'
import { useModal } from 'modules/ui'
import theme from 'theme'

export default function Modal() {
  const modal = useModal()

  if (!modal.content) return null

  return (
    <Wrapper onClick={() => modal.setContent(null)} data-cy-ctx="app/Modal">
      {/* eslint-disable-next-line @kaminrunde/firescout/onclick-needs-handle */}
      <div className="content">{modal.content}</div>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ onClick: () => void }>`
  height: 100%;
  display: flex;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  > div {
    height: 100%;
    padding: ${theme.spacing('xs')};
    > img {
      height: 100%;
    }
  }
`
