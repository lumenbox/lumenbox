export default defaultMessage =>
  function parseError({ props: { error: { response: { result }, message } }, state }) {
    return {
      errorMessage: (result && (result.message || result.error)) || message || defaultMessage
    }
  }
