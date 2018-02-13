import { httpPost } from '@cerebral/http/operators'
import { unset } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import deleteCookie from 'actions/deleteCookie'

export default [
  httpPost('/api/auth/logout', undefined),
  {
    success: [],
    error: []
  },
  unset(state`auth.user`),
  // unset(state`auth.token`),
  deleteCookie('auth_user')
  // deleteCookie('auth_token')
]
