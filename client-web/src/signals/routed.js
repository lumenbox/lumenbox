import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default (page, title) => [
  set(state`app.page`, page),
  set(state`app.title`, title || null),
  set(state`app.showMobileMenu`, false)
]
