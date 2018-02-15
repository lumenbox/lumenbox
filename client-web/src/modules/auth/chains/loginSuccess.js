import setToken from '../actions/setToken'
import setUser from '../actions/setUser'
import autoRefreshToken from '../actions/autoRefreshToken'
import { state } from 'cerebral/tags'
import setCookie from '../../../actions/setCookie'

export default [
  setToken,
  setUser,
  setCookie('auth_token', state`auth.token`),
  setCookie('auth_user', state`auth.user`),
  autoRefreshToken
]
