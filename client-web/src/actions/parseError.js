export default defaultMessage =>
  function parseError({ props: { error: { response: { result } } }, state }) {
    return {
      errorMessage: (result && (result.message || result.error)) || defaultMessage
    }
  }
