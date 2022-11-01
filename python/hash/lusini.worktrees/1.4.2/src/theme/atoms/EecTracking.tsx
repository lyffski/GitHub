import * as React from 'react'
import { dispatchEvent } from 'redux-ruleset'
import useInView from 'hooks/useInView'
import { TrackingConfig } from 'utils/eec'

type Props = {
  gridArea: string
  config?: TrackingConfig
  children: any
  threshold?: number
}

/**
 * Implements the enhanced ecommerce schema for organisms. see WDV-133 for more details
 * Backend code can be found in utils/eec.ts
 * To implement:
 * - wrap organism with this atom
 * - add types from utils/eec.ts
 * - add story-elements from utils/eec.ts
 */
export default function EecTracking(props: Props) {
  const [ref, isInView] = useInView<HTMLDivElement>(
    0,
    true,
    props.threshold || 0.8
  )

  React.useEffect(() => {
    if (!isInView) return
    scrollIntoView(props)
  }, [isInView])

  return (
    // eslint-disable-next-line @kaminrunde/firescout/onclick-needs-handle
    <div ref={ref} className="EecTracking" onClick={() => click(props)}>
      {props.children}
    </div>
  )
}

export const CLICK: 'atoms-EecTracking/CLICK' = 'atoms-EecTracking/CLICK'
export const SCROLL_INTO_VIEW: 'atoms-EecTracking/SCROLL_INTO_VIEW' =
  'atoms-EecTracking/SCROLL_INTO_VIEW'

export const click = (props: Props) =>
  dispatchEvent({
    type: CLICK,
    meta: {
      eecTracking: props.config,
    },
    payload: { path: document.location.pathname, gridarea: props.gridArea },
  })

export const scrollIntoView = (props: Props) =>
  dispatchEvent({
    type: SCROLL_INTO_VIEW,
    meta: {
      eecTracking: props.config,
    },
    payload: { path: document.location.pathname, gridarea: props.gridArea },
  })

declare global {
  interface RulesetDispatchEvents {
    'atoms/EecTracking':
      | ReturnType<typeof click>
      | ReturnType<typeof scrollIntoView>
  }
}
