import { httpPost } from '@cerebral/http/operators'
import { set } from 'cerebral/operators'
import { resolveObject, props, state } from 'cerebral/tags'
import { isValidForm, resetForm } from '@cerebral/forms/operators'
import notify from '../../../actions/notify'
import parseError from '../../../actions/parseError'
import { goTo } from '@cerebral/router/operators'

export default [
  isValidForm(state`auth.passwordResetRequestForm`),
  {
    true: [
      set(state`auth.isLoading`, true),
      httpPost(
        '/api/customer/reset-password-request',
        resolveObject({
          email: state`auth.passwordResetRequestForm.email.value`,
          tokenResponse: 'not required'
        })
      ),
      {
        success: [
          notify('INFO', 'Password reset request sent'),
          resetForm(state`auth.passwordResetRequestForm`),
          goTo('/')
        ],
        error: [parseError('Unexpected Error'), notify('ERROR', props`errorMessage`)]
      },
      set(state`auth.isLoading`, false)
    ],
    false: []
  }
]
