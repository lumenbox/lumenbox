import * as Cookies from 'js-cookie'
import { isObject } from 'cerebral/lib/utils'

export default (cookieName, value, options = { expires: 365 }) => {
  function setCookie({ resolve }) {
    let resolvedValue = resolve.value(value)

    if (!resolve.isResolveValue(value) && isObject(value)) {
      resolvedValue = Object.assign({}, resolvedValue)
    } else if (!resolve.isResolveValue(value) && Array.isArray(value)) {
      resolvedValue = resolvedValue.slice()
    }

    Cookies.set(cookieName, resolvedValue, options)
  }

  setCookie['displayName'] = `operator.setCookie(${String(cookieName)}, ${String(value)})`

  return setCookie
}
