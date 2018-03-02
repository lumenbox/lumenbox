import { Compute } from 'cerebral'
import { state } from 'cerebral/tags'

export default domainIdTag =>
  Compute(domainIdTag, state`domains.data`, state`accounts.data`, (domainId, domains, accounts) =>
    Object.values(accounts).reduce((accounts, account) => {
      if (account.domainId === domainId || (!domainId && domains[account.domainId].system)) {
        accounts.push(account)
      }
      return accounts
    }, [])
  )
