import * as React from 'react'

type Result = {
  active: boolean
  has: (path: string) => boolean
  get: (path: string) => string
}

const Context = React.createContext<Result>({
  active: false,
  has: () => false,
  get: () => '',
})

/** @firescoutMockFn hooks.useTagCategoryPaths */
export default function useTagCategories() {
  return React.useContext(Context)
}

type Row = {
  categoryPath: string
  urlPath: string
}

export function TagCategoryPathProvider(props: {
  paths: Row[]
  children: any
}) {
  const map = new Map(props.paths.map((row) => [row.categoryPath, row.urlPath]))

  const result: Result = {
    active: true,
    has: (path: string) => map.has(path),
    get: (path: string) => map.get(path) || '',
  }
  return <Context.Provider value={result}>{props.children}</Context.Provider>
}
