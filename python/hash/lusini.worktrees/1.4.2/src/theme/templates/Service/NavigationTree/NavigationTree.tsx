import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import Link from 'theme/atoms/Link'
import { useStaticQuery, graphql } from 'gatsby'
import { ms } from 'modules/browser/const'
import ArrowUp from 'assets/arrow-up.svg'
import ArrowDown from 'assets/arrow-down.svg'

type Props = {
  contentfulID: string
}

type TreeItem = {
  contentfulID: string
  title: string
  urlPath: string
  childPages?: TreeItem[]
}

export default function NavigationTree(props: Props) {
  const [expanded, setExpanded] = React.useState(false)
  const root: { data: TreeItem } = useStaticQuery(graphql`
    query ServicePageTree {
      data: servicePage(contentfulID: { eq: "2XRFU4Bx7IvqgghvLCdhHQ" }) {
        urlPath
        title
        contentfulID
        childPages {
          ... on ServicePage {
            urlPath
            title
            contentfulID
          }
          childPages {
            ... on ServicePage {
              urlPath
              title
              contentfulID
            }
          }
        }
      }
    }
  `)

  const renderItemList = (item: TreeItem, level: number) =>
    item.childPages?.filter(Boolean).map((child) => (
      <Item
        key={child.contentfulID}
        selected={child.contentfulID === props.contentfulID}
        level={level}
      >
        <Link className="label" to={child.urlPath}>
          {child.title}
        </Link>
        <div className="childs">{renderItemList(child, level + 1)}</div>
      </Item>
    ))

  return (
    <Wrapper
      className="NavigationTree"
      onRoot={props.contentfulID === root.data.contentfulID}
    >
      <div className="main-item">
        <Link className="label" to={root.data.urlPath}>
          {root.data.title}
        </Link>
        <div
          className="mobile-toggle"
          onClick={() => setExpanded(!expanded)}
          data-cy-handle="toggle-mobile-tree"
        >
          {expanded ? <ArrowUp data-cy-state="tree-expanded" /> : <ArrowDown />}
        </div>
      </div>

      <ItemList expanded={expanded}>{renderItemList(root.data, 0)}</ItemList>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ onRoot: boolean }>`
  background: #f9f9f8;
  > .main-item {
    ${theme.ty('rc-l')}
    padding: ${theme.spacing('m')};
    position: relative;
    @media (min-width: ${ms.LG}px) {
      ${theme.ty('rc-2xl')}
      padding-left: ${theme.spacing('l')};
    }

    > .label {
      color: ${(p) => (p.onRoot ? theme.colors.primary : theme.colors.b0)};
    }

    > .mobile-toggle {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      @media (min-width: ${ms.LG}px) {
        display: none;
      }
    }
  }
`

const ItemList = styled.div<{ expanded: boolean }>`
  display: ${(p) => (p.expanded ? 'block' : 'none')};
  margin-left: ${theme.spacing('m')};
  padding-right: ${theme.spacing('m')};

  @media (min-width: ${ms.LG}px) {
    display: block;
    margin-left: ${theme.spacing('l')};
  }
`

const Item = styled.div<{ selected: boolean; level: number }>`
  margin-bottom: ${theme.spacing('s')};
  margin-left: calc(${(p) => p.level} * ${theme.spacing('m')});

  > .label {
    ${theme.ty('rc-base')}
    color: ${(p) =>
      p.selected ? theme.colors.primary : theme.colors.shade.b2};
  }

  > .childs {
    margin-top: ${theme.spacing('s')};
  }
`
