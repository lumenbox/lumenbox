import { state } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'
import { goTo } from '@cerebral/router/operators'

export default formSubmitted({
  put: '/api/password',
  form: state`auth.changePasswordForm`,
  isLoading: state`auth.isLoading`,
  successMessage: 'Password Changed',
  successChain: [goTo('/')],
  unauthorisedMessage: 'Could not verify password'
})
