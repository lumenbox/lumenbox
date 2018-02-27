export default function setAccounts({ props: { response: { result: { accounts } } }, state }) {
  state.set(
    'accounts.data',
    accounts.reduce((hash, account) => {
      hash[account.id] = account
      return hash
    }, {})
  )
}
