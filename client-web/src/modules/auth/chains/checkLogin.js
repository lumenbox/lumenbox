import { unset, when } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import refreshToken from './refreshToken'
import getCookie from '../../../actions/getCookie'
import deleteCookie from '../../../actions/deleteCookie'

export default [
  getCookie(state`auth.token`, 'auth_token'),
  when(state`auth.token`),
  {
    true: refreshToken,
    false: [unset(state`auth.user`), deleteCookie('auth_user'), deleteCookie('auth_token')]
  }
]
