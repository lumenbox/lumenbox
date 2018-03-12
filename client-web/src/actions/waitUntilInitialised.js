const check = (state, resolve) => {
  if (!state.get('app.initialized')) {
    setTimeout(() => check(state, resolve), 100)
  } else {
    resolve()
  }
}

export default function waitUntilInitialised({ state }) {
  return new Promise((resolve, reject) => check(state, resolve))
}
