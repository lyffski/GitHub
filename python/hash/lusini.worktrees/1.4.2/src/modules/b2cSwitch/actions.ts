import * as at from './const'
import * as t from './types'

export const setCustomerType = (
  customerType: t.CustomerType,
  dlEvent: t.DlEvent = 'navigation_b2b2c_switch'
) => ({
  type: at.SET_CUSTOMER_TYPE,
  payload: { customerType, dlEvent },
})

export const setUserStatus = (userStatus: t.UserStatus) => ({
  type: at.SET_USER_STATUS,
  payload: userStatus,
})

export type SetCustomerType = ReturnType<typeof setCustomerType>
export type SetUserStatus = ReturnType<typeof setUserStatus>

export type Action = SetCustomerType | SetUserStatus
