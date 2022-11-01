import config from 'config'
import * as t from '../types'

/** @firescoutMockFn userStatus.fetch */
export async function fetch(): Promise<t.api.Fetch> {
  const result = await window
    .fetch(config.modules.cart.fetchUserStateUrl, {
      credentials: 'include',
    })
    .then((res) => res.json())

  return result
}
