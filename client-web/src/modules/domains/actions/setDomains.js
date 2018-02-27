export default function setDomains({ props: { response: { result: { domains } } }, state }) {
  state.set(
    'domains.data',
    domains.reduce((hash, domain) => {
      hash[domain.id] = domain
      return hash
    }, {})
  )
}
