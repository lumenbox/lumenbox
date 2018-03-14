import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import routed from '../../../signals/routed'

export default [set(state`auth.loginForm.activationKey.value`, props`activationKey`), routed('activate')]
