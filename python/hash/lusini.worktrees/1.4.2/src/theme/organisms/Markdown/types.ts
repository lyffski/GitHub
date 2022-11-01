import { OptImg } from 'utils/imageOptimization'

export type UserConfig = {
  centered: boolean
  md: string
  imagePosition: string
  imageSrc: string
  imageLink: string
  imageCaption: string
  imageAlt: string
  imageWidth: 30 | 40 | 50
  label: string
  isRounded: boolean
}

export type Context = {
  imageBase64: string
  optImg: OptImg | null
}

export type Props = UserConfig & {
  context: Context
}
