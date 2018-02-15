import { state } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'

export default formSubmitted({
  post: '/api/change-password',
  form: state`auth.changePasswordForm`,
  isLoading: state`auth.isLoading`,
  successMessage: 'Password Changed'
})
