import { httpGet } from '@cerebral/http/operators'
import setAccounts from '../actions/setAccounts'

export default [
  httpGet('/api/accounts'),
  {
    success: setAccounts,
    error: []
  }
]
