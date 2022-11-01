import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import Layout from 'containers/Layout'
import Seo from 'theme/atoms/SEO'
import Story from 'theme/atoms/Story'
import Container from 'theme/atoms/Container'
import NavigationTree from './NavigationTree'
import { ms } from 'modules/browser/const'
import { Crumb } from 'theme/atoms/Breadcrumbs'
import config from 'config'
import * as t from './types'

const createCrumbs = (serviceData) => {
  const crumbs: Crumb[] = []
  crumbs.push({ label: serviceData.title })
  if (serviceData.parentPage) {
    crumbs.push({
      label: serviceData.parentPage.title,
      link: serviceData.parentPage.urlPath,
    })
    if (serviceData.parentPage.parentPage) {
      crumbs.push({
        label: serviceData.parentPage.parentPage.title,
        link: serviceData.parentPage.parentPage.urlPath,
      })
    }
  }
  crumbs.reverse()
  return crumbs
}

export default function Service(props: t.Props) {
  const crumbs = createCrumbs(props.data.servicePage)
  return (
    <Layout breadcrumbs={crumbs}>
      <Container>
        <Seo
          canonicalUrl={`${config.baseUrl}${props.location.pathname}`}
          location={props.location}
          title={props.data.servicePage.seoTitle || ''}
          description={props.data.servicePage.seoDescription}
          type="website"
        />
        <Wrapper data-cy-ctx="templates/Service">
          <NavigationTree contentfulID={props.data.servicePage.contentfulID} />
          <div className="content">
            <h1>{props.data.servicePage.headline}</h1>
            <Story
              story={props.data.servicePage.story}
              cfId={props.data.servicePage.contentfulID}
            />
          </div>
        </Wrapper>
      </Container>
    </Layout>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing('ml')};

  > .NavigationTree {
    width: 100%;
    margin-bottom: ${theme.spacing('m')};
  }

  > .content {
    > h1 {
      ${theme.ty('rc-3xl')}
      color: ${theme.colors.primary};
      margin-bottom: ${theme.spacing('m')};
      text-transform: uppercase;
    }
  }

  @media (min-width: ${ms.MD}px) {
    > .content > h1 {
      ${theme.ty('rc-4xl')}
    }
  }

  @media (min-width: ${ms.LG}px) {
    flex-direction: row;
    > .NavigationTree {
      min-width: 17.6875rem;
      max-width: 17.6875rem;
      margin-bottom: 0;
    }
    > .content {
      max-width: 700px;
      margin-left: ${theme.spacing('m')};
    }
  }
`
