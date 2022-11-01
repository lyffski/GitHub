import * as React from 'react'
import Layout from 'containers/Layout'
import styled, { css } from 'styled-components'
import Container from 'theme/atoms/Container'
import Link from 'theme/atoms/Link'
import theme from 'theme'
import Story from 'theme/atoms/Story'
import { ms } from 'modules/browser/const'
import Pagination from 'theme/molecules/Pagination'
import withTranslations from './withTranslations'
import useTranslations from 'hooks/useTranslations'
import Seo from 'theme/atoms/SEO'
import config from 'config'
import { navigate } from 'gatsby'

type Props = {
  location: {
    pathname: string
    origin: string
  }
  data: {
    staticBlock: {
      story: any
      contentfulID: string
    }
    articles: {
      nodes: {
        title: string
        urlPath: string
        teaserImageUrl: string
        shortenedTeaser: string
      }[]
      pageInfo: {
        currentPage: number
        pageCount: number
        hasNextPage: boolean
        hasPreviousPage: boolean
      }
    }
  }
}

export default withTranslations(function MagazineTemplate(props: Props) {
  const pageInfo = props.data.articles.pageInfo
  const t = useTranslations<'templates-Magazine'>()

  const getIndices = (totalPages, currentPage) => {
    const allPages = Array.from(Array(totalPages + 1).keys()).slice(1)
    if (totalPages > 5) {
      if (currentPage < 3) return allPages.slice(0, 5)
      else if (totalPages - currentPage < 3) return allPages.slice(-5)
      else return allPages.slice(currentPage - 3, currentPage + 2)
    }
    return allPages
  }

  const handlePageChange = (setPage: number) => {
    navigate(`/m/${setPage > 0 ? 'page-' + (setPage + 1) : ''}`)
  }

  let prevPath = `/${config.locale}/m/page-${pageInfo.currentPage - 1}`
  let nextPath = `/${config.locale}/m/page-${pageInfo.currentPage + 1}`

  if (!pageInfo.hasNextPage) nextPath = ''
  if (!pageInfo.hasPreviousPage) prevPath = ''
  if (pageInfo.currentPage === 2)
    prevPath = `/${config.locale}/m/${props.location.pathname}`
  return (
    <Layout>
      <Seo
        canonicalUrl={`${config.baseUrl}${props.location.pathname}`}
        location={props.location}
        title={t.asText(false, 'headline')}
        description={t.asText(false, 'seo_description')}
        type="website"
        noFollow={config.features.seoNoFollow}
        prevPath={prevPath}
        nextPath={nextPath}
      />
      <Container>
        <Wrapper
          isFirstPage={pageInfo.currentPage === 1}
          data-cy-ctx="templates/Magazine"
        >
          {props.data.staticBlock?.story && (
            <Story
              data-cy-state="has-story"
              story={props.data.staticBlock.story}
              cfId={props.data.staticBlock.contentfulID}
            />
          )}

          <h1>{t('headline')}</h1>

          <ArticleList>
            {props.data.articles.nodes.map((article) => (
              <Article to={article.urlPath} key={article.urlPath}>
                <ArticleImage url={article.teaserImageUrl} />
                <div className="desc">
                  <h3>{article.title}</h3>
                  <p>{article.shortenedTeaser}</p>
                </div>
              </Article>
            ))}
          </ArticleList>

          {pageInfo.pageCount > 1 && (
            <div className="pagination-wrapper" data-cy-state="has-pagination">
              <Pagination
                currentPage={pageInfo.currentPage - 1}
                pageCount={pageInfo.pageCount}
                pageIndices={getIndices(
                  pageInfo.pageCount,
                  pageInfo.currentPage
                )}
                handlePageChange={handlePageChange}
              />
            </div>
          )}
        </Wrapper>
      </Container>
    </Layout>
  )
})

const Wrapper = styled.div<{ isFirstPage: boolean }>`
  padding-top: ${theme.spacing('ml')};
  @media (min-with: ${theme.ms.MD}px) {
    padding-top: ${theme.spacing('l')};
  }
  > h1 {
    ${theme.ty('rc-2xl')}
    color: ${theme.colors.b0};
    margin-bottom: ${theme.spacing('m')};
    ${(p) =>
      p.isFirstPage &&
      css`
        margin-top: ${theme.spacing('ml')};
      `}

    @media (min-with: ${theme.ms.MD}px) {
      ${theme.ty('rc-3xl')}
      margin-bottom: ${theme.spacing('ml')};
      ${(p) =>
        p.isFirstPage &&
        css`
          margin-top: ${theme.spacing('l')};
        `}
    }
  }
  > .pagination-wrapper {
    margin-top: ${theme.spacing('ml')};
  }
`

const ArticleList = styled.section`
  margin-top: ${theme.spacing('m')};

  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: ${theme.spacing('l')};
  grid-row-gap: calc(${theme.spacing('m')} * 2);

  @media (min-width: ${ms.MD}px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${ms.LG}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const ArticleImage = styled.div<{ url }>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 15rem;
`

const Article = styled(Link)`
  display: flex;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  flex-direction: column;

  > .desc {
    padding: ${theme.spacing('ml')};
    display: grid;

    > h3 {
      ${theme.ty('rc-base')}
      color: ${theme.colors.b0};
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      @media (min-width: ${ms.MD}px) {
        ${theme.ty('rc-2xl')}
      }
    }

    > p {
      ${theme.ty('r-s')}
      color: ${theme.colors.shade.b3};
      @media (min-width: ${ms.MD}px) {
        margin-bottom: ${theme.spacing('m')};
        ${theme.ty('r-base')}
        color: ${theme.colors.shade.b4};
      }
    }
  }
`
