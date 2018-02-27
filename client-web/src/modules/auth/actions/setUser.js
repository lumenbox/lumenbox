export default function setUser({ props: { response: { result: { user } } }, state }) {
  state.set('auth.user', user)
}
