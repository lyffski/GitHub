import * as React from 'react'
import styled from 'styled-components'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import Seo from 'theme/atoms/SEO'
import theme from 'theme'
import Story from 'theme/atoms/Story'
import Link from 'theme/atoms/Link'
import withTranslations from '../withTranslations'
import useTranslations from 'hooks/useTranslations'
import LinkArrow from 'assets/link-arrow.svg'
import { ms } from 'modules/browser/const'
import config from 'config'
import * as t from './types'

export default withTranslations(function MagazineArticleTemplate(
  props: t.Props
) {
  const crumbs = [
    { label: 'Magazine', link: '/m/' },
    { label: props.data.magazineArticle.title },
  ]
  const t = useTranslations<'templates-Magazine'>()
  const relatedArticles =
    props.data.magazineArticle.relatedArticles.length > 1
      ? props.data.magazineArticle.relatedArticles
      : null

  return (
    <Layout
      breadcrumbs={crumbs}
      storyEvents={props.data.magazineArticle.story?.events}
      smallContainer
    >
      <Seo
        canonicalUrl={
          props.data.magazineArticle.canonicalUrl ||
          `${config.baseUrl}${props.location.pathname}`
        }
        location={props.location}
        title={props.data.magazineArticle.seoTitle}
        description={props.data.magazineArticle.seoDescription}
        type="blog"
        hrefLang={props.data.magazineArticle.hrefLang}
      />

      <Container>
        <Headline>{props.data.magazineArticle.title}</Headline>
        <Teaser>{props.data.magazineArticle.teaser}</Teaser>
        <Story
          story={props.data.magazineArticle.story}
          cfId={props.data.magazineArticle.contentfulID}
        />
      </Container>
      <Container data-cy-ctx="templates/Magazine" forceBigSize>
        {relatedArticles && (
          <div data-cy-state="related-articles-shown">
            <RelatedArticlesHeadline>
              <h2>{t('related_article_headline')}</h2>
            </RelatedArticlesHeadline>

            <RelatedArticles className="related-articles">
              {relatedArticles.slice(0, 4).map((article) => {
                if (article.fields?.active) {
                  return (
                    <RelatedItem
                      to={`/m/${article.fields.slug}`}
                      bg={article.fields.teaserImageUrl[0].original_secure_url}
                    >
                      <div className="teaser-description">
                        <h3
                          className="image-teaser-title"
                          title={article.fields.title}
                        >
                          {article.fields.title}
                        </h3>
                        <span>
                          {t('to_magazine_article')} <LinkArrow />
                        </span>
                      </div>
                    </RelatedItem>
                  )
                }
                return null
              })}
            </RelatedArticles>
          </div>
        )}
      </Container>
    </Layout>
  )
})

const RelatedItem = styled(Link)<{ bg: string }>`
  height: 17.75rem;
  width: 100%;
  max-width: 100%;
  max-height: 17.75rem;
  background-image: url('${(p) => p.bg}');
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: ${theme.spacing('xs')};
  @media (min-width: ${ms.MD}px) {
    width: 17.75rem;
    max-width: 17.75rem;
  }
  > .teaser-description {
    max-height: 50%;
    margin-bottom: ${theme.spacing('l')};
    padding: ${theme.spacing('s')} ${theme.spacing('m')};
    background: ${theme.colors.white};
    max-width: 15rem;
    left: 0px;
    bottom: ${theme.spacing('l')};
    opacity: 0.8;
    > h3 {
      max-height: 4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      ${theme.ty('rc-2xl')}
      margin-bottom:${theme.spacing('xs')}
    }
    > span {
      color: ${theme.colors.primary};
      ${theme.ty('rc-base')};
      > svg {
        color: ${theme.colors.primary};
        #Path-5,
        #Path-6 {
          color: ${theme.colors.primary};
          stroke: ${theme.colors.primary};
        }
        g {
          color: ${theme.colors.primary};
          stroke: ${theme.colors.primary};
          filter: none;
        }
      }
    }
  }
`
const RelatedArticlesHeadline = styled.div`
  margin-top: ${theme.spacing('xl')};
  > h2 {
    color: ${theme.colors.b0};
    ${theme.ty('rc-2xl')}
    @media (min-width: ${ms.MD}px) {
      ${theme.ty('rc-3xl')}
    }
    margin-bottom: ${theme.spacing('m')};
  }
`
const RelatedArticles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${theme.spacing('xs')} 0;
  @media (min-width: ${ms.MD}px) {
    flex-direction: row;
  }
`
const Headline = styled.h1`
  ${theme.ty('rc-3xl')}

  @media (min-width: ${theme.ms.MD}px) {
    ${theme.ty('rc-4xl')}
  }
  color: ${theme.colors.primary};
  margin-top: ${theme.spacing('ml')};
`

const Teaser = styled.p`
  ${theme.ty('r-base')}
  @media (min-width: ${theme.ms.MD}px) {
    ${theme.ty('r-l')}
  }
  border-left: 10px solid ${theme.colors.primary};
  padding-left: ${theme.spacing('m')};
  margin: ${theme.spacing('m')} 0;
`
