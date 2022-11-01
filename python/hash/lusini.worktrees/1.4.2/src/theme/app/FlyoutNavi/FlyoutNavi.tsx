import * as React from 'react'
import styled from 'styled-components'
import Drawer from 'theme/atoms/Drawer'
import { useFlyoutNavi } from 'modules/ui'
import Logo from '../../../../static/images/logo.svg'
import Root from './Tree/Root'
import Branches from './Tree/Branches'
import * as evt from './events'

export default function FlyoutNavi() {
  const navi = useFlyoutNavi()

  return (
    <Wrapper
      data-cy-ctx="app/FlyoutNavi"
      data-cy-state={navi.visible ? 'visible' : undefined}
      visible={navi.visible}
    >
      <Drawer
        fromLeft
        visible={navi.visible}
        maxWidth="28.4375rem"
        label={
          <LogoWrapper>
            <img src={Logo} />
          </LogoWrapper>
        }
        onClose={() => {
          evt.closeNavigationClick(navi.sidebarCategory)
          navi.toggle()
        }}
        data-cy-handle-overlay={'overlay'}
        data-cy-handle-close-icon={'close-icon'}
      >
        <Root visible={!navi.sidebarCategory} />
        {/* eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state */}
        {navi.sidebarCategory && <Branches />}
      </Drawer>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`

const LogoWrapper = styled.span`
  > img {
    height: 2.75rem;
  }
`
