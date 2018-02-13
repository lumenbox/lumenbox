import * as Cookies from 'js-cookie'

export default (target, cookieName) => {
  function getCookie({ state, props, resolve }) {
    if (!resolve.isTag(target, 'state', 'props')) {
      throw new Error('Cerebral operator.set: You have to use the STATE or PROPS TAG as first argument')
    }

    let resolvedValue = Cookies.getJSON(cookieName)

    if (target.type === 'state') {
      if (!resolvedValue) {
        state.unset(resolve.path(target))
      } else {
        state.set(resolve.path(target), resolvedValue)
      }
    } else if (resolvedValue) {
      const result = Object.assign({}, props)
      const parts = resolve.path(target).split('.')
      const key = parts.pop()
      const targetObj = parts.reduce((target, key) => {
        return (target[key] = Object.assign({}, target[key] || {}))
      }, result)
      targetObj[key] = resolvedValue

      return result
    }
  }

  getCookie['displayName'] = `operator.getCookie(${String(target)}, ${String(cookieName)})`

  return getCookie
}
