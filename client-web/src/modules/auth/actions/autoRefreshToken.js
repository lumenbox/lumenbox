const buffer = 5 * 60 * 1000 // attempt to renew 5 minute before expiry

export default function autoRefreshToken({ state, controller }) {
  const token = state.get('auth.token')
  if (token && token.customerTokenExpiresUtc) {
    const expires = Date.parse(token.customerTokenExpiresUtc)
    setTimeout(() => {
      controller.getSignal('auth.tokenWillExpire')()
    }, expires - Date.now() - buffer)
  }
}
