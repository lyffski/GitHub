import * as React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { useFlyoutNavi } from 'modules/ui'
import Link from 'theme/atoms/Link'
import theme from 'theme'
import * as evt from '../../events'

type Props = {
  visible: boolean
}

type TreeItem = {
  urlPath: string
  path: string
  label: string
}

export type GQ = {
  tree: { nodes: TreeItem[] }
  navigation: {
    sidebar: { label: string; link: string }[]
  }
}

export default function Root(props: Props) {
  const navi = useFlyoutNavi()

  /** @firescoutMockVar app-FlyoutNavi.root-graphql-query */
  const gq: GQ = useStaticQuery(graphql`
    query DrawerNaviRoot {
      tree: allCategory(
        filter: { categoryLevel: { eq: 1 } }
        sort: { fields: position }
      ) {
        nodes {
          label
          path
          urlPath
        }
      }
      navigation {
        sidebar {
          label
          link
        }
      }
    }
  `)

  return (
    <Wrapper
      visible={props.visible}
      data-cy-state={props.visible ? 'k1-open' : undefined}
    >
      {gq.tree.nodes.map((node, i) => (
        <Row
          key={i}
          selected={navi.sidebarCategory === node.label}
          data-cy-handle="k1-item"
          to={node.urlPath}
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault()
            evt.mainCategoryClick(node.label)
            navi.setCategory(node.path)
          }}
        >
          <span>{node.label}</span>
        </Row>
      ))}

      <div className="divider" />

      {gq.navigation.sidebar.map((node) => (
        <Row
          className="h3"
          to={node.link}
          key={node.label}
          selected={false}
          data-cy-handle="customizable-navigation-item"
          onClick={() => evt.customizedNavigationClick(node.label)}
        >
          <span>{node.label}</span>
        </Row>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  padding-top: ${theme.spacing('ml')};
  padding-right: ${theme.spacing('ml')};

  .divider {
    border-top: 1px solid ${theme.colors.shade.b3};
    height: ${theme.spacing('m')};
    margin-top: ${theme.spacing('s')};
    margin-left: ${theme.spacing('xxl')};
  }
`

const Row = styled(Link)<{ selected: boolean }>`
  ${theme.ty('rc-2xl')};
  display: block;
  padding-top: ${theme.spacing('xs')};
  padding-bottom: ${theme.spacing('s')};
  margin: 0 0 0 ${theme.spacing('xxl')};
  cursor: pointer;
`
