import * as React from 'react'
import styled, { css } from 'styled-components'
import theme from 'theme'
import config from 'config'
import ArrowUp from 'assets/arrow-up.svg'
import { toTopButtonClick } from './events'

import withTranslations from './withTranslations'
import useTranslations from 'hooks/useTranslations'

export function ToTopButton() {
  const t = useTranslations<'partials-toTopButton'>()

  const [visible, setVisible] = React.useState(false)
  let scrollYPosition = 0

  const toggleVisible = () => {
    const belowTheFold = document.documentElement.scrollTop > 300

    const oldSrollYPosition = scrollYPosition
    scrollYPosition = document.documentElement.scrollTop
    const scrollDirectionUp = oldSrollYPosition > scrollYPosition

    if (belowTheFold && scrollDirectionUp) {
      setVisible(true)
    } else if (!belowTheFold) {
      setVisible(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisible)

    return () => {
      window.removeEventListener('scroll', toggleVisible)
    }
  })

  const handleClick = () => {
    toTopButtonClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Wrapper
      data-cy-ctx="partials/ToTopButton"
      showToTopButton={config.abTests?.backToTopButton || false}
      visible={visible}
    >
      <StickyButton
        onClick={() => handleClick()}
        data-cy-handle="scroll-to-top"
        data-cy-state={visible ? 'visible' : undefined}
      >
        <ArrowUp />
        <span>{t('label')}</span>
      </StickyButton>
    </Wrapper>
  )
}

export default withTranslations(ToTopButton)

const Wrapper = styled.div<{
  visible: boolean
  showToTopButton: boolean
}>`
  display:none;
  ${(p) =>
    p.showToTopButton &&
    `
    body.ab-mode-b & {
      display: block;
    }
  `}

  ${(p) =>
    p.visible
      ? css`
          visibility: visible;
        `
      : css`
          visibility: hidden;
        `}

  z-index: 2;
  position: fixed;
  bottom: ${theme.spacing('l')};
  right: ${theme.spacing('m')};
`

const StickyButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  text-decoration: none;
  text-align: center;
  display: flex;
  align-items: initial;
  box-sizing: border-box;
  ${theme.rounding('m')};
  padding: ${theme.spacing('s')} ${theme.spacing('xs')};

  ${theme.ty('rc-base', '400')};
  cursor: pointer;

  svg {
    #arrow-up {
      stroke: ${theme.colors.white};
    }
  }

  > span {
    display: none;
  }

  @media (min-width: ${theme.ms.MD}px) {
    padding: ${theme.spacing('xs')} ${theme.spacing('xs')};
    bottom: ${theme.spacing('ml')};
    right: ${theme.spacing('l')};

    > span {
      display: block;
    }

    svg {
      margin-right: ${theme.spacing('xs')};
    }
  }
`
