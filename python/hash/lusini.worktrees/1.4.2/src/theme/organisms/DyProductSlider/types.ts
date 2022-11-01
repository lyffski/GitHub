export type UserConfig = {
  gridArea: string
  dySelector: string
  pageType: string
  title: string
}

export type Context = never

export type Props = UserConfig & { context: Context }
