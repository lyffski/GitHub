import * as React from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import theme from 'theme'
import User from 'assets/user.svg'
import Search from 'assets/search.svg'
import Burgermenu from 'assets/burgermenu.svg'
import Logo from '../../../../static/images/logo.svg'
import { ms } from 'modules/browser/const'
import { useSearchValue, useFlyoutNavi } from 'modules/ui'
import Link from 'theme/atoms/Link'
import Container from 'theme/atoms/Container'
import TopLine from './TopLine'
import Navigation from './Navigation'
import CartIcon from './CartIcon'
import useTranslations from 'hooks/useTranslations'
import * as evt from './events'
import config from 'config'

export default function Header() {
  const modal = useSearchValue()
  const navi = useFlyoutNavi()
  const t = useTranslations<'app-Header'>()
  const inputRef = React.useRef<null | HTMLInputElement>(null)
  const inputPlaceholder = t.asText(inputRef, 'header_search_input_placeholder')

  return (
    <div data-cy-ctx="app/Header">
      <TopLine />
      <Container>
        <Wrapper
          showAbTests={!!config.abTests?.searchDesignOptimization || false}
        >
          <Link to="/" className="logo" data-cy-handle="logo">
            <img src={Logo} />
          </Link>
          <div className="search">
            <div className="container">
              <div className="input-wrapper" ref={inputRef}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    return false
                  }}
                >
                  <input
                    type="text"
                    id="search-input"
                    data-cy-handle="search-input"
                    placeholder={inputPlaceholder}
                    onChange={(e) => modal.setValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        evt.inputTypeEnter(modal.data)
                        navigate('/search/?q=' + modal.data)
                      }
                    }}
                    value={modal.data}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      evt.searchInputClick(modal.data)
                      navigate('/search/?q=' + modal.data)
                    }}
                    data-cy-handle="search-icon"
                  >
                    <Search />
                  </button>
                </form>
              </div>
            </div>
            <div className="main-categories"></div>
          </div>
          <div className="icon-list">
            <div className="row mobile">
              <div
                className="icon"
                onClick={() => navigate('/search/')}
                data-cy-handle="search-button"
              ></div>
            </div>

            <Link className="row" to="/account/">
              <div className="icon">
                <User />
              </div>
            </Link>
            <CartIcon />
            <button
              className="burger-wrapper"
              data-cy-handle="burger-menu"
              onClick={() => {
                navi.toggle()
              }}
            >
              <Burgermenu />
            </button>
          </div>
        </Wrapper>
      </Container>
      <Navigation />
    </div>
  )
}

const Wrapper = styled.header<{ showAbTests: boolean }>`
  border-bottom: 1px solid ${theme.colors.shade.b5};
  position: sticky;
  box-sizing: border-box;
  top: 0;
  background: ${theme.colors.white};
  display: flex;
  padding: ${theme.spacing('m')} 0;
  align-items: center;
  justify-content: space-between;

  > .logo {
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    outline: none;
    height: 24px;
    @media (min-width: ${ms.MD}px) {
      height: 36px;
    }
    @media (min-width: ${ms.LG}px) {
      height: 44px;
    }

    > img {
      height: 100%;
    }
    > button {
      display: block;
    }
  }

  > .search {
    display: block;
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    > .container {
      width: 20px;
      > .input-wrapper {
        > form {
          width: 100%;
          height: 100%;
          display: flex;
          > input {
            display: none;
          }
          > button {
            > svg {
              width: 100%;
            }
          }
        }
      }
    }

    @media (min-width: ${ms.MD}px) {
      > .container {
        width: 20rem;
        height: 2.5rem;
        text-align: right;

        > .input-wrapper {
          background: #f9f5ec;
          width: 100%;
          height: 100%;
          display: flex;

          > form {
            background: #f9f5ec;
            width: 100%;
            height: 100%;
            display: flex;
            > input {
              display: block;
              ${theme.ty('r-s')}
              background: #f9f5ec;
              border: none;
              border-radius: ${theme.rounding('m')};
              flex: 1;
              padding-left: ${theme.spacing('s')};
              ::placeholder {
                color: ${theme.colors.shade.b2};
              }
              &:focus {
                outline: none;
              }
            }
            // Lupe
            > button {
              > svg {
                margin: ${theme.spacing('xs')} ${theme.spacing('s')}
                  ${theme.spacing('xs')} 0;
                font-size: 20px;
                height: 20px;
                width: 1.375rem;
                color: ${theme.colors.primary};
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  > .icon-list {
    @media print {
      display: none;
    }
    display: flex;
    align-items: center;
    > .CartIcon {
      margin-left: ${theme.spacing('m')};
      > .icon {
        display: flex;
        align-items: center;
        // Einkaufswagen
        > svg {
          height: 2rem;
          width: 2rem;
          @media (min-width: ${ms.LG}px) {
            height: 2.5rem;
            width: 2.5rem;
          }
        }
      }
    }
    > button {
      &.burger-wrapper {
        height: 2.5rem;
        width: 2.5rem;
        display: flex;
        margin-left: ${theme.spacing('m')};
        @media (min-width: ${ms.LG}px) {
          display: none;
        }
      }
      /* padding-left: ${theme.spacing('xxs')}; */
      cursor: pointer;
      outline: none;
      justify-content: center;
      align-items: center;
      border: none;
      background: none;
      cursor: icon;
      > svg {
        color: ${theme.colors.primary};
        height: 1.5625rem;
        width: 1.5625rem;
        font-size: 3rem;
      }
      @media (min-width: ${ms.LG}px) {
        height: 3rem;
        width: 3rem;
        display: none;
        > svg {
          font-size: 2.5rem;
        }
      }
    }
    > .row {
      color: ${theme.colors.b0};
      text-decoration: none;

      &.desktop {
        display: none;
      }
      cursor: pointer;
      text-align: center;
      margin-left: ${theme.spacing('m')};

      > .icon {
        font-size: 2rem;
        // Profilicon
        > svg {
          height: 1.375rem;
          width: 1.25rem;
          color: ${theme.colors.primary};
        }
      }
      > .label {
        display: none;
      }

      @media (min-width: ${ms.MD}px) {
        &.mobile {
          display: none;
        }
        &.desktop {
          display: flex;
        }
        > .label {
          display: block;
          ${theme.ty('r-s')}
        }
      }
    }
  }

  /* AB Test searchDesignOptimization */
  ${(props) =>
    props.showAbTests &&
    `
    body.ab-mode-b & {

      flex-wrap: wrap;
      @media (min-width: ${ms.MD}px) {
        flex-wrap: nowrap;
      }

      > .logo {
        height: 32px;
        order: 1;
      }
      > .search {
        flex-grow: 1;
        justify-content: center;
        flex-basis: 100%;
        order: 2;
        margin-top: ${theme.spacing('m')};
        @media (min-width: ${ms.MD}px) {
          flex-basis: unset;
          margin-top: 0;
        }
        > .container {
          height: 2.5rem;
          flex-grow: 1;
          text-align: right;

          > .input-wrapper {
            background: #f9f5ec;
            width: 100%;
            height: 100%;
            display: flex;

            > form {
              background: #f9f5ec;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: row-reverse;
              > input {
                display: block;
                ${theme.ty('r-base')}
                @media (min-width: ${ms.MD}px) {
                  ${theme.ty('r-s')}
                }
                background: #f9f5ec;
                border: none;
                border-radius: ${theme.rounding('m')};
                flex: 1;
                ::placeholder {
                  color: ${theme.colors.shade.b2};
                }
                &:focus {
                  outline: none;
                }
              }
              // Lupe
              > button {
                > svg {
                  margin: ${theme.spacing('xs')} ${theme.spacing('xs')}
                    ${theme.spacing('xs')} ${theme.spacing('m')};
                  font-size: 20px;
                  height: 20px;
                  width: 1.375rem;
                  color: ${theme.colors.primary};
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      > .icon-list {
        flex-grow:1;
        order: 1;
        @media (min-width: ${ms.MD}px) {
          order: 3;
        }
        justify-content: flex-end;
      }
    }
  `}
`
