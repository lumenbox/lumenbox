import { httpGet } from '@cerebral/http/operators'
import { unset } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import setUser from '../actions/setUser'
import loadDomains from '../../domains/chains/load'
import loadAccounts from '../../accounts/chains/load'
import { parallel } from 'cerebral'

export default [
  httpGet('/api/session'),
  {
    success: [setUser, parallel(loadDomains, loadAccounts)],
    error: unset(state`auth.user`)
  }
]
