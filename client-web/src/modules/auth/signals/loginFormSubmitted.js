import { httpPost } from '@cerebral/http/operators'
import { set } from 'cerebral/operators'
import { resolveObject, props, state } from 'cerebral/tags'
import { isValidForm, resetForm } from '@cerebral/forms/operators'
import loginSuccess from '../chains/loginSuccess'
import parseError from '../../../actions/parseError'
import goToPageAfterLogin from '../actions/goToPageAfterLogin'
import notify from '../../../actions/notify'

export default [
  isValidForm(state`auth.loginForm`),
  {
    true: [
      set(state`auth.isLoading`, true),
      httpPost(
        '/api/auth/login',
        resolveObject({
          userName: state`auth.loginForm.email.value`,
          password: state`auth.loginForm.password.value`
        })
      ),
      {
        '401': notify('ERROR', 'Login failed'),
        success: [loginSuccess, resetForm(state`auth.loginForm`), goToPageAfterLogin],
        error: [parseError('Unexpected Error'), notify('ERROR', props`errorMessage`)]
      },
      set(state`auth.isLoading`, false)
    ],
    false: []
  }
]
