import * as React from 'react'
import styled from 'styled-components'
import { ms, msList } from 'modules/browser/const'
import { FormattedStory } from '@kaminrunde/fireside-utils'
import theme from 'theme'

import * as list from 'theme/organisms'

type Props = {
  story: FormattedStory
  cfId: string
  'data-cy-state'?: string
}

export default function Story(props: Props) {
  // if(!props.story) console.log('########################################', props.cfId)
  const componentGapCss = useComponentGapCss(props.story)

  return (
    <Wrapper
      className="Story"
      grids={props.story?.grids}
      componentGapCss={componentGapCss}
      data-em-cfid={props.cfId}
    >
      {props.story?.allComponents
        .map((name) => props.story.componentsById[name])
        .map((component) => {
          const Component = list[component.name]
          const { gridArea } = component.props

          if (!Component) {
            return (
              <div key={gridArea} className={'story-wrapper ' + gridArea}>
                <h3>component &quot;{component.name}&quot; not found</h3>
              </div>
            )
          }

          return (
            <div key={gridArea} className={'story-wrapper ' + gridArea}>
              <Component {...component.props} />
            </div>
          )
        })}
    </Wrapper>
  )
}

const Wrapper = styled.div<any>`
  width: 100%;
  display: grid;

  > .story-wrapper {
    width: 100%;
    > * {
      width: 100%;
      height: 100%;
    }
  }

  ${(props) => props.componentGapCss}

  ${(props: any) => props.grids?.XS};
  grid-gap: ${theme.spacing('xs')};

  @media (min-width: ${ms.SM}px) {
    ${(props: any) => props.grids?.SM};
    grid-gap: ${theme.spacing('s')};
  }

  @media (min-width: ${ms.MD}px) {
    ${(props: any) => props.grids?.MD};
    grid-gap: ${theme.spacing('s')};
  }

  @media (min-width: ${ms.LG}px) {
    ${(props: any) => props.grids?.LG};
    grid-gap: ${theme.spacing('m')};
  }

  @media (min-width: ${ms.XL}px) {
    ${(props: any) => props.grids?.XL};
    grid-gap: ${theme.spacing('m')};
  }
`

function useComponentGapCss(story: FormattedStory) {
  return React.useMemo(() => {
    const componentGap: Record<string, 'S' | 'M' | 'L'> =
      story?.plugins?.componentGap || {}
    let result = ''

    const sizeToPx = {
      S: 20,
      M: 40,
      L: 60,
    }

    const dict: Record<string, { area: string; margin: number }[]> = {}

    for (const row in componentGap) {
      const [ms, id] = row.split('-')
      if (!story?.componentsById[id]) continue
      const area = story.componentsById[id].props.gridArea
      const margin = sizeToPx[componentGap[row]]
      if (!dict[ms]) dict[ms] = []
      dict[ms].push({ area, margin })
    }

    for (const mediaSize of msList) {
      if (!story?.grids[mediaSize] || !dict[mediaSize]) continue
      result += `@media (min-width:${ms[mediaSize]}px) {`
      result += `>.story-wrapper {margin-top:0px;}`
      for (const { area, margin } of dict[mediaSize]) {
        result += `>.${area} {margin-top:${margin}px;}`
      }
      result += '}'
    }

    return result
  }, [story])
}
