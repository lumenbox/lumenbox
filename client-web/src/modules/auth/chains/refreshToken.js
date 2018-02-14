import { httpPost } from '@cerebral/http/operators'
import logout from './logout'
import loginSuccess from './loginSuccess'

export default [
  httpPost('/api/auth/refresh', undefined),
  {
    success: loginSuccess,
    error: logout
  }
]
