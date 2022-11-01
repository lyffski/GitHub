import * as React from 'react'
import styled from 'styled-components'
import Container from 'theme/atoms/Container'
import BottomLine from './BottomLine'
import Accordion from './Accordion'
import Link from 'theme/atoms/Link'
import { useWindowSize } from 'modules/browser'
import PhoneIcon from 'assets/phone-call.svg'
import YoutubeIcon from 'assets/youtube.svg'
import FacebookIcon from 'assets/fb.svg'
import InstagramIcon from 'assets/instagram.svg'
import WhatsappIcon from 'assets/whatsapp.svg'
import PinterestIcon from 'assets/pinterest.svg'
import LinkedinIcon from 'assets/linkedin.svg'
import XingIcon from 'assets/xing.svg'
import theme from 'theme'
// import { ms } from 'modules/browser/const'
import useTranslations from 'hooks/useTranslations'
import { graphql, useStaticQuery } from 'gatsby'
import Newsletter from 'theme/molecules/Newsletter'
import Image from 'theme/molecules/Image'
import Button from 'theme/atoms/Button'
import PaymentIcons from './PaymentIcons'
import CountrySwitch from './CountrySwitch'

const socialDict = {
  youtube: <YoutubeIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  whatsapp: <WhatsappIcon />,
  pinterest: <PinterestIcon />,
  linkedin: <LinkedinIcon />,
  xing: <XingIcon />,
}

export type Gq = {
  footer: {
    aboutLinks: {
      urlPath: string
      title: string
    }[]
    serviceLinks: {
      urlPath: string
      title: string
    }[]
    facebook: string
    youtube: string
    instagram: string
    whatsapp: string
    pinterest: string
    linkedin: string
    xing: string
    legal: {
      urlPath: string
      title: string
    }[]
    advantages: string[]
    catalogImage: string
    catalogLink: string
    availablePayments: string[]
    newsletter: {
      title: string
      iconSource: string
      disclaimer: string
      labels: string[]
    }
  }
  brandName: {
    path: string
  }
}

export default function Footer() {
  const phoneRef = React.useRef<null | HTMLInputElement>(null)
  const windowSize = useWindowSize()
  const t = useTranslations<'app-Footer'>()
  const phoneNumber = t.asText(phoneRef, 'app_footer_phone')
  /** @firescoutMockVar app-Footer.gq-appfooter */
  const gq: Gq = useStaticQuery(graphql`
    query appfooter {
      footer {
        aboutLinks {
          urlPath
          title
        }
        serviceLinks {
          urlPath
          title
        }
        facebook
        youtube
        instagram
        whatsapp
        pinterest
        linkedin
        xing
        advantages
        legal {
          title
          urlPath
        }
        catalogImage
        catalogLink
        availablePayments
        newsletter {
          title
          iconSource
          disclaimer
          labels
        }
      }
      brandName: category(objectID: { eq: "Marken" }) {
        path
      }
    }
  `)

  return (
    <OuterWrapper data-cy-ctx="app/Footer">
      <Wrapper>
        <Container className="bestShopContainer">
          <div className="best-shop-info">
            <div className="best-shop-info-inner">{t('best_shop_info')}</div>
          </div>
        </Container>
        {gq.footer.availablePayments && (
          <PaymentIcons
            data-cy-state="available-payments-visible"
            iconList={gq.footer.availablePayments}
          />
        )}
        {gq.footer.newsletter.title && (
          <div data-cy-state="newsletter-visible">
            <Container className="newsletterContainer">
              <div className="newsletterInner">
                <Newsletter
                  labels={gq.footer.newsletter.labels}
                  title={gq.footer.newsletter.title}
                  disclaimer={gq.footer.newsletter.disclaimer}
                  showInput={false}
                  iconSrc={gq.footer.newsletter.iconSource}
                />
              </div>
            </Container>
          </div>
        )}
        {gq.footer.catalogImage && gq.footer.catalogLink && (
          <Container
            data-cy-state="catalog-visible"
            className="catalogsContainer"
          >
            <div className="img-wrapper">
              <Image imageSrc={gq.footer.catalogImage} alt="catalogs" />
            </div>
            <div className="info-wrapper">
              {t('catalog_headline')}
              <Button
                className="catalog-button"
                to={gq.footer.catalogLink}
                variation="secondary"
              >
                {t('catalog_button')}
              </Button>
            </div>
          </Container>
        )}
        <Container className="footerContainer">
          <div className="content">
            <div className="lists only-mobile-lists">
              <Accordion
                label={t('footer_column_helpandservice')}
                data-cy-handle="accordion-toggle"
                data-cy-state="accordion-open"
              >
                <ul>
                  {gq.footer.serviceLinks.map((service) => (
                    <li key={service.urlPath}>
                      <Link to={service.urlPath}>{service.title}</Link>
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion
                label={t('footer_column_about')}
                data-cy-handle="accordion-toggle"
                data-cy-state="accordion-open"
              >
                <ul>
                  {gq.footer.aboutLinks.map((service) => (
                    <li key={service.urlPath}>
                      <Link to={service.urlPath}>{service.title}</Link>
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion
                label={t('footer_column_advantages')}
                data-cy-handle="accordion-toggle"
                data-cy-state="accordion-open"
              >
                <ul>
                  {gq.footer.advantages.map((usp) => (
                    <li key={usp}>{usp}</li>
                  ))}
                </ul>
              </Accordion>
            </div>
            <div className="lists only-desktop-lists">
              <div className="help-and-services">
                <h4>{t('footer_column_helpandservice')}</h4>
                <ul>
                  {gq.footer.serviceLinks.map((service) => (
                    <li key={service.urlPath}>
                      <Link to={service.urlPath}>{service.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="about">
                <h4>{t('footer_column_about')}</h4>
                <ul>
                  {gq.footer.aboutLinks.map((service) => (
                    <li key={service.urlPath}>
                      <Link to={service.urlPath}>{service.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="third-column">
                <div className="advantages">
                  <h4>{t('footer_column_advantages')}</h4>
                  <ul>
                    {gq.footer.advantages.map((usp) => (
                      <li key={usp}>{usp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state*/}
            {windowSize.data.name === 'MD' && <hr />}
            <div className="social-and-order">
              <div className="social">
                <h3>{t('social_icons_headline')}</h3>
                <div className="icons">
                  {gq.footer.facebook && (
                    <Link
                      data-cy-state="facebook-visible"
                      key={gq.footer.facebook}
                      to={gq.footer.facebook}
                    >
                      {socialDict['facebook']}
                    </Link>
                  )}
                  {gq.footer.youtube && (
                    <Link
                      data-cy-state="youtube-visible"
                      key={gq.footer.youtube}
                      to={gq.footer.youtube}
                    >
                      {socialDict['youtube']}
                    </Link>
                  )}
                  {gq.footer.instagram && (
                    <Link
                      data-cy-state="instagram-visible"
                      key={gq.footer.instagram}
                      to={gq.footer.instagram}
                    >
                      {socialDict['instagram']}
                    </Link>
                  )}
                  {gq.footer.whatsapp && (
                    <Link
                      data-cy-state="whatsapp-visible"
                      key={gq.footer.whatsapp}
                      to={gq.footer.whatsapp}
                    >
                      {socialDict['whatsapp']}
                    </Link>
                  )}
                  {gq.footer.pinterest && (
                    <Link
                      data-cy-state="pinterest-visible"
                      key={gq.footer.pinterest}
                      to={gq.footer.pinterest}
                    >
                      {socialDict['pinterest']}
                    </Link>
                  )}

                  {gq.footer.linkedin && (
                    <Link
                      data-cy-state="linkedin-visible"
                      key={gq.footer.linkedin}
                      to={gq.footer.linkedin}
                    >
                      {socialDict['linkedin']}
                    </Link>
                  )}
                  {gq.footer.xing && (
                    <Link
                      data-cy-state="xing-visible"
                      key={gq.footer.xing}
                      to={gq.footer.xing}
                    >
                      {socialDict['xing']}
                    </Link>
                  )}
                </div>
              </div>
              <div className="order-info">
                <h3>{t('app_footer_contact_hotline')}</h3>
                <div className="phone-info">
                  <a href={`tel:${phoneNumber}`}>
                    <PhoneIcon />
                    <span>{t('app_footer_phone')}</span>
                  </a>
                  <span>{t('app_footer_opening')}</span>
                </div>
              </div>
              <CountrySwitch />
            </div>
            <div className="trustedshop-container" id="trustedshop-badge" />
          </div>
        </Container>
        <Container className="copyrightContainer">
          <div className="copyright">
            <div className="infos">
              <div>
                {gq.footer.legal.map((service) => (
                  <Link
                    key={service.urlPath}
                    className="infolink"
                    to={service.urlPath}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
              <span>{t('copyright')}</span>
            </div>
          </div>
        </Container>
      </Wrapper>
      <BottomLine />
    </OuterWrapper>
  )
}

const OuterWrapper = styled.div`
  width: 100%;
  margin-top: ${theme.spacing('xl')};

  @media print {
    display: none;
  }
`

const Wrapper = styled.footer`
  background-color: ${theme.colors.shade.b6};

  > .Container {
    padding: ${theme.spacing('ml')};

    &.copyrightContainer,
    &.bestShopContainer,
    /* &.newsletterContainer, */
    &.catalogsContainer {
      padding: 0px;
      /* width: 100%; */
      max-width: 100%;
      display: flex;
      justify-content: center;
      background: white;
      display: flex;
      align-items: center;
    }
    &.copyrightContainer {
      height: inherit;
      @media (min-width: ${theme.ms.MD}px) {
        height: 50px;
        padding: 0 ${theme.spacing('m')};
      }
      padding: 0 ${theme.spacing('s')};
    }

    &.footerContainer {
      padding: ${theme.spacing('s')};
      @media (min-width: ${theme.ms.MD}px) {
        padding: ${theme.spacing('m')};
      }
    }

    hr {
      border-bottom: 0;
      border-style: solid;
      color: ${theme.colors.shade.b4};
      width: 100%;
    }

    &.bestShopContainer {
      padding-bottom: ${theme.spacing('ml')};
      > .best-shop-info {
        margin: 0 ${theme.spacing('m')};
        background: ${`linear-gradient(180deg, ${theme.colors.shade.primaryBrighter}, ${theme.colors.primary})`};
        ${theme.rounding('l')}
        padding: ${theme.spacing('xxs')};
        max-width: var(--container-size);
        ${theme.ty('rc-2xl', 'bold')}
        @media (min-width: ${theme.ms.LG}px) {
          ${theme.ty('rc-3xl', 'bold')}
        }
        color: ${theme.colors.primary};
        position: relative;

        > .best-shop-info-inner {
          background: #fff;
          padding: ${theme.spacing('m')} ${theme.spacing('m')};
          ${theme.rounding('m')}
          @media (min-width: ${theme.ms.MD}px) {
            padding: ${theme.spacing('m')} ${(theme._spacing.xl * 2) / 16}rem;
          }
        }
      }
    }

    &.catalogsContainer {
      display: flex;
      padding-top: ${theme.spacing('m')};
      min-height: 100px;
      justify-content: left;
      flex-wrap: wrap;
      @media (min-width: ${theme.ms.MD}px) {
        justify-content: center;
        flex-wrap: nowrap;
        margin-left: 0;
      }
      > .img-wrapper {
        max-height: 250px;
        overflow: hidden;
        max-width: 100%;
        width: 100%;
        margin: 0 ${theme.spacing('s')};
        @media (min-width: ${theme.ms.MD}px) {
          margin: 0 ${theme.spacing('m')};
          width: 480px;
        }
        @media (min-width: ${theme.ms.LG}px) {
          margin: 0;
          width: 700px;
        }
      }
      > .info-wrapper {
        margin-top: ${theme.spacing('s')};
        margin-bottom: ${theme.spacing('ml')};
        margin-left: ${theme.spacing('l')};
        @media (min-width: ${theme.ms.MD}px) {
          margin-top: 0;
          margin-bottom: 0;
          margin-left: 0;
        }

        ${theme.ty('rc-2xl')}
        @media (min-width: ${theme.ms.LG}px) {
          margin: 0 ${theme.spacing('xl')};
          ${theme.ty('rc-3xl')}
        }
        > .catalog-button {
          margin-top: ${theme.spacing('s')};
        }
      }
    }

    > .content {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      @media (min-width: ${theme.ms.LG}px) {
        flex-direction: row;
      }

      > #trustedshop-badge {
        height: 100px !important;
        width: 155px !important;
      }

      > .lists {
        &.only-mobile-lists {
          display: flex;
          @media (min-width: ${theme.ms.MD}px) {
            display: none;
          }
        }
        &.only-desktop-lists {
          display: none;
          @media (min-width: ${theme.ms.MD}px) {
            display: flex;
          }
        }

        flex-basis: 65%;
        flex-direction: column;
        margin-bottom: ${theme.spacing('m')};

        @media (min-width: ${theme.ms.MD}px) {
          flex-direction: row;
          margin-bottom: 0;
        }

        li {
          ${theme._ty([13, 0.32, 24], theme.fontSpecial, '400')}
          margin-bottom: ${theme.spacing('xxs')};
          @media (min-width: ${theme.ms.XL}px) {
            margin-bottom: ${theme.spacing('xs')};
            ${theme._ty([16, 0.4, 24], theme.fontSpecial, '400')}
          }
        }

        > .about {
          flex-grow: 1;
          flex-basis: 0;
        }
        > .third-column {
          flex-grow: 1;
          flex-basis: 0;
          > .advantages {
            > ul li {
            }
          }
          .brands {
            margin-top: 1.25rem;
            > .brands-list {
              display: flex;
              flex-wrap: wrap;
              flex-direction: row;

              > a {
                flex-grow: 1;
                width: 100%;
                ${theme._ty([13, 0.32, 24], theme.fontSpecial, '400')}
                margin-bottom: ${theme.spacing('xxs')};

                @media (min-width: ${theme.ms.MD}px) {
                  width: 50%;
                }

                @media (min-width: ${theme.ms.XL}px) {
                  margin-bottom: ${theme.spacing('xs')};
                  ${theme._ty([16, 0.4, 24], theme.fontSpecial, '400')}
                }
              }
            }
          }
        }

        > .help-and-services {
          flex-grow: 1;
          flex-basis: 0;
        }
      }
      .social-and-order {
        display: flex;
        color: ${theme.colors.b0};
        flex-direction: column;
        @media (min-width: ${theme.ms.MD}px) {
          flex-direction: row;
        }
        @media (min-width: ${theme.ms.LG}px) {
          flex-direction: column;
        }

        > .social {
          flex-direction: row;
          flex-grow: 1;
          flex-basis: 0;
          margin-bottom: ${theme.spacing('s')};
          @media (min-width: ${theme.ms.MD}px) {
            margin-bottom: 0;
          }

          > h3 {
            ${theme._ty([16, 0.5, 15], theme.font, '700')}
            @media (min-width: ${theme.ms.MD}px) {
              ${theme._ty([18, 0.56, 32], theme.font, '700')}
            }

            color: ${theme.colors.shade.b3};
          }

          > .icons {
            margin-top: ${theme.spacing('s')};

            > a {
              > svg {
                margin-right: ${theme.spacing('xs')};
                width: 35.84px;
                height: 35.84px;
                @media (min-width: ${theme.ms.MD}px) {
                  width: 44.8px;
                  height: 44.8px;
                }
              }
            }
          }
        }
        > .order-info {
          flex-grow: 2;
          flex-basis: 0;
          margin-top: 0;
          @media (min-width: ${theme.ms.LG}px) {
            margin-top: ${theme.spacing('ml')};
          }

          > div {
            flex-direction: row;
          }
          h3 {
            ${theme._ty([15, 0.56, 32], theme.fontSpecial, '400')}
            @media (min-width: ${theme.ms.MD}px) {
              ${theme._ty([18, 0.56, 32], theme.fontSpecial, '400')}
            }
          }
          > .phone-info {
            > a {
              margin-right: ${theme.spacing('s')};
              > span {
                ${theme._ty([16, 0.5, 32], theme.fontSpecial, '700')}
                @media (min-width: ${theme.ms.MD}px) {
                  ${theme._ty([18, 0.56, 32], theme.fontSpecial, '700')}
                }
              }
              > svg {
                margin-right: ${theme.spacing('xs')};
                width: 18px;

                path {
                  fill: ${theme.colors.b0};
                }
              }
            }
            > span {
              ${theme._ty([16, 0.5, 32], theme.fontSpecial, '400')}
              @media (min-width: ${theme.ms.MD}px) {
                ${theme._ty([18, 0.56, 32], theme.fontSpecial, '400')}
              }
            }
          }
        }
      }
      h4 {
        ${theme._ty([16, 0, 22], theme.fontSpecial, '700')}
        margin-bottom: ${theme.spacing('xs')};
      }

      li {
        ${theme._ty([16, 0.4, 24], theme.fontSpecial, '400')}
        margin-bottom: ${theme.spacing('xs')};
      }
    }
    > .copyright {
      padding: ${theme.spacing('xs')} 0;
      width: 1300px;
      ${theme.ty('r-base')}
      color: ${theme.colors.shade.b3};
      > .infos {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        ${theme._ty([13, 0.5, 16], theme.font, '400')}
        @media (min-width: ${theme.ms.MD}px) {
          flex-direction: row;
          ${theme._ty([16, 0.5, 15], theme.font, '400')}
        }
        color: ${theme.colors.b0};
        > div {
          margin-bottom: ${theme.spacing('xs')};
          @media (min-width: ${theme.ms.MD}px) {
            margin-bottom: 0;
          }
          .infolink {
            &:first-child {
              margin-right: 0;
              margin-left: 0px;
              @media (min-width: ${theme.ms.MD}px) {
                margin-right: ${theme.spacing('m')};
                margin-left: 0;
              }
            }
            color: ${theme.colors.b0};
            margin-right: 0;
            margin-left: 25px;
            @media (min-width: ${theme.ms.MD}px) {
              margin-right: ${theme.spacing('m')};
              margin-left: 0;
            }
          }
        }
      }
    }
  }

  > div > .Container.newsletterContainer {
    padding: 0px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    background: white;
    display: flex;
    align-items: center;

    > .newsletterInner {
      max-width: 1300px;
      width: 100%;
      margin: 40px 10px;
    }
  }
`
