import * as React from 'react'
import styled from 'styled-components'
import Container from 'theme/atoms/Container'
import B2cSwitch from 'theme/atoms/B2cSwitch'
import PhoneCall from 'assets/phone-call.svg'
import { ms } from 'modules/browser/const'
import { useCustomerType, useUserStatus } from 'modules/b2cSwitch'
import theme from 'theme'
import useTranslations from 'hooks/useTranslations'
import config from 'config'
import Button from 'theme/atoms/Button'
import useOutsideClick from 'hooks/useOutsideClick'
import * as evt from './events'
import useDisplayB2COverlay from 'modules/ui/hooks/useDisplayB2COverlay'

export default function HeaderLine() {
  const customerType = useCustomerType()
  const userState = useUserStatus()
  const t = useTranslations<'app-Header'>()
  const { data: showOverlay, hideOverlay } = useDisplayB2COverlay()
  const langShop = config.langShop || null
  const [langactive, setLangactive] = React.useState(false)

  const outsideClickRef = useOutsideClick(() => {
    setLangactive(false)
  })

  /** @firescoutMockFn app-Header.switchLanguage */
  const switchLanguage = (url, lang) => {
    evt.switchLanguageButtonClick(lang)
    document.location.href = url
  }

  return (
    <Wrapper langactive={langactive}>
      <Container>
        <div className="flex">
          <div className="contact-container">
            <div className="contact">
              <span className="hotline">{t('header_hotline_text')}</span>
              <span className="phoneicon">
                <PhoneCall />
              </span>
              <span className="phonenumber">{t('header_phone_number')}</span>
              <span className="times">{t('header_office_hours')}</span>
            </div>
            {langShop && (
              <div data-cy-state="language-switch" className="language-wrapper">
                <div className="language-current">
                  <span className="language-label">
                    {langShop.current.language}:
                  </span>
                  <span
                    className="language-choice"
                    onClick={() => setLangactive(!langactive)}
                    data-cy-handle="language-switch-modal"
                  >
                    {langShop.current.locale}
                  </span>
                </div>
                <div
                  className="language-selector"
                  ref={outsideClickRef}
                  data-cy-state="language-choice-modal"
                >
                  <div className="arrow-up" />
                  {langShop.alternate.map((lang) => {
                    return (
                      <div key={lang.label} className="language">
                        {
                          <Button
                            variation={
                              lang.active ? 'language_active' : 'language_s'
                            }
                            onClick={() => switchLanguage(lang.url, lang.label)}
                            data-cy-handle="language-switcher"
                          >
                            {lang.label}
                          </Button>
                        }
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {userState.data === 'loggedOut' && config.features.b2c !== false && (
            <div className="customertype" data-cy-state="has-customerswitch">
              <B2cSwitch.B2C>
                <span
                  data-cy-handle="switch-to-b2b"
                  className="inactive"
                  onClick={() => customerType.setType('b2b')}
                >
                  {t('header_b2b_switch_link_label')}
                </span>
                <span className="active">
                  {t('header_b2c_switch_link_label')}
                </span>
              </B2cSwitch.B2C>
              <B2cSwitch.B2B>
                <span className="active">
                  {t('header_b2b_switch_link_label')}
                </span>
                <span
                  data-cy-handle="switch-to-b2c"
                  className="inactive"
                  onClick={() => customerType.setType('b2c')}
                >
                  {t('header_b2c_switch_link_label')}
                </span>
              </B2cSwitch.B2B>

              {showOverlay && (
                <div
                  className="showPopup"
                  data-cy-state="customer-switch-popup"
                >
                  <h3>{t('header_topline_customer_switch_headline')}</h3>
                  <div className="action-button">
                    <div className="description">
                      {t('header_topline_customer_switch_description')}
                    </div>
                    <div className="buttongroup">
                      <Button
                        variation="special"
                        data-cy-handle="switch-to-b2c-overlay"
                        onClick={() => {
                          customerType.setType('b2c')
                          hideOverlay()
                        }}
                      >
                        {t('header_topline_customer_switch_privat_yes')}
                      </Button>
                      <Button
                        variation="special"
                        data-cy-handle="switch-to-b2b-overlay"
                        onClick={() => {
                          customerType.setType('b2b')
                          hideOverlay()
                        }}
                      >
                        {t('header_topline_customer_switch_privat_no')}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ langactive: boolean }>`
  ${theme._ty([14, 0.35, 14], theme.fontSpecial, '400')};
  @media print {
    display: none;
  }
  width: 100vw;
  height: 1.875rem;

  > div {
    height: 100%;
  }
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  .flex {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
    justify-content: space-between;
    flex-direction: row-reverse;

    .customertype {
      display: flex;
      justify-content: center;
      align-items: center;
      > .showPopup {
        border: 1px solid ${theme.colors.shade.b3};
        position: absolute;
        background: ${theme.colors.white};
        display: block;
        z-index: 1;
        color: ${theme.colors.b0};
        top: 90px;
        left: 1rem;
        padding: ${theme.spacing('m')};
        ${theme.ty('r-s')};
        font-weight: 400;
        right: 1rem;
        @media (min-width: ${ms.MD}px) {
          right: auto;
          top: inherit;
          left: 14.0625rem;
          margin-top: 82px;
        }
        > .action-button {
          color: ${theme.colors.shade.b3};
          display: block;
          justify-content: center;
          margin-top: 0.875rem;
          @media (min-width: ${ms.MD}px) {
            justify-content: space-between;
            display: flex;
          }
          > .description {
            @media (min-width: ${ms.MD}px) {
              width: 250px;
            }
          }
          > .buttongroup {
            display: flex;
            margin: ${theme.spacing('m')};
            @media (min-width: ${ms.MD}px) {
              margin: 0px;
            }
            > button {
              height: 40px;
              width: 90px;
              padding: 0px;
              margin-left: 1.5625rem;
              @media (min-width: ${ms.MD}px) {
                margin-left: ${theme.spacing('ml')};
              }
            }
          }
        }
      }
      > .showPopup:after,
      .showPopup:before {
        bottom: 100%;
        left: 150px;
        border: solid transparent;
        content: '';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        @media (min-width: ${ms.MD}px) {
          bottom: auto;
          left: auto;
          right: 100%;
          top: 50%;
        }
      }
      > .showPopup:after {
        border-color: rgba(0, 0, 0, 0);
        border-bottom-color: ${theme.colors.white};
        border-width: 1.25rem;
        margin-left: -${theme.spacing('s')};
        @media (min-width: ${ms.MD}px) {
          border-bottom-color: rgba(0, 0, 0, 0);
          border-right-color: ${theme.colors.white};
          margin-left: auto;
          margin-top: -3.1875rem;
          border-width: 0.6875rem;
        }
      }
      > .showPopup:before {
        border-color: rgba(0, 0, 0, 0);
        border-bottom-color: ${theme.colors.shade.b3};
        border-width: 1.3125rem;
        margin-left: -1rem;
        @media (min-width: ${ms.MD}px) {
          border-bottom-color: rgba(0, 0, 0, 0);
          border-right-color: ${theme.colors.shade.b3};
          border-width: 0.75rem;
          margin-left: auto;
          margin-top: -3.25rem;
        }
      }
      > span > span {
        margin-right: ${theme.spacing('m')};
        &.active {
          font-weight: 700;
        }
        &.inactive {
          font-weight: 400;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .contact-container {
      display: flex;
      align-items: center;
      .contact {
        display: none;
        @media (min-width: ${ms.MD}px) {
          display: flex;
        }
        align-items: center;
        margin: 0;

        // Hotline
        > span {
          max-height: 100%;
          flex-shrink: 0;
          &.hotline {
            margin-right: ${theme.spacing('m')};
            flex-shrink: 1;
          }

          &.phoneicon {
            > svg {
              margin-right: ${theme.spacing('xs')};
              height: 1.125rem;
              width: 1.125rem;
              color: ${theme.colors.white};
            }
          }
          &.phonenumber {
            font-weight: 700;
            padding-right: ${theme.spacing('m')};
          }
        }
      }
      .language-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin-left: ${theme.spacing('m')};
        position: relative;

        .language-current {
          max-height: 100%;
          display: flex;
          align-items: center;
          flex-basis: 100%;

          > .language-label {
            padding-right: ${theme.spacing('xs')};
          }
          .language-choice {
            font-weight: 700;
            padding-right: ${theme.spacing('m')};
            text-decoration: underline;
            cursor: pointer;
          }
        }
        .language-selector {
          display: block;
          z-index: auto;
          background-color: ${theme.colors.white};
          width: 17.5rem;
          position: absolute;
          z-index: 20;
          border: 0.0625rem solid ${theme.colors.shade.b3};
          padding: ${theme.spacing('l')};
          margin-top: ${theme.spacing('l')};
          right: 0px;

          ${(props) =>
            props.langactive
              ? `opacity: 1; visibility: visible;`
              : `opacity: 0; visibility: hidden;`}

          .language {
            margin-bottom: ${theme.spacing('xs')};
            display: flex;
            justify-content: center;
            align-items: center;

            button {
              width: 100%;
            }
          }

          .arrow-up {
            position: absolute;
            top: -0.5rem;
            left: 83%;
            background: ${theme.colors.white};
            transform: rotate(45deg);
            border-left: 1px solid ${theme.colors.shade.b3};
            border-top: 1px solid ${theme.colors.shade.b3};
            width: ${theme.spacing('s')};
            height: ${theme.spacing('s')};
          }
        }
      }
    }
  }
`
