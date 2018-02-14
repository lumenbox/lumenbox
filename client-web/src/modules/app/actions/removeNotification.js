export default function removeNotification({ props: { key }, state }) {
  state.set('app.notifications', state.get('app.notifications').filter(notification => notification.key !== key))
}
