import * as React from 'react'
import styled from 'styled-components'
import config from 'config'
import { preprocessStory } from '@kaminrunde/fireside-utils'
import Layout from 'containers/Layout'
import Container from 'theme/atoms/Container'
import * as controllerDict from 'theme/organisms/controllerDict'
import Spinner from 'theme/atoms/Spinner'

// preview-templates
import HomePreview from 'theme/templates/Home/Preview'
import ErrorPreview from 'theme/templates/Error/Preview'
import CategoryPreview from 'theme/templates/Category/Preview'
import LandingPagePreview from 'theme/templates/LandingPage/Preview'
import MagazinePreview from 'theme/templates/Magazine/Preview'
import MagazineArticlePreview from 'theme/templates/Magazine/MagazineArticle/Preview'
import TagCategoryPreview from 'theme/templates/TagCategory/Preview'
import ServicePreview from 'theme/templates/Service/Preview'

type Props = {
  location: {
    search: string
    pathname: string
  }
}

export default function Preview(props: Props) {
  const idMatch = props.location.search.match(/id=([^&]*)/)
  const id = idMatch ? idMatch[1] : null
  const typeMatch = props.location.search.match(/type=([^&]*)/)
  const type = typeMatch ? typeMatch[1] : null

  const [isFetching, entry, error] = useEntry(id)

  const isSmall = type === 'magazine-article' || type === 'help-and-service'

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted && typeof window === 'undefined')
    return (
      <SpinnerWrapper>
        <Spinner size="big" />
      </SpinnerWrapper>
    )

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return (
      <Layout smallContainer={isSmall}>
        <Container>
          <Wrapper>{error}</Wrapper>
        </Container>
      </Layout>
    )
  }

  if (isFetching)
    return (
      <Layout smallContainer={isSmall}>
        <Container>
          <Wrapper>fetching...</Wrapper>
        </Container>
      </Layout>
    )

  if (!id)
    return (
      <Layout smallContainer={isSmall}>
        <Container>
          <Wrapper>Invalid Contentful ID</Wrapper>
        </Container>
      </Layout>
    )

  if (!entry)
    return (
      <Layout smallContainer={isSmall}>
        <Container>
          <Wrapper>oops! an error happened</Wrapper>
        </Container>
      </Layout>
    )

  switch (type) {
    case 'static-block': {
      if (entry.identifier === 'homepage-block')
        return <HomePreview fields={entry} contentfulID={id} />
      if (entry.identifier === 'error-block')
        return <ErrorPreview fields={entry} contentfulID={id} />
      if (entry.identifier === 'magazine-overview')
        return <MagazinePreview fields={entry} />
      return null
    }
    case 'category':
      return <CategoryPreview fields={entry} contentfulID={id} />
    case 'page':
      return <LandingPagePreview fields={entry} contentfulID={id} />
    case 'magazine-article':
      return <MagazineArticlePreview fields={entry} />
    case 'tag-category':
      return <TagCategoryPreview fields={entry} />
    case 'help-and-service':
      return <ServicePreview fields={entry} />
    default:
      return (
        <Layout smallContainer={isSmall}>
          <Container>
            <Wrapper>Preview for {type} not implemented</Wrapper>
          </Container>
        </Layout>
      )
  }
}

function useEntry(id: string | null): [boolean, any, null | string] {
  const [isFetching, setIsFetching] = React.useState(true)
  const [entry, setEntry] = React.useState<null | any>(null)
  const [error, setError] = React.useState<null | string>(null)

  React.useEffect(() => {
    if (!id) return

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const client = require('contentful').createClient({
      space: config.modules.contentful.space,
      environment: config.modules.contentful.environment, // defaults to 'master' if not set
      accessToken: config.modules.contentful.previewToken,
      host: 'preview.contentful.com',
    })

    client
      .getEntry(id, {
        locale: config.i18n.locale,
      })
      .then(async (response) => {
        const rawStory = response.fields.story
        const finalStory = await preprocessStory(rawStory, {
          resolveController: (name) => controllerDict[name] || null,
        })
        setIsFetching(false)
        setEntry({ ...response.fields, story: finalStory })
      })
      .catch((e) => {
        setIsFetching(false)
        return setError(e)
      })
  }, [id])

  return [isFetching, entry, error]
}

const Wrapper = styled.div``

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`
