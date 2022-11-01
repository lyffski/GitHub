import * as React from 'react'
import * as dy from 'utils/dy'
import { dispatchEvent } from 'redux-ruleset'

export type Props<Type, DYResponse> = {
  selector: string
  pageType: string
  /**
   * **NO_CACHE**: a loading spinner will be displayed while data is fetched. data will always be refetched when Components
   * mounts. Data will not be stored. If fetch yields content the render method will be displayed with dy-content
   */
  strategy: 'NO_CACHE'
  loading?: JSX.Element
  shape: Shape
  processResponse?: (raw: {
    custom: DYResponse
    skus: string[]
  }) => Promise<Type> | Type
  render: (data: Type) => JSX.Element
}

export const click = (decissionId: string) =>
  dispatchEvent({
    type: 'Personalization/CLICK' as 'Personalization/CLICK',
    payload: decissionId,
  })

declare global {
  interface RulesetDispatchEvents {
    'atoms/Personalization': ReturnType<typeof click>
  }
}

export default function Personalization<Type, DYResponse>(
  props: Props<Type, DYResponse>
) {
  const [data, setData] = React.useState<Type | null>(null)
  const [invalid, setInvalid] = React.useState(false)

  React.useEffect(() => {
    dy.fetchContent(props.selector, props.pageType).then(async (result) => {
      if (!isValid(props.shape, result.custom)) {
        // console.log('not a valid shape [should be tracked later]')
        setInvalid(true)
        return
      }

      if (props.processResponse) {
        setData(await props.processResponse(result as any))
      } else setData(result as any)
    })
  }, [props.selector, props.processResponse])

  if (invalid) return null

  if (!data) return props.loading || null

  return props.render(data)
}

type Shape =
  | 'string'
  | 'number'
  | 'bool'
  | ['array', Shape]
  | ['object', Record<string, Shape>]

function isValid(shape: Shape, data: any) {
  if (Array.isArray(shape)) {
    if (shape[0] === 'array') {
      if (!Array.isArray(data)) return false
      for (const item of data) {
        if (!isValid(shape[1], item)) return false
      }
      return true
    } else {
      if (Array.isArray(data) || data === null || typeof data !== 'object')
        return false
      for (const key in data) {
        if (!isValid(shape[1][key], data[key])) return false
      }
      return true
    }
  } else {
    switch (shape) {
      case 'bool':
        return typeof data === 'boolean'
      case 'number':
        return typeof data === 'number'
      case 'string':
        return typeof data === 'string'
      default:
        return false
    }
  }
}
