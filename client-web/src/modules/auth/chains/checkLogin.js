import { httpGet } from '@cerebral/http/operators'
import { unset } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import setUser from '../actions/setUser'

export default [
  httpGet('/api/session'),
  {
    success: setUser,
    error: unset(state`auth.user`)
  }
]
