export type CustomerType = 'b2b' | 'b2c'
export type UserStatus = 'loggedIn' | 'loggedOut'

export declare namespace api {
  export type Fetch = UserStatus
}
export type DlEvent =
  | 'overlay_b2b2c_switch'
  | 'overlay_b2b2c_x_click'
  | 'navigation_b2b2c_switch'
