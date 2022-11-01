import { ms } from './const'

export type WindowSize = {
  name: keyof typeof ms
  width: number
  height: number
}
