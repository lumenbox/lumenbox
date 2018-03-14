import { Compute } from 'cerebral'
import { state } from 'cerebral/tags'

export default system =>
  Compute(state`domains.data`, domains =>
    Object.values(domains)
      .filter(domain => system === undefined || domain.system === system)
      .map(domain => Object.assign({ label: domain.domain, value: domain.id }, domain))
  )
