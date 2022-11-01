import * as React from 'react'
import Layout from 'containers/Layout'
import Story from 'theme/atoms/Story'
import Container from 'theme/atoms/Container'
import Title from './Title'
import theme from 'theme'
import styled from 'styled-components'
import { ms } from 'modules/browser/const'
import { Crumb } from 'theme/atoms/Breadcrumbs'
import Seo from 'theme/atoms/SEO'
import withTranslations from './withTranslations'
import config from 'config'
import useTranslations from 'hooks/useTranslations'
import * as t from './types'
import { listingContextBrandName } from './events'

export default withTranslations(function Category(props: t.Props) {
  const t = useTranslations<'templates-Category'>()
  const category = props.data.category
  const defaultDescription = t.asText(false, 'default_description_text')
  const defaultTitleText = t.asText(false, 'default_title_text')

  const crumbs =
    category.parent && category.categoryLevel !== 0
      ? createCrumbs(category)
      : undefined
  const cfId = category.contentfulID
  const title = category.title
  const seoTitle = category.seoTitle || defaultTitleText
  const description = category.seoDescription || defaultDescription

  React.useEffect(() => {
    listingContextBrandName(category.brand || '')
  }, [])

  return (
    <Layout breadcrumbs={crumbs} storyEvents={category.story?.events}>
      <Seo
        canonicalUrl={
          category.canonicalUrl ||
          `${config.baseUrl}/${config.locale}${category.urlPath}`
        }
        title={seoTitle || title}
        description={description || category.title + ' ' + SeoDefaultText}
        type="website"
        noFollow={category.noIndex}
        breadcrumbs={crumbs}
        location={props.location}
        hrefLang={category.hrefLang}
      />
      <Container
        data-cy-ctx="templates/Category"
        brand={category.brand !== '' ? category.brand : null}
      >
        <TitleWrapper hasCrumbs={!!crumbs}>
          <Title title={title} isSeriesListing={category.hasSeries} />
        </TitleWrapper>
        <Story
          story={category.story}
          cfId={cfId === '2Eg8MSICV4TS8mrIjyUJnM' ? '' : cfId}
        />
        {cfId === '2Eg8MSICV4TS8mrIjyUJnM' && (
          <SeoDefaultText
            data-cy-state="default-seoText-shown"
            dangerouslySetInnerHTML={{ __html: category.seoText }}
          />
        )}
      </Container>
    </Layout>
  )
})

function createCrumbs(crumb: t.CategoryCrumb, crumbs: Crumb[] = []): Crumb[] {
  crumbs.push({
    label: crumb.label,
    link: crumbs.length === 0 ? undefined : crumb.urlPath,
  })

  if (crumb.parent && crumb.parent.categoryLevel !== 0) {
    return createCrumbs(crumb.parent, crumbs)
  } else {
    crumbs.push({ label: 'Home', link: '/' })
    return crumbs.reverse()
  }
}

const TitleWrapper = styled.div<{ hasCrumbs: boolean }>`
  margin-top: ${(p) => (p.hasCrumbs ? 0 : theme.spacing('m'))};
  margin-bottom: ${theme.spacing('s')};

  @media (min-width: ${ms.LG}px) {
    margin-bottom: ${theme.spacing('ml')};
  }
`

const SeoDefaultText = styled.div`
  margin-top: ${theme.spacing('m')};
`
