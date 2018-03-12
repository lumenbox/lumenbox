import { Compute } from 'cerebral'
import { state } from 'cerebral/tags'

export default Compute(state`domains.data`, domains =>
  Object.values(domains).map(domain => Object.assign({ label: domain.domain, value: domain.id }, domain))
)
