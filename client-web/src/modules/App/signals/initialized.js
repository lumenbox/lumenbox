import { set, when } from 'cerebral/operators'
import { props, state } from 'cerebral/tags'
import checkLogin from '../../auth/chains/checkLogin'

export default [
  when(props`ssr`),
  {
    true: [],
    false: checkLogin
  },
  set(state`app.initialized`, true)
]
