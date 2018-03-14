import { set, when } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import { redirect as Redirect } from '@cerebral/router/operators'
import waitUntilInitialised from '../actions/waitUntilInitialised'

export default (page, { authroised, unauthorised, redirect = '/' } = {}) => [
  set(state`app.showMobileMenu`, false),
  waitUntilInitialised,
  when(state`auth.user`, user => (authroised && user) || (unauthorised && !user) || (!authroised && !unauthorised)),
  {
    true: set(state`app.page`, page),
    false: Redirect(redirect)
  }
]
