import * as uuid from 'uuid/v4'

export default (notificationType, messageTag, titleTag) =>
  function notify({ state, resolve, controller }) {
    const title = resolve.value(titleTag) || null
    const message = resolve.value(messageTag)
    const key = uuid()
    state.push('app.notifications', { key, title, message, className: notificationType })
    setTimeout(() => controller.getSignal('app.notificationDismissed')({ key }), 4000)
  }
