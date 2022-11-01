import './rules'
import { Action } from './actions'

declare global {
  interface ModuleActions {
    navigation: Action
  }
}
