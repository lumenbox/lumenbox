import { httpGet } from '@cerebral/http/operators'
import setDomains from '../actions/setDomains'

export default [
  httpGet('/api/domains'),
  {
    success: setDomains,
    error: []
  }
]
