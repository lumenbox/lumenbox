import { set } from 'cerebral/operators'
import { props, state } from 'cerebral/tags'
import routed from '../../../signals/routed'

export default [
  set(state`auth.passwordResetForm.email.value`, props`email`),
  set(state`auth.passwordResetForm.token.value`, props`token`),
  routed('passwordReset')
]
