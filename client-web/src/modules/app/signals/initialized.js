import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import checkLogin from '../../auth/chains/checkLogin'

export default [checkLogin, set(state`app.initialized`, true)]
