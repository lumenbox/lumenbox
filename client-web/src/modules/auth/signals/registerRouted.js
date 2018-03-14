import { when } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import { redirect } from '@cerebral/router/operators'
import routed from '../../../signals/routed'
import waitUntilInitialised from '../../../actions/waitUntilInitialised'

export default [
  waitUntilInitialised,
  when(state`auth.user`),
  {
    true: redirect('/'),
    false: routed('register')
  }
]
