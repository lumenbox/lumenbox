import { state } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'
import loginSuccess from '../chains/loginSuccess'
import { goTo } from '@cerebral/router/operators'

export default formSubmitted({
  post: '/api/user',
  form: state`auth.registerForm`,
  isLoading: state`auth.isLoading`,
  successChain: [loginSuccess, goTo('/register-complete')]
})
