export default function setToken({ props: { response: { result: { token } } }, state, http }) {
  state.set('auth.token', token)
}
