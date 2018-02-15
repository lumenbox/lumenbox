import { state } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'
import loginSuccess from '../chains/loginSuccess'
import { goTo } from '@cerebral/router/operators'

export default formSubmitted({
  post: '/api/login',
  form: state`auth.loginForm`,
  isLoading: state`auth.isLoading`,
  successChain: [...loginSuccess, goTo('/')],
  unauthorisedMessage: 'Login failed'
})
