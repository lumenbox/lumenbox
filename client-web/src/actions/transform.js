import { isObject } from 'cerebral/lib/utils'

export default function(target, value, transformFn) {
  function transform(context) {
    const { state, props, resolve } = context

    if (!resolve.isTag(target, 'state', 'props')) {
      throw new Error('Cerebral operator.set: You have to use the STATE or PROPS TAG as first argument')
    }

    let resolvedValue = resolve.value(value)

    if (!resolve.isResolveValue(value) && isObject(value)) {
      resolvedValue = Object.assign({}, resolvedValue)
    } else if (!resolve.isResolveValue(value) && Array.isArray(value)) {
      resolvedValue = resolvedValue.slice()
    }

    if (transformFn) {
      resolvedValue = transformFn(resolvedValue, context)
    }

    if (target.type === 'state') {
      state.set(resolve.path(target), resolvedValue)
    } else {
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

  transform['displayName'] = `operator.transform(${String(target)}, ${String(value)})`

  return transform
}
