import { when } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import loadDomains from '../../domains/chains/load'
import loadAccounts from '../../accounts/chains/load'
import routed from '../../../signals/routed'

export default [
  routed('dashboard'),
  when(state`app.initialized`),
  {
    true: [
      when(state`auth.user`),
      {
        true: [loadDomains, loadAccounts],
        false: []
      }
    ],
    false: []
  }
]
