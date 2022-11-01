import * as React from 'react'
import styled from 'styled-components'
import Container from 'theme/atoms/Container'
import Close from 'assets/close.svg'
import theme from 'theme'

export default function Notification() {
  const [showNotification, setShowNotification] = React.useState(true)

  if (showNotification) {
    return (
      <Wrapper data-cy-state="show-notification">
        <Container>
          <div className="notification">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
            ipsa nesciunt tempore, labore cum a porro remhic dolorem beatae
            magnam!
          </div>
          <span
            data-cy-handle="close-notification-icon"
            onClick={() => setShowNotification(false)}
          >
            <Close />
          </span>
        </Container>
      </Wrapper>
    )
  } else {
    return null
  }
}

const Wrapper = styled.div`
  display: block;
  background: rgba(214, 164, 68, 0.1);
  > .Container {
    position: relative;
    padding-top: ${theme.spacing('xs')};
    border: 1px solid green;

    > .notification {
      color: ${theme.colors.shade.b2};
      margin-right: ${theme.spacing('xxs')};
    }
    > span svg {
      position: absolute;
      top: 0.625rem;
      right: 0;
      margin: 0 ${theme.spacing('xs')};
      width: 0.75rem;
    }
  }
`
