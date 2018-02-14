import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import logout from '../chains/logout'
import goTo from '../../../actions/goTo'

export default [set(state`auth.isLoading`, true), logout, set(state`auth.isLoading`, false), goTo('/')]
