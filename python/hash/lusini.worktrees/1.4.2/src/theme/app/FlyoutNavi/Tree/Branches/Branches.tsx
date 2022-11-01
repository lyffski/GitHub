import * as React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { useFlyoutNavi } from 'modules/ui'
import Link from 'theme/atoms/Link'
import Back from 'assets/back.svg'
import theme from 'theme'
import Button from 'theme/atoms/Button'
import useTranslations from 'hooks/useTranslations'
import * as evt from '../../events'

type TreeItem = {
  label: string
  path: string
  urlPath: string
  categoryLevel?: number
  teaserImg?: string
  childs?: TreeItem[] | any[]
}

export type GQ = {
  tree: { nodes: TreeItem[] }
}

export default function Branches() {
  const t = useTranslations<'app-FlyoutNavi'>()
  const navi = useFlyoutNavi()

  /** @firescoutMockVar app-FlyoutNavi.branches-graphql-query */
  const gq: GQ = useStaticQuery(graphql`
    query DrawerNaviBranch {
      tree: allCategory(
        filter: { categoryLevel: { gte: 1, lte: 6 } }
        sort: { fields: position }
      ) {
        nodes {
          label
          path
          urlPath
          categoryLevel
          childs: childrenCategory {
            label
            path
            urlPath
            categoryLevel
            teaserImg
            position
            childs: childrenCategory {
              id
              position
            }
          }
        }
      }
    }
  `)

  React.useEffect(() => {
    if (!gq.tree.nodes.find((node) => node.path === navi.sidebarCategory))
      navi.setCategory(null)
  }, [navi.sidebarCategory])

  const [label, urlPath, imgItems, nonImageItems, categoryLevel, parent] =
    React.useMemo(() => {
      const correctNode: TreeItem | any =
        gq.tree.nodes.find((node) => node.path === navi.sidebarCategory) || {}
      if (!correctNode.label) {
        return []
      }
      return [
        correctNode.label,
        correctNode.urlPath,
        correctNode.childs
          ?.filter((child) => child.teaserImg)
          .sort((a, b) => a.label.localeCompare(b.label)) || [],
        correctNode.childs
          ?.filter((child) => !child.teaserImg)
          .sort((a, b) => a.label.localeCompare(b.label)) || [],
        correctNode.categoryLevel,
        correctNode.path.substring(0, correctNode.path.lastIndexOf('>') - 1),
      ]
    }, [navi.sidebarCategory, gq.tree])

  if (!label) return <Wrapper></Wrapper>
  return (
    <Wrapper data-cy-state={categoryLevel === 1 ? 'k2-open' : 'k3-open'}>
      <div className="headline">
        <Back
          data-cy-handle="category-back"
          onClick={() => navi.setCategory(parent)}
        />
        {/* eslint-disable-next-line @kaminrunde/firescout/onclick-needs-handle */}
        <Link
          to={urlPath}
          onClick={() =>
            evt.headlineClick(
              navi.sidebarCategory?.split(' > ')[-1] || '',
              navi.sidebarCategory
            )
          }
        >
          <h3>{label}</h3>
        </Link>
      </div>
      <div className="img-items">
        {imgItems.map((subNode, i) => (
          <ImgRow
            data-cy-handle={categoryLevel === 1 ? 'k2-item' : 'k3-item'}
            data-cy-state={
              categoryLevel === 1 ? 'k2-has-teasers' : 'k3-has-teasers'
            }
            as={Link}
            to={subNode.urlPath}
            key={i}
            onClick={(e: { preventDefault: () => void }) => {
              if (subNode.childs.length > 0) {
                e.preventDefault()
              }
              evt.subCategoryClick(subNode.label, subNode.path)
              subNode.childs.length !== 0 && navi.setCategory(subNode.path)
            }}
          >
            <img src={subNode.teaserImg} />
            <div className="label">{subNode.label}</div>
          </ImgRow>
        ))}
      </div>
      <div className="text-items">
        {nonImageItems.map((subNode, i) => (
          <Row
            data-cy-handle={categoryLevel === 1 ? 'k2-item' : 'k3-item'}
            className="h4"
            as={Link}
            to={subNode.urlPath}
            key={i}
            selected={navi.sidebarCategory === subNode.path}
            onClick={(e: { preventDefault: () => void }) => {
              if (subNode.childs.length > 0) {
                e.preventDefault()
              }
              evt.subCategoryClick(subNode.label, subNode.path)
              subNode.childs.length !== 0 && navi.setCategory(subNode.path)
            }}
          >
            <span>{subNode.label}</span>
          </Row>
        ))}
      </div>
      <LinkContainer>
        <Button
          variation="secondary"
          data-cy-handle={'cat-overview-btn'}
          onClick={() => {
            evt.showAllButtonClick(
              navi.sidebarCategory?.split(' > ')[
                navi.sidebarCategory?.split(' > ').length - 1
              ] || '',
              navi.sidebarCategory
            )
          }}
          to={urlPath}
        >
          {t('app_flyout_show_all_btn')}
        </Button>
      </LinkContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: ${theme.spacing('l')};

  > .headline {
    display: flex;
    > svg {
      margin: 0 ${theme.spacing('ml')};
      width: 1.375rem;
      height: 1.375rem;
      cursor: pointer;
      #back {
        stroke: ${theme.colors.b0};
      }
    }
    > h3 {
      ${theme.ty('rc-2xl')};
      margin: 0 0 0 -2px;
    }
  }

  .img-items {
    margin-left: ${theme.spacing('xxl')};
    margin-top: ${theme.spacing('ml')};
    margin-bottom: ${theme.spacing('xs')};
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`

const Row = styled.div<{ selected: boolean }>`
  ${theme._ty([16, 0.6, 16], theme.fontSpecial, '400')};
  padding-top: ${theme.spacing('xxs')};
  padding-bottom: ${theme.spacing('s')};
  margin-left: ${theme.spacing('xxl')} !important;
  cursor: pointer;
  color: ${theme.colors.b0};
  display: flex;
  > svg {
    font-size: 1.3rem;
  }
`

const ImgRow = styled.div`
  ${theme._ty([16, 0.6, 16], theme.fontSpecial, '400')};
  width: 9.375rem;
  margin: 0 ${theme.spacing('m')} ${theme.spacing('m')} 0;
  cursor: pointer;
  > img {
    width: 100%;
    display: block;
  }
  > .label {
    color: ${theme.colors.b0};
    margin-top: ${theme.spacing('xxs')};
    display: block;
  }
`

const LinkContainer = styled.div`
  margin: ${theme.spacing('m')} ${theme.spacing('xxl')};
`
