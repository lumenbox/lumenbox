import { state } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'
import setUser from '../actions/setUser'
import { goTo } from '@cerebral/router/operators'

export default formSubmitted({
  post: '/api/user',
  form: state`auth.registerForm`,
  isLoading: state`auth.isLoading`,
  successChain: [setUser, goTo('/register-complete')]
})
