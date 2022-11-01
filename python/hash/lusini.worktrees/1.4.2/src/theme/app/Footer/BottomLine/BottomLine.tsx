import * as React from 'react'
import styled from 'styled-components'
import Container from 'theme/atoms/Container'
import B2cSwitch from 'theme/atoms/B2cSwitch'
import theme from 'theme'
import useTranslations from 'hooks/useTranslations'
import { ms } from 'modules/browser/const'

export default function BottomLine() {
  const t = useTranslations<'app-Footer'>()
  return (
    <Wrapper>
      <Container className="bottomlineContainer">
        <div className="content">
          <B2cSwitch.B2B>
            <div className="text">{t('bottomLine_b2b')}</div>
          </B2cSwitch.B2B>
          <B2cSwitch.B2C>
            <div className="text">{t('bottomLine_b2c')}</div>
          </B2cSwitch.B2C>
        </div>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: ${theme.colors.b0};

  > .bottomlineContainer {
    padding: ${theme.spacing('xs')} ${theme.spacing('s')};
    @media (min-width: ${ms.MD}px) {
      padding: ${theme.spacing('xs')} ${theme.spacing('m')};
    }
    > .content {
      .text {
        color: ${theme.colors.white};
        font-family: ${theme.font};
        ${theme._ty([12, 0, 18], theme.font, '400')}
        margin-bottom: ${theme.spacing('xxs')};
      }
    }
  }
`
