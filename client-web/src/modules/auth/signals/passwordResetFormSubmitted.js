import { httpPost } from '@cerebral/http/operators'
import { set } from 'cerebral/operators'
import { resolveObject, props, state } from 'cerebral/tags'
import { isValidForm, resetForm } from '@cerebral/forms/operators'
import notify, { NotificationType } from 'actions/notify'
import parseError from 'actions/parseError'
import { goTo } from '@cerebral/router/operators'

export default [
  isValidForm(state`auth.passwordResetForm`),
  {
    true: [
      set(state`auth.isLoading`, true),
      httpPost(
        '/api/customer/reset-password',
        resolveObject({
          email: state`auth.passwordResetForm.email.value`,
          password: state`auth.passwordResetForm.password.value`,
          repeatPassword: state`auth.passwordResetForm.repeatPassword.value`,
          passwordResetCode: state`auth.passwordResetCode`
        })
      ),
      {
        success: [
          notify(NotificationType.INFO, 'Password has been reset'),
          resetForm(state`auth.passwordResetForm`),
          goTo('/login')
        ],
        error: [parseError('Unexpected Error'), notify(NotificationType.ERROR, props`errorMessage`)]
      },
      set(state`auth.isLoading`, false)
    ],
    false: []
  }
]
