import { httpDelete } from '@cerebral/http/operators'
import { unset } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default [
  httpDelete('/api/session'),
  {
    success: [],
    error: []
  },
  unset(state`auth.user`)
]
