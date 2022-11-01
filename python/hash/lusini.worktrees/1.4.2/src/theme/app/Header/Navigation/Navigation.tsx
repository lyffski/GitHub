import * as React from 'react'
import styled from 'styled-components'
import { ms } from 'modules/browser/const'
import Container from 'theme/atoms/Container'
import Link from 'theme/atoms/Link'
import { useStaticQuery, graphql } from 'gatsby'
import { useFlyoutNavi } from 'modules/ui'
import ArrowRight from 'assets/arrow-right.svg'
import Burgermenu from 'assets/burgermenu.svg'
import theme from 'theme'
import useTranslations from 'hooks/useTranslations'
import * as evt from './events'

export default function Navigation() {
  const t = useTranslations<'app-Header'>()
  const navi = useFlyoutNavi()

  /** @firescoutMockVar app-Header.gq-categories */
  const gq = useStaticQuery(graphql`
    query HeaderQuery {
      k1: allCategory(
        filter: { categoryLevel: { eq: 1 } }
        sort: { fields: position }
      ) {
        nodes {
          label
          urlPath
        }
      }
    }
  `)
  const k1 = gq.k1.nodes

  return (
    <Container>
      <Wrapper>
        <Link
          className="burger-button"
          data-cy-handle="burger-menu"
          to="#"
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault()
            evt.burgerMenuClick()
            navi.setCategory(null)
          }}
        >
          <Burgermenu />
        </Link>
        <ul className="navigation-items">
          {k1.map((item) => (
            <NavigationItem
              selected={!!navi.currentCategory?.startsWith(item.label)}
              key={item.label}
            >
              <Link
                data-cy-handle="nav-link"
                to={item.urlPath}
                onClick={(e: { preventDefault: () => void }) => {
                  e.preventDefault()
                  evt.mainCategoryClick(item.label)
                  navi.setCategory(item.label)
                }}
              >
                {item.label}
              </Link>
            </NavigationItem>
          ))}
        </ul>
        <Link
          className="more-button"
          data-cy-handle="more-button"
          to="#"
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault()
            evt.showMoreMenuClick()
            navi.setCategory(null)
          }}
        >
          <span>{t('header_more_label_btn')}</span>
          <ArrowRight />
        </Link>
      </Wrapper>
    </Container>
  )
}

const Wrapper = styled.div`
  border-bottom: 1px solid ${theme.colors.shade.b5};
  align-items: center;
  display: none;
  @media (min-width: ${ms.LG}px) {
    display: flex;
  }

  > a.burger-button {
    align-items: center;
    display: flex;
    margin-right: ${theme.spacing('s')};
    padding-left: ${theme.spacing('xxs')};
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
    cursor: icon;
    > svg {
      width: 12px;

      #burgermenu {
        stroke: ${theme.colors.b0};
      }
    }
  }
  > a.more-button {
    ${theme._ty([16, 0.6, 16], theme.fontSpecial, '400')}
    margin-left: ${theme.spacing('s')};
    display: flex;
    align-items: baseline;
    border: none;
    color: ${theme.colors.b0};
    position: relative;
    color: ${theme.colors.b0};
    ${theme._ty([16, 0.6, 20], theme.fontSpecial, '400')};

    cursor: pointer;
    > span {
      margin-right: ${theme.spacing('xxs')};
    }
    > svg {
      width: 0.625rem;
      height: 0.625rem;
    }
  }

  > ul {
    ${theme.ty('r-l')}
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    width: 100%;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow: hidden;
    height: 3.125rem;
    > li {
      height: 3.125rem;
      > .secondary {
        height: 3.125rem;
        color: ${theme.colors.b0};
        ${theme._ty([16, 0.6, 14], theme.fontSpecial, '400')};
      }
    }
  }
`

const NavigationItem = styled.li<{ selected: boolean }>`
  margin: 0 ${theme.spacing('s')};
  display: flex;
  > a {
    ${theme._ty([16, 0.6, 16], theme.fontSpecial, '400')}
    border: none;
    color: ${theme.colors.b0};
    width: 100%;
    position: relative;
    cursor: pointer;
    margin: 0;
    display: flex;
    align-items: center;

    ${(props) =>
      props.selected &&
      `
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.3125rem;
        background: linear-gradient(270deg, ${theme.colors.shade.primaryBrighter} 0%, ${theme.colors.primary} 100%);
      } 
    `}
  }
`
