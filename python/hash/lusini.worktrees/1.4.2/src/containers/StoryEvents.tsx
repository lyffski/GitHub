import * as React from 'react'
import store from 'store'

type Props = {
  storyEvents: Record<string, unknown>[] | void
  children: any
}

export default function StoryEvents(props: Props) {
  React.useMemo(() => {
    if (!props.storyEvents) return
    for (const event of props.storyEvents)
      if (typeof event === 'object' && event.type === 'PARTIAL_STATE_UPDATE')
        store.dispatch(event as any)
  }, [props.storyEvents])

  return <>{props.children}</>
}
