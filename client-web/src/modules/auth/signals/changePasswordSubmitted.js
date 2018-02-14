import { httpPost } from '@cerebral/http/operators'
import { set } from 'cerebral/operators'
import { resolveObject, state, props } from 'cerebral/tags'
import { isValidForm, resetForm } from '@cerebral/forms/operators'
import parseError from '../../../actions/parseError'
import notify from '../../../actions/notify'

export default [
  isValidForm(state`account.passwordForm`),
  {
    true: [
      set(state`account.isLoading`, true),
      httpPost(
        '/api/customer/change-password',
        resolveObject({
          currentPassword: state`account.passwordForm.password.value`,
          password: state`account.passwordForm.newPassword.value`,
          repeatPassword: state`account.passwordForm.confirmNewPassword.value`
        })
      ),
      {
        '401': notify('ERROR', 'Login failed'),
        success: [notify('SUCCESS', 'Password Changed'), resetForm(state`account.passwordForm`)],
        error: [parseError('Unexpected Error'), notify('ERROR', props`errorMessage`)]
      },
      set(state`account.isLoading`, false)
    ],
    false: []
  }
]
