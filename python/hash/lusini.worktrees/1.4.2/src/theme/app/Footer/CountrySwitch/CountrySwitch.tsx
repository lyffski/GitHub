import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import config from 'config'
import useTranslations from 'hooks/useTranslations'
import AtFlag from 'assets/countryFlags/AT.svg'
import BeFlag from 'assets/countryFlags/BE.svg'
import ChFlag from 'assets/countryFlags/CH.svg'
import DeFlag from 'assets/countryFlags/DE.svg'
import DkFlag from 'assets/countryFlags/DK.svg'
import EsFlag from 'assets/countryFlags/ES.svg'
import FrFlag from 'assets/countryFlags/FR.svg'
import ItFlag from 'assets/countryFlags/IT.svg'
import NlFlag from 'assets/countryFlags/NL.svg'
import NoFlag from 'assets/countryFlags/NO.svg'
import SeFlag from 'assets/countryFlags/SE.svg'
import WwFlag from 'assets/countryFlags/WW.svg'
import ArrowDown from 'assets/arrow-down.svg'
import ArrowUp from 'assets/arrow-up.svg'
import useOutsideClick from 'hooks/useOutsideClick'
import * as evt from './events'

const locales = [
  'en',
  'nl-nl',
  'da-dk',
  'nb-no',
  'sv-se',
  'fr-be',
  'nl-be',
  'it-it',
  'es-es',
  'fr-fr',
  'de-ch',
  'fr-ch',
  'de-at',
  'de-de',
]

export default function CountrySwitch() {
  const t = useTranslations<'app-Footer'>()
  const [open, setOpen] = React.useState(false)
  const outsideClickRef = useOutsideClick(() => {
    setOpen(false)
  })

  const switchCountry = (locale) => {
    evt.switchCountryButtonClick(locale)
    document.location.href = `${config.baseUrl}/${locale}/`
  }

  const getLocaleNameAndIcon = (locale) => {
    switch (locale) {
      case 'de-de':
        return (
          <LocaleElement>
            <DeFlag />
            <span>{t('country_switch_de')}</span>
          </LocaleElement>
        )
      case 'de-at':
        return (
          <LocaleElement>
            <AtFlag />
            <span>{t('country_switch_at')}</span>
          </LocaleElement>
        )
      case 'de-ch':
        return (
          <LocaleElement>
            <ChFlag />
            <span>{t('country_switch_ch_de')}</span>
          </LocaleElement>
        )
      case 'fr-ch':
        return (
          <LocaleElement>
            <ChFlag />
            <span>{t('country_switch_ch_fr')}</span>
          </LocaleElement>
        )
      case 'da-dk':
        return (
          <LocaleElement>
            <DkFlag />
            <span>{t('country_switch_dk')}</span>
          </LocaleElement>
        )
      case 'en':
        return (
          <LocaleElement>
            <WwFlag />
            <span>{t('country_switch_int')}</span>
          </LocaleElement>
        )
      case 'es-es':
        return (
          <LocaleElement>
            <EsFlag />
            <span>{t('country_switch_es')}</span>
          </LocaleElement>
        )
      case 'fr-fr':
        return (
          <LocaleElement>
            <FrFlag />
            <span>{t('country_switch_fr')}</span>
          </LocaleElement>
        )
      case 'fr-be':
        return (
          <LocaleElement>
            <BeFlag />
            <span>{t('country_switch_be_fr')}</span>
          </LocaleElement>
        )
      case 'nl-be':
        return (
          <LocaleElement>
            <BeFlag />
            <span>{t('country_switch_be_nl')}</span>
          </LocaleElement>
        )
      case 'it-it':
        return (
          <LocaleElement>
            <ItFlag />
            <span>{t('country_switch_it')}</span>
          </LocaleElement>
        )
      case 'nb-no':
        return (
          <LocaleElement>
            <NoFlag />
            <span>{t('country_switch_no')}</span>
          </LocaleElement>
        )
      case 'nl-nl':
        return (
          <LocaleElement>
            <NlFlag />
            <span>{t('country_switch_nl')}</span>
          </LocaleElement>
        )
      case 'sv-se':
        return (
          <LocaleElement>
            <SeFlag />
            <span>{t('country_switch_se')}</span>
          </LocaleElement>
        )

      default:
        return null
    }
  }

  return (
    <Wrapper ref={outsideClickRef} isOpen={open} className="CountrySwitch">
      <div
        className="selected-country"
        data-cy-handle="country-switch-toggle"
        onClick={() => setOpen(!open)}
      >
        {getLocaleNameAndIcon(config.locale)}
        {/* eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state */}
        {open ? <ArrowUp /> : <ArrowDown />}
      </div>
      {open && (
        <div className="country-dropdown" data-cy-state="country-dropdown-open">
          {locales.map((locale) => {
            if (locale !== config.locale) {
              return (
                <div
                  onClick={() => switchCountry(locale)}
                  key={locale}
                  data-cy-handle="country-switcher"
                >
                  {getLocaleNameAndIcon(locale)}
                </div>
              )
            }
            return null
          })}
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isOpen: boolean }>`
  position: relative;

  > .selected-country {
    display: flex;
    padding: ${theme.spacing('xs')} ${theme.spacing('s')};
    background-color: ${(props) =>
      props.isOpen
        ? theme.colors.shade.primaryUltraBright
        : theme.colors.white};

    border: 1px solid ${theme.colors.shade.b5};
    border-top: ${(props) => props.isOpen && `0px`};
    ${theme.rounding('s')};

    border-top-left-radius: ${(props) => props.isOpen && `0px`};
    border-top-right-radius: ${(props) => props.isOpen && `0px`};
    max-height: 2.625rem;

    > div {
      width: 95%;
    }
  }
  > .country-dropdown {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    bottom: 100%;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.shade.b5};
    border-bottom: 0px;
    ${theme.rounding('s')};
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    > div {
      padding: ${theme.spacing('xs')} ${theme.spacing('s')};
      display: flex;
      width: 100%;
      border-bottom: 1px solid ${theme.colors.shade.b5};

      :hover {
        background-color: ${theme.colors.shade.primaryUltraBright};
      }
    }
  }
`

const LocaleElement = styled.div`
  display: flex;
  cursor: pointer;
  > svg {
    width: 28px;
  }
  > span {
    margin-left: ${theme.spacing('xs')};
  }
`
