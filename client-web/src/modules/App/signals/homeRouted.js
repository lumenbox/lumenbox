import { when } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import routed from '../../../signals/routed'
import callSignal from '../actions/callSignal'

export default [
  when(state`app.loaded`),
  {
    true: callSignal('account.dashboardRouted'),
    false: routed('home')
  }
]
