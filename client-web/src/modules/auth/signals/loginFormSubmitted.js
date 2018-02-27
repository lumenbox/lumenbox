import { state } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'
import setUser from '../actions/setUser'
import { goTo } from '@cerebral/router/operators'

export default formSubmitted({
  post: '/api/session',
  form: state`auth.loginForm`,
  isLoading: state`auth.isLoading`,
  successChain: [setUser, goTo('/')],
  unauthorisedMessage: 'Login failed'
})
