import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import Story from 'theme/atoms/Story'
import Seo from 'theme/atoms/SEO'
import config from 'config'
import * as event from 'features/tracking/events'

type Props = {
  data: {
    staticBlock: {
      story: any
      contentfulID: string
      description: string
      title: string
    }
  }
  location: {
    pathname: string
    origin: string
  }
}

export default function Page404(props: Props) {
  React.useEffect(() => {
    event.page404Reached(props.location.pathname)
  }, [])

  return (
    <Layout breadcrumbs={[{ label: 'Home', link: '/' }, { label: '404' }]}>
      <Seo
        canonicalUrl={`${props.location.origin}${props.location.pathname}`}
        location={props.location}
        title={props.data.staticBlock?.title}
        description={props.data.staticBlock?.description}
        type="website"
        noFollow={config.features.seoNoFollow}
      />
      <Container>
        <div style={{ height: 40 }} />
        <Story
          story={props.data.staticBlock?.story}
          cfId={props.data.staticBlock?.contentfulID}
        />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query NotFoundBlock {
    staticBlock(identifier: { eq: "404" }) {
      story
      contentfulID
      description
      title
    }
  }
`
