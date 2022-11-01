import * as React from 'react'
import config from 'config'

export const Context = React.createContext<(...args: any) => any>(() => {
  throw new Error(
    'you likely forgot to add "withTranslations" to your component'
  )
})

export default function useTranslations<Name extends keyof Snippets>() {
  type Fn = <Key extends keyof Snippets[Name]>(
    key: Key,
    variables?: Snippets[Name][Key] extends Record<string, string | number>
      ? Record<keyof Snippets[Name][Key], string | number> & {
          __transformers?: Partial<
            Record<keyof Snippets[Name][Key], (label: string | number) => any>
          >
        }
      : never
  ) => any

  interface Return extends Fn {
    asText: <Key extends keyof Snippets[Name]>(
      ref: React.RefObject<HTMLElement> | false,
      key: Key,
      variables?: Snippets[Name][Key] extends Record<string, string | number>
        ? Record<keyof Snippets[Name][Key], string | number>
        : never
    ) => string
  }

  return React.useContext(Context) as Return
}

let pluginAdminMode = false
if (typeof window !== 'undefined' && window.localStorage.getItem('em-admin')) {
  pluginAdminMode = true
}

type ExtractProps<TComponentOrTProps> =
  TComponentOrTProps extends React.ComponentType<infer TProps>
    ? TProps
    : TComponentOrTProps

export function withTranslations<C>(
  Component: C,
  useQuery: () => any
): React.ElementType<ExtractProps<C>> {
  return function withTranslations(props) {
    const gq = useQuery()
    const t = (key: string, variables?: Record<string, string>): any => {
      const result = gq[key]
      let value = result.value

      if (process.env.NODE_ENV === 'development' || config.features.devMode) {
        if (!result.value) {
          value = 'XXX-translate-me-XXX'
        }
      }

      if (!value)
        throw new Error(
          // @ts-expect-error
          `could not find snippet "${key}" in ${Component.displayName}`
        )
      if (variables) {
        value = parseString(value, variables)
      }

      if (pluginAdminMode) {
        return (
          <span
            data-em-snippetgroup={result.group}
            data-em-snippetname={result.name}
            data-em-cfid={result.cfId}
          >
            {typeof value === 'string' ? (
              value
            ) : (
              <>
                {value.map((row, i) => (
                  <span key={i}>{row}</span>
                ))}
              </>
            )}
          </span>
        )
      }

      return (
        <span>
          {typeof value === 'string' ? (
            value
          ) : (
            <>
              {value.map((row, i) => (
                <span key={i}>{row}</span>
              ))}
            </>
          )}
        </span>
      )
    }

    t.asText = (
      ref: React.RefObject<HTMLElement> | false,
      key: string,
      variables?: Record<string, string>
    ): string => {
      const result = gq[key]
      let value = result.value

      if (process.env.NODE_ENV === 'development' || config.features.devMode) {
        if (!result.value) {
          value = 'XXX-translate-me-XXX'
        }
      }
      if (!value)
        throw new Error(
          // @ts-expect-error
          `could not find snippet "${key}" in ${Component.displayName}`
        )
      if (variables) {
        for (const v in variables)
          value = value.replace(`{{${v}}}`, variables[v])
      }

      if (pluginAdminMode && ref) {
        ref.current?.setAttribute('data-em-snippetgroup', result.group)
        ref.current?.setAttribute('data-em-snippetname', result.name)
        ref.current?.setAttribute('data-em-cfid', result.cfId)
      }
      return value
    }

    return (
      <Context.Provider value={t}>
        {/** @ts-expect-error */}
        <Component {...props} />
      </Context.Provider>
    )
  }
}

function parseString(s: string, variables: any): string | any[] {
  if (!variables.__transformers) {
    let output = s
    for (const v in variables) output = output.replace(`{{${v}}}`, variables[v])
    return output
  }

  const output: any[] = []

  let cache = ''

  for (let i = 0; i < s.length; i++) {
    const char = s[i]
    if (char === '{' && s[i + 1] === '{') {
      if (cache) output.push(cache)
      cache = ''
      i++
      continue
    }

    if (char === '}' && s[i + 1] === '}') {
      i++
      if (variables.__transformers[cache])
        output.push(variables.__transformers[cache](variables[cache]))
      else output.push(variables[cache])
      cache = ''
      continue
    }

    cache += char
  }

  if (cache) output.push(cache)

  return output
}
