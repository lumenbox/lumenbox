export default function setUser({ props: { response: { result: { data } } }, state }) {
  state.set('auth.user', data)
}
