import * as React from 'react'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import { useInitializer } from 'modules/seriesDetail'
import Head from './Head'
import { useSeriesContainer } from 'modules/seriesDetail'
import { Crumb } from 'theme/atoms/Breadcrumbs'
import styled from 'styled-components'
import Listing from './Listing'
import theme from 'theme'
import withTranslations from './withTranslations'
import Seo from 'theme/atoms/SEO'
import config from 'config'
import { createCrumbsFromCategoryTree } from 'utils/createCrumbs'

type Props = {
  '*': string
  location: {
    pathname: string
    origin: string
  }
  pageContext: {
    hrefLang: {
      url: string
      locale: string
    }[]
  }
}

export function Series(props: Props) {
  const objectID = props['*']
  const container = useSeriesContainer()

  useInitializer(objectID)
  const crumbs: Crumb[] = container.data?.categories
    ? createCrumbsFromCategoryTree(
        container.data.mainCategory || container.data.categories,
        container.data.title
      )
    : []

  return (
    <Layout breadcrumbs={crumbs}>
      {props.location.origin && (
        <span data-cy-state="has-seo">
          <Seo
            location={props.location}
            canonicalUrl={`${config.baseUrl}/${config.locale}/series/${objectID}/`}
            title={
              container.isFetching
                ? 'Gastronomiebedarf | Schnell und einfach online'
                : container.data?.title || ''
            }
            description={
              container.isFetching
                ? 'Alles, was Gastgeber brauchen. 40.000 Artikel unter einem Dach. Service & Beratung. Kauf ohne Risiko. Profiqualität, faire Preise.'
                : container.data?.description.slice(0, 250) + '...'
            }
            type="website"
            noFollow={config.features.seoNoFollow}
            hrefLang={props.pageContext.hrefLang.map((row) => ({
              url: row.url + objectID + '/',
              locale: row.locale,
            }))}
          />
        </span>
      )}
      <Wrapper data-cy-ctx="templates/Series">
        <Head />
        {container.data && (
          // eslint-disable-next-line @kaminrunde/firescout/jsx-expression-needs-state
          <Listing container={container.data} filters={container.filters} />
        )}
      </Wrapper>
    </Layout>
  )
}

export default withTranslations(Series)

const Wrapper = styled(Container)`
  min-height: 100vh;
  > .Listing {
    margin-top: ${theme.spacing('ml')};

    @media (min-width: ${theme.ms.MD}px) {
      margin-top: ${theme.spacing('l')};
    }
  }
`
