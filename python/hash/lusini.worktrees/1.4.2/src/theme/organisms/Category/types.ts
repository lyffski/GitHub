export type UserConfig = {
  __version: number
  gridArea: string
  categoryId: string
  tag?: '' | 'sale' | 'new'
  injectedTeasers?: {
    title: string
    imgUrl: string
    linkTarget: string
    linkLabel: string
    template: 'Image'
  }[]
  showInjectedTeaser?: boolean
}

export type Context = {
  categoryPath: string
  mode: 'PRODUCTS' | 'SERIES'
  filters: { label: string; key: string; filtertype: string; unit?: string }[]
}

export type Props = UserConfig & {
  context: Context
}
