import * as React from 'react'
import styled from 'styled-components'
import Button from 'theme/atoms/Button'
import theme from 'theme'
import { ms } from 'modules/browser/const'
import { navigate } from 'gatsby'
import useTranslations from 'hooks/useTranslations'

type Props = {
  labels: string[]
  title: string
  disclaimer: string
  showInput?: boolean
  iconSrc: string
}

export default function Newsletter(props: Props) {
  const t = useTranslations<'molecules-Newsletter'>()
  const inptRef = React.useRef<null | HTMLInputElement>(null)
  const { labels, disclaimer, title } = props
  const [email, setEmail] = React.useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/newsletter/', { state: { email: email } })
  }
  return (
    <Wrapper
      className="Newsletter"
      showInput={!!props.showInput}
      noIcon={!props.iconSrc}
      data-cy-ctx="organisms/Newsletter"
    >
      {props.iconSrc && (
        // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
        <div className="icon-container">
          <img src={props.iconSrc} alt="icon" />
        </div>
      )}
      <div className="info-container">
        <div className="title">{title}</div>
        <form onSubmit={handleSubmit}>
          <span className="inputfield" ref={inptRef}>
            {props.showInput && (
              // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
              <input
                id="newsletter"
                placeholder={t.asText(inptRef, 'placeholder')}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <Button variation="primary">{t('btn_label')}</Button>
          </span>
        </form>
        <ul className="labels">
          {labels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
        <div
          className="disclaimer"
          dangerouslySetInnerHTML={{ __html: disclaimer }}
        />
      </div>
      <div className="background-dishes">
        <img
          className="desktop-dish dish1"
          src="https://res.cloudinary.com/lusini/image/upload/v1652774815/application/newsletter/dish1.png"
          alt="dish1"
        />
        <img
          className="desktop-dish dish2"
          src="https://res.cloudinary.com/lusini/image/upload/v1652774816/application/newsletter/dish2.png"
          alt="dish2"
        />
        <img
          className="desktop-dish dish3"
          src="https://res.cloudinary.com/lusini/image/upload/v1652774868/application/newsletter/dish3.png"
          alt="dish3"
        />
        <img
          className="mobile-dish dish2-mobile"
          src="https://res.cloudinary.com/lusini/image/upload/v1652775112/application/newsletter/dish2-mobile.png"
          alt="dish2-mobile"
        />
        <img
          className="mobile-dish dish1-mobile"
          src="https://res.cloudinary.com/lusini/image/upload/v1652775112/application/newsletter/dish1-mobile.png"
          alt="dish1-mobile"
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ showInput: boolean; noIcon: boolean }>`
  border-radius: 15px 15px 15px 0px;
  overflow: hidden;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${theme.spacing('m')};
  padding-bottom: ${theme.spacing('xl')};
  width: 100%;
  position: relative;

  @media (min-width: ${ms.MD}px) {
    align-items: center;
    column-gap: ${theme.spacing('xl')};
    padding-bottom: ${theme.spacing('m')};
  }
  > .icon-container {
    z-index: 1;
    display: none;
    @media (min-width: ${ms.MD}px) {
      display: block;
    }
    > img {
      width: 192px;
    }
  }
  > .info-container {
    @media (min-width: ${ms.MD}px) {
      max-width: ${(props) => (props.noIcon ? `640px` : `420px`)};
    }

    z-index: 1;
    display: flex;
    flex-direction: column;
    > div {
      text-align: left;
      margin-bottom: ${theme.spacing('s')};
    }
    > ul.labels {
      display: flex;
      flex-direction: column;
      ${theme.ty('r-base')}
      @media (min-width: ${ms.LG}px) {
        ${theme.ty('r-xl')}
      }
      margin-bottom: ${theme.spacing('xs')};

      > li {
        margin-bottom: ${theme.spacing('xxs')};
        padding-left: 20px;
        position: relative;

        @media (min-width: ${ms.MD}px) {
          ${(props) => props.noIcon && `display: block; text-align: center;`}
        }
      }
      > li:before {
        content: '';
        background-image: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTUgMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEzLjcyMTEwMDcsMC4yMDU4OTk3MiBDMTQuMDcxMTAwNywwLjUxMDA3OTcyIDE0LjEwODMwMDcsMS4wNDAzOTk3MiAxMy44MDQxMDA3LDEuMzkwMzk5NzIgTDYuMzIyNjAwNzUsOS45OTkzOTk3MiBMMC4zNDgyODA3NDcsNS42ODY4OTk3MiBDLTAuMDI3NzI5MjUyOSw1LjQxNTQ5OTcyIC0wLjExMjUwOTI1Myw0Ljg5MDU5OTcyIDAuMTU4OTAwNzQ3LDQuNTE0NTk5NzIgQzAuNDMwMzIwNzQ3LDQuMTM4NTk5NzIgMC45NTUxNjA3NDcsNC4wNTM3OTk3MiAxLjMzMTE2MDc1LDQuMzI1MTk5NzIgTDYuMDYxNDAwNzUsNy43Mzk3OTk3MiBMMTIuNTM2NjAwNywwLjI4ODg4OTcyIEMxMi44NDA3MDA3LC0wLjA2MTEzMDI3OTcgMTMuMzcxMTAwNywtMC4wOTgyOTAyNzk3IDEzLjcyMTEwMDcsMC4yMDU4OTk3MiBaIiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=');
        width: 15px;
        height: 15px;
        background-size: contain;
        background-repeat: no-repeat;
        display: inline-block;
        background-position: center center;
        margin-right: 10px;
        margin-top: 5px;
        position: absolute;
        margin-left: -20px;
      }
    }
    > .title {
      ${theme.ty('rc-2xl', 'bold')}
      text-align: left;
      @media (min-width: ${ms.LG}px) {
        ${theme.ty('rc-3xl', 'bold')}
      }

      @media (min-width: ${ms.MD}px) {
        ${(props) => props.noIcon && `text-align: center;`}
      }
    }
    > form {
      .inputfield {
        display: flex;
        min-height: 40px;
        position: relative;
        @media (min-width: ${ms.MD}px) {
          min-width: 380px;
          ${(props) => props.noIcon && `justify-content: center;`}
        }
        ${theme.ty('rc-2xl')}
        margin-bottom: ${theme.spacing('s')};

        > input {
          ${theme.ty('r-s')}
          @media (min-width: ${ms.MD}px) {
            ${theme.ty('r-base')}
          }
          flex-grow: 1;
          color: ${theme.colors.shade.b2};
          height: 37px;
          box-sizing: border-box;
          padding: ${theme.spacing('xs')} ${theme.spacing('m')};
          border-radius: 5px;
          outline: none;
          border: none;
          -webkit-appearance: none;
        }
        > .Button {
          ${theme.ty('rc-base', 'bold')}
          box-sizing: border-box;
          width: 100%;
          padding: 12px 110px;
          ${(props) =>
            props.showInput &&
            `
            height: 35px;
            position: absolute;
            right: 1px;
            top: 1px;
            border: 1px solid white;
            border-radius: 0px 5px 5px 0px;
            height: 35px;
            padding: 7px 25px;
          `}

          @media (min-width: ${ms.MD}px) {
            width: inherit;
          }
        }
      }
    }
    > .disclaimer {
      ${theme.ty('r-xs')}
      @media (min-width: ${ms.MD}px) {
        ${theme.ty('r-s')}
        ${(props) => props.noIcon && `text-align: center;`}
      }
    }
  }

  > .background-dishes {
    > img {
      position: absolute;
    }
    > .mobile-dish {
      display: block;
      @media (min-width: ${ms.MD}px) {
        display: none;
      }
    }
    > .desktop-dish {
      display: none;
      @media (min-width: ${ms.MD}px) {
        display: block;
      }
    }
    > .dish1 {
      left: 0;
      top: 0;
      width: 124px;
      height: 249px;
    }
    > .dish2 {
      right: 0;
      top: 0;
      width: 229px;
      height: 189px;
    }
    > .dish3 {
      right: 0;
      bottom: 0;
      width: 148px;
      height: 209px;
    }
    > .dish1-mobile {
      right: 25px;
      bottom: 0;
      width: 193px;
      height: 64px;
    }
    > .dish2-mobile {
      right: 0;
      bottom: 0;
      width: 60px;
      height: 104px;
    }
  }
`
