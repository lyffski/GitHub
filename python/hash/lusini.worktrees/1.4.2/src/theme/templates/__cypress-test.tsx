import * as React from 'react'
import GlobalStyle from 'containers/GlobalStyle'
import Story from 'theme/atoms/Story'
import Container from 'theme/atoms/Container'
import { preprocessStory } from '@kaminrunde/fireside-utils'

type Props = {
  location: {
    search: string
  }
}

export default function CypressTest(p: Props) {
  const [story, setStory] = React.useState<any>(null)
  const [error, setError] = React.useState<null | Error>(null)

  const [templateConfig, setTemplateConfig] = React.useState<{
    name: string
    props: any
  } | null>(null)

  React.useEffect(() => {
    const nameMatch = p.location.search.match(/name=([^&]*)/)
    const propsMatch = p.location.search.match(/props=([^&]*)/)
    const typeMatch = p.location.search.match(/type=([^&]*)/)
    if (!nameMatch || !propsMatch || !typeMatch)
      return setError(new Error('invalid query'))
    const name = nameMatch[1]
    const props = JSON.parse(decodeURIComponent(propsMatch[1]))
    const type = typeMatch[1]

    if (type === 'template') setTemplateConfig({ name, props })
    else fetchStory(name, props).then(setStory).catch(setError)
  }, [p.location.search])

  if (error !== null) throw error

  if (!story && !templateConfig) return <div>loading...</div>

  if (templateConfig) {
    return <Template {...templateConfig} />
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Story story={story} cfId="" />
      </Container>
    </>
  )
}

function Template(props: { name: string; props: any }) {
  const name =
    props.name === 'MagazineArticle'
      ? 'Magazine/MagazineArticle/MagazineArticle.tsx'
      : `${props.name}/${props.name}.tsx`
  const Component = React.lazy(() => import(`./${name}`))

  return (
    <React.Suspense fallback="fetch component...">
      <Component {...props.props} />
    </React.Suspense>
  )
}

function fetchStory(name: string, props: any) {
  const component = {
    name: name,
    id: 'generated-id',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    props: { ...props, gridArea: 'generated-organism' },
  }

  const rawStory: any = {
    version: '1.0.0',
    hash: 'foo',
    componentsById: { [component.props.gridArea]: component },
    allComponents: [component.props.gridArea],
    grids: {
      XS: {
        enabled: true,
        ms: 'XS',
        gap: 10,
        grid: [[component.props.gridArea]],
        widths: ['1fr'],
        heights: ['auto'],
      },
    },
    plugins: {},
  }

  // res.send(rawStory)
  return preprocessStory(rawStory, {
    resolveController: (name) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require(`../organisms/${name}/controller.ts`).default
      } catch (e) {
        return null
      }
    },
  })
}
