import { state } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'
import { goTo } from '@cerebral/router/operators'

export default formSubmitted({
  post: '/api/reset-password',
  form: state`auth.passwordResetForm`,
  isLoading: state`auth.isLoading`,
  successMessage: 'Password has been reset',
  successChain: [goTo('/')]
})
