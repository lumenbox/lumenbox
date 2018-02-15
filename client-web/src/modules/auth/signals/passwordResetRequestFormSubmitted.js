import { state } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'
import { goTo } from '@cerebral/router/operators'

export default formSubmitted({
  post: '/api/reset-password-request',
  form: state`auth.passwordResetRequestForm`,
  isLoading: state`auth.isLoading`,
  successMessage: 'Password reset request sent',
  successChain: [goTo('/')]
})
