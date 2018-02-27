import { set, when } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import checkLogin from '../../auth/chains/checkLogin'
import loadDomains from '../../domains/chains/load'
import loadAccounts from '../../accounts/chains/load'
import { parallel } from 'cerebral'

export default [
  checkLogin,
  when(state`auth.user`),
  {
    true: parallel(loadDomains, loadAccounts),
    false: []
  },
  set(state`app.initialized`, true)
]
