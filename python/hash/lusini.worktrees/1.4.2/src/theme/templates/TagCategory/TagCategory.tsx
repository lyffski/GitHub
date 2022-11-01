import * as React from 'react'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import Story from 'theme/atoms/Story'
import { TagCategoryPathProvider } from 'hooks/useTagCategoryPaths'
import Title from './Title'
import withTranslations from './withTranslations'
import styled from 'styled-components'
import theme from 'theme'
import config from 'config'
import Seo from 'theme/atoms/SEO'
import * as t from './types'

export default withTranslations(function TagCategory(props: t.Props) {
  return (
    <TagCategoryPathProvider paths={props.data?.existingPaths?.nodes || []}>
      <Layout
        breadcrumbs={[]}
        storyEvents={props.data.tagCategory.story?.events}
      >
        <Seo
          canonicalUrl={
            props.data.tagCategory.canonicalUrl ||
            `${config.baseUrl}/${config.locale}${props.data.tagCategory.urlPath}`
          }
          title={props.data.tagCategory.seoTitle}
          description={props.data.tagCategory.seoDescription}
          type="website"
          noFollow={config.features.seoNoFollow}
          breadcrumbs={[]}
          location={props.location}
          hrefLang={props.data.tagCategory.hrefLang}
        />

        <Container data-cy-ctx="templates/TagCategory">
          <TitleWrapper hasCrumbs={false}>
            <Title title={props.data.tagCategory.title} />
          </TitleWrapper>
          <Story
            story={props.data.tagCategory.story}
            cfId={props.data.tagCategory.contentfulID}
          />
        </Container>
      </Layout>
    </TagCategoryPathProvider>
  )
})

const TitleWrapper = styled.div<{ hasCrumbs: boolean }>`
  margin-top: ${(p) => (p.hasCrumbs ? 0 : theme.spacing('m'))};
  margin-bottom: ${theme.spacing('s')};

  @media (min-width: ${theme.ms.LG}px) {
    margin-bottom: ${theme.spacing('ml')};
  }
`
